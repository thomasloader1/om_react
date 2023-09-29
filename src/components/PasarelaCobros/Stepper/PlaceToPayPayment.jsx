import React, { useContext, useEffect, useState } from 'react';
import {
  debitFirstPayment,
  generatePaymentLink,
  makePaymentSession,
  updateZohoContract,
} from '../../../logic/ptp';
import { AppContext } from '../Provider/StateProvider';
import InputField from '../InputField';
import { FormStep } from './MultiStep';
import { useFormikContext } from 'formik';
import SelectDocument from '../SelectDocument';
import { fireAlert, fireModalAlert, fireToast } from '../Hooks/useSwal';
import { parsePhoneNumber } from 'react-phone-number-input';
import { makePostUpdateZohoPTP } from '../../../logic/zoho';

const PlaceToPayPayment = () => {
  const { formikValues, setOpenBlockLayer, setPtpFetching } = useContext(AppContext);
  const [ptpSession, setPtpSession] = useState(null);
  const [processURL, setProcessURL] = useState(null);
  const { values, handleChange, handleBlur, touched, errors, setFieldValue } = useFormikContext();
  const [statusRequestPayment, setStatusRequestPayment] = useState('');
  const [ptpEffect, setPtpEffect] = useState(true);

  const STATUS_BTN = {
    SESSION: statusRequestPayment.includes('PENDING') || Object.keys(errors).length > 0,
    INIT_PAYMENT: statusRequestPayment.includes('REJECTED'),
  };

  const [phoneNumber, setPhoneNumber] = useState(null);
  const [onRequest, setOnRequest] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('MX');

  useEffect(() => {
    const makeFirstPayment = async (requestId) => {
      try {
        const res = await debitFirstPayment({ requestId });
        console.log(res);
        setPtpFetching(res.data);
        const responseOfServer = res?.data ?? res;
        console.log({ responseOfServer });

        if (responseOfServer.statusPayment.includes('APPROVED')) {
          fireToast(res.data.result, 'success');

          const data = {
            requestId: requestId.requestId,
            adjustment: 0,
            contractId: values.contractId,
            street: values.address,
          };
          const bodyZoho = makePostUpdateZohoPTP(data);
          updateZohoContract(bodyZoho);

          setOpenBlockLayer(true);
        } else {
          fireAlert('Error', responseOfServer.result, 'error');
          setStatusRequestPayment(responseOfServer.statusPayment);
        }
      } catch (e) {
        console.log({ e });
        fireToast('Error al cobrar');
      }
    };
    if (ptpEffect) {
      setPtpEffect(false);

      window.P.on('response', function (response) {
        console.log({ response });
        const { status } = response.status;
        setStatusRequestPayment(status);

        if (status.includes('APPROVED')) {
          const { requestId } = response;

          const body = {
            requestId,
            street: values.address,
          };

          try {
            makeFirstPayment(body);
          } catch (error) {
            console.log(error);
            fireAlert('Error', error, 'error');
          }

          return;
        }

        fireToast(`El estado de la sesion cambio a ${status}`, 'info');
      });
    }

    return () => {
      console.log({ P: window.P });
    };
  }, []);

  const handlePhoneInputChange = (value) => {
    setFieldValue('phone', value);
    const numberText = value ? value : '';
    const fullPhoneNumber = parsePhoneNumber(numberText);
    //console.log(value, fullPhoneNumber)

    if (fullPhoneNumber) {
      const { country } = fullPhoneNumber;
      const findCountry = country;
      setPhoneNumber(fullPhoneNumber);
      if (findCountry) {
        setSelectedCountry(findCountry);
      }
    }
  };

  const handlePaymentSession = async () => {
    setOnRequest(true);
    const formValues = {
      ...formikValues,
      dni: values.dni,
      documentType: values.document_type,
      email: values.email,
      address: values.address,
      mobile: values.phone,
    };

    //console.log(formValues);

    try {
      const payment = await makePaymentSession(formValues);
      console.log({ payment });
      setPtpSession(payment);
      setProcessURL(payment[0].processUrl);
      setStatusRequestPayment('PENDING');

      fireToast('Sesion creada', 'success');
    } catch (e) {
      fireToast('Error al crear sesion');

      console.log(e);
    } finally {
      setOnRequest(false);
    }
  };

  const handleInitPayment = async () => {
    window.P.init(processURL);
  };

  const handleGenerateLink = async () => {
    const data = {
      ...formikValues,
      dni: values.dni,
      documentType: values.document_type,
      email: values.email,
      address: values.address,
      mobile: values.phone,
      ptpSession,
    };

    try {
      const res = await generatePaymentLink(data);

      if (res === '') {
        throw new Error('Respuesta vacia desde el servidor, contactarse con sistemas.');
      }

      console.log(res);
      setOpenBlockLayer(true);
      setPtpFetching({ generateLink: { ...res }, data });
    } catch (e) {
      console.error({ e });
      fireModalAlert('Error al generar link', e.message);
      setOpenBlockLayer(false);
      setPtpFetching(null);
    }
  };

  return (
    <FormStep stepNumber={5} stepName='Finaliza la compra'>
      <div id='grid-ptp-payment'>
        <SelectDocument country='ec' name='document_type' id='document_type' />
        <InputField
          type='text'
          id='dni'
          name='dni'
          label='Número de identificación'
          placeholder='Número de identificación'
          value={values.dni}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.dni && errors.dni}
        />
        <InputField
          type='address'
          id='address'
          name='address'
          label='Dirección de facturación'
          placeholder='Dirección completa'
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.address && errors.address}
        />
        <InputField
          type='email'
          id='email'
          name='email'
          label='Correo Electronico'
          placeholder='marta@oceano.com.ar'
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && errors.email}
        />
        <InputField
          type='phone'
          id='phone'
          name='phone'
          label='Teléfono'
          placeholder='Ingresar número de teléfono'
          value={values.phone}
          onChange={handlePhoneInputChange}
          onBlur={handleBlur}
          error={touched.phone && errors.phone}
          country={selectedCountry}
          defaultCountry='EC'
        />
        <button
          id='ptpSession'
          className={`button is-primary mt-3 ${onRequest && 'is-loading'}`}
          type='button'
          disabled={STATUS_BTN.SESSION}
          onClick={handlePaymentSession}
        >
          Nueva sesion de pago
        </button>

        {processURL && (
          <>
            <button
              id='ptpPayNow'
              className='button is-success'
              disabled={STATUS_BTN.INIT_PAYMENT}
              onClick={handleInitPayment}
            >
              Iniciar Pago
            </button>

            <button
              id='ptpLink'
              className='button is-info'
              disabled={STATUS_BTN.INIT_PAYMENT}
              onClick={handleGenerateLink}
            >
              Generar Link
            </button>
          </>
        )}
      </div>
    </FormStep>
  );
};

export default PlaceToPayPayment;
