import React, { useContext, useEffect, useState } from 'react';
import {
  debitFirstPayment,
  generatePaymentLink,
  makePaymentSession,
  ptpStates,
  rejectSession,
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
import RejectedSessionPTP from '../RejectedSessionPTP/RejectedSessionPTP';

const PlaceToPayPayment = () => {
  const {
    formikValues,
    setOpenBlockLayer,
    setPtpFetching,
    renewSession,
    rejectedSessionPTP,
    setRejectedSessionPTP,
  } = useContext(AppContext);
  const [ptpSession, setPtpSession] = useState(null);
  const [processURL, setProcessURL] = useState(null);
  const { values, handleChange, handleBlur, touched, errors, setFieldValue } = useFormikContext();
  const [statusRequestPayment, setStatusRequestPayment] = useState('');
  const [ptpEffect, setPtpEffect] = useState(true);

  const STATUS_BTN = {
    SESSION:
      statusRequestPayment.includes(ptpStates.PENDING) ||
      statusRequestPayment.includes(ptpStates.OK) ||
      Object.keys(errors).length > 0,
    INIT_PAYMENT: statusRequestPayment.includes(ptpStates.REJECT),
  };

  const [phoneNumber, setPhoneNumber] = useState(null);
  const [onRequest, setOnRequest] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('MX');

  useEffect(() => {
    const makeFirstPayment = async (requestId) => {
      try {
        const res = await debitFirstPayment({ ...requestId });
        console.log(res);
        setPtpFetching(res.data);
        const responseOfServer = res?.data ?? res;
        console.log({ responseOfServer });

        if (responseOfServer.statusPayment.includes(ptpStates.OK)) {
          fireToast(res.data.result, 'success');

          const data = {
            requestId: requestId.requestId,
            adjustment: 0,
            contractId: formikValues.contractId,
            street: values.address,
            is_suscri: !formikValues.mod.includes('Tradicional'),
          };
          const bodyZoho = makePostUpdateZohoPTP(data);
          const zohoResponse = await updateZohoContract(bodyZoho);
          if (zohoResponse.contact && zohoResponse.contract)
            fireToast(
              `Contacto ID: ${zohoResponse?.contact?.id} y Contrato id: ${zohoResponse?.contract?.id} se actualizados correctamente`,
              'success',
              50000,
            );

          setOpenBlockLayer(true);
        } else if (responseOfServer.statusPayment.includes(ptpStates.PENDING)) {
          const redirectState = {
            redirect: true,
            redirectSuffix: responseOfServer?.payment?.pendingPayment?.requestId,
          };

          fireModalAlert('Pago Pendiente', responseOfServer.result, 'warning', redirectState);
          setStatusRequestPayment(responseOfServer.statusPayment);
        } else {
          fireModalAlert('Pago Rechazado', responseOfServer.result, 'error');
          setStatusRequestPayment(responseOfServer.statusPayment);
        }
      } catch (e) {
        console.log({ e });
        fireToast('Error al cobrar');
      }
    };

    if (ptpEffect) {
      setPtpEffect(false);

      window.P.on('response', async function (response) {
        console.log({ response });
        const { status } = response.status;
        setStatusRequestPayment(status);

        if (status.includes(ptpStates.OK)) {
          const { requestId } = response;

          const body = {
            requestId,
            street: values.address,
            renewSuscription: formikValues?.renewSuscription ?? false,
            is_suscri: !formikValues?.mod?.includes('Tradicional'),
          };

          try {
            makeFirstPayment(body);
          } catch (error) {
            console.log(error);
            fireAlert('Error', error, 'error');
          }
        }

        const isRejectedSession = await rejectSession(response);
        //la referencia, el valor y el estado de la transacción
        setRejectedSessionPTP({
          reference: isRejectedSession.data.reference,
          status: isRejectedSession.data.ptpResponse.status.status,
          fullName: formikValues.contact.Full_Name,
          payment: isRejectedSession.data.payment,
          paymentOfSession: isRejectedSession.data.paymentOfSession,
        });

        fireToast(`El estado de la sesion cambio a ${isRejectedSession.data.payment}`, 'info');
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
      renewSession,
    };

    //console.log(formValues);

    try {
      const payment = await makePaymentSession(formValues);
      console.log({ payment });
      setPtpSession(payment);
      setProcessURL(payment[0].processUrl);
      setStatusRequestPayment(ptpStates.PENDING);

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

        {rejectedSessionPTP && <RejectedSessionPTP rejectedSessionPTP={rejectedSessionPTP} />}

        <button
          id='ptpSession'
          className={`button is-primary mt-3 ${onRequest && 'is-loading'}`}
          type='button'
          disabled={STATUS_BTN.SESSION}
          onClick={handlePaymentSession}
        >
          {formikValues?.renewSuscription ? 'Activar sesion' : 'Nueva sesion de pago'}
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
