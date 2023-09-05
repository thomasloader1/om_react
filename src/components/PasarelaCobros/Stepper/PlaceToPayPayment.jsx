import React, { useContext, useEffect, useState } from 'react';
import { debitFirstPayment, makePaymentSession } from '../../../logic/ptp';
import { AppContext } from '../Provider/StateProvider';
import InputField from '../InputField';
import { FormStep } from './MultiStep';
import { useFormikContext } from 'formik';
import SelectDocument from '../SelectDocument';
import { fireToast } from '../Hooks/useSwal';

const PlaceToPayPayment = () => {
  const { formikValues } = useContext(AppContext);
  const [processURL, setProcessURL] = useState(null);
  const { values, handleChange, handleBlur, touched, errors } = useFormikContext();
  const [statusRequestPayment, setStatusRequestPayment] = useState('');
  const STATUS_BTN = {
    SESSION: statusRequestPayment.includes('PENDING'),
    INIT_PAYMENT: statusRequestPayment.includes('REJECTED'),
  };

  useEffect(() => {
    const makeFirstPayment = async (requestId) => {
      try {
        const res = await debitFirstPayment({ requestId });
        console.log({ res });
        fireToast('Cobro existoso', 'success');
      } catch (e) {
        console.log({ e });
        fireToast('Error al cobrar');
      }
    };

    window.P.on('response', function (response) {
      console.log({ response });
      const { status } = response.status;
      setStatusRequestPayment(status);

      if (status.includes('APPROVED')) {
        const { requestId } = response;
        makeFirstPayment({ requestId });
        return;
      }

      fireToast(`El estado de la sesion cambio a ${status}`, 'info');
    });

    return () => {
      console.log({ P: window.P });
    };
  }, []);

  const handlePaymentSession = async () => {
    const formValues = {
      ...formikValues,
      dni: values.dni,
      documentType: values.document_type,
      email: values.email,
      address: values.address,
      mobile: values.phone,
    };

    console.log(formValues);

    try {
      const payment = await makePaymentSession(formValues);
      setProcessURL(payment[0].processUrl);
      setStatusRequestPayment('PENDING');

      fireToast('Sesion creada', 'success');

      console.log({ payment });
    } catch (e) {
      fireToast('Error al crear sesion');

      console.log(e);
    }
  };

  const handleInitPayment = async () => {
    window.P.init(processURL);
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
        {/*  <InputField
          type='phone'
          id='phone'
          name='phone'
          label='Numero de telefono'
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.phone && errors.phone}
        /> */}
        <button
          id='ptpSession'
          className='button is-primary mt-3'
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
              onClick={handleInitPayment}
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
