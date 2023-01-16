import React, { useContext, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import Header from '../Header';
import * as Yup from 'yup';
import MultiStep from '../Stepper/MultiStep';
import { AppContext } from '../Provider/StateProvider';
import SelectCountryStep from '../Stepper/SelectCountryStep';
import SelectPaymentMethodStep from '../Stepper/SelectPaymentMethodStep';
import SelectPaymentModeStep from '../Stepper/SelectPaymentModeStep';
import FormClientDataStep from '../Stepper/FormClientDataStep';
import GeneratePaymentLinkStep from '../Stepper/GeneratePaymentLinkStep';
import { useEffect } from 'react';
import useStripeEnv from '../Hooks/useStripeEnv';

function PasarelaApp() {
  const { setFormikValues, checkoutLink, appRef } = useContext(AppContext);
  const [stepNumber, setStepNumber] = useState(0);
  const { stripePromise } = useStripeEnv();

  const validationSchemaFinalStep = Yup.object({
    fullName: Yup.string()
      .required('Ingrese nombre que figura en la tarjeta')
      .matches(/^[a-zA-Z]+\s+[a-zA-Z]+(?:\s+[a-zA-Z]+)?$/i, 'El campo debe contener solo letras'),
    phone: Yup.string()
      .required('Ingrese un numero de telefono')
      .matches(/^[0-9]+$/i, 'El campo debe contener solo numeros'),
    address: Yup.string()
      .required('Ingrese calle y numero del titual de la tarjeta')
      .matches(/([A-Za-z0-9]+( [A-Za-z0-9]+)+)/i, 'El formato de la direccion es invalido'),
    dni: Yup.string()
      .required('Ingrese el numero de tu documento de identidad')
      .matches(/^[0-9]+$/i, 'El campo debe contener solo numeros'),
    email: Yup.string().email('Ingrese un email valido').required('El email es requerido'),
  });

  useEffect(() => {
    setStepNumber(stepNumber);

    return () => null;
  }, [stepNumber]);

  const handleSubmitByStepTwo = async () => {};

  return (
    <div ref={appRef}>
      <Header />
      <Elements stripe={stripePromise}>
        <section className='container is-max-widescreen'>
          <div className='pasarela columns mx-auto'>
            <MultiStep
              stepStateNumber={{ stepNumber, setStepNumber }}
              className='pasarela-1 column seleccion-pais'
              initialValues={{
                fullName: '',
                phone: '',
                address: '',
                dni: '',
                email: '',
              }}
              onSubmit={handleSubmitByStepTwo}
            >
              <SelectCountryStep
                onSubmit={(values) => {
                  setFormikValues((prevFormikValues) => ({
                    ...prevFormikValues,
                    ...values,
                  }));
                }}
                validationSchema={Yup.object({
                  country: Yup.string().required('El pais es requerido'),
                })}
              />
              <SelectPaymentMethodStep
                onSubmit={(values) => {
                  setFormikValues((prevFormikValues) => ({
                    ...prevFormikValues,
                    ...values,
                  }));
                }}
                validationSchema={Yup.object({
                  payment_method: Yup.string().required('El metodo de pago es requerido'),
                })}
              />
              <SelectPaymentModeStep
                onSubmit={(values) => {
                  setFormikValues((prevFormikValues) => ({
                    ...prevFormikValues,
                    ...values,
                  }));
                }}
                validationSchema={Yup.object({
                  contractId: Yup.string('Coloque un id'),
                  mod: Yup.string().required('Seleccione un modo de pago'),
                  quotes: Yup.string().when('mod', {
                    is: (val) => !(val && val.includes('Tradicional')),
                    then: Yup.string().required('Especifique las cuotas'),
                    otherwise: null,
                  }),
                })}
              />
              <FormClientDataStep
                onSubmit={(values) => {
                  setFormikValues((prevFormikValues) => ({
                    ...prevFormikValues,
                    ...values,
                  }));
                }}
                validationSchema={Yup.object({
                  checkContract: Yup.string().required('El campo es requerido'),
                })}
              />

              <GeneratePaymentLinkStep
                checkoutLink={checkoutLink}
                validationSchema={validationSchemaFinalStep}
              />
            </MultiStep>
          </div>
          {/* <pre>{JSON.stringify(formikValues, null, 2)}</pre> */}
        </section>
      </Elements>
    </div>
  );
}

export default PasarelaApp;
