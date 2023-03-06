import React, { useContext, useEffect } from 'react';
import { AppContext } from '../Provider/StateProvider';
import { Elements } from '@stripe/react-stripe-js';
import * as Yup from 'yup';
import MultiStep from '../Stepper/MultiStep';
import Header from '../Header';
import SelectCountryStep from '../Stepper/SelectCountryStep';
import SelectPaymentMethodStep from '../Stepper/SelectPaymentMethodStep';
import SelectPaymentModeStep from '../Stepper/SelectPaymentModeStep';
import FormClientDataStep from '../Stepper/FormClientDataStep';
import GeneratePaymentLinkStep from '../Stepper/GeneratePaymentLinkStep';

import useStripeEnv from '../Hooks/useStripeEnv';
import { useProgress } from '../Hooks/useProgress';
import { useLocation, useParams } from 'react-router';
import { useContractZoho } from '../Hooks/useContractZoho';

function PasarelaApp() {
  const { setFormikValues, checkoutLink, appRef, stepNumber, setStepNumber } =
    useContext(AppContext);
  const { stripePromise } = useStripeEnv();
  const { fetching, progressId, getProgress } = useProgress();
  const location = useLocation();
  const { id } = useParams();

  const needRunEffect = !location.pathname.includes('vp')
  const { data } = useContractZoho(id, needRunEffect);
  console.log({ id, data })

  const validationSchemaFinalStep = Yup.object({
    fullName: Yup.string()
      .required('❗ Ingresa el nombre que figura en la tarjeta')
      .matches(/^[a-zA-Z]+\s+[a-zA-Z]+(?:\s+[a-zA-Z]+)?$/i, 'El campo debe contener solo letras'),
    phone: Yup.string()
      .required('❗ Ingresa un número de telefono')
      .matches(/^[0-9]+$/i, 'El campo debe contener solo numeros'),
    address: Yup.string()
      .required('❗ Ingresa calle y número del titual de la tarjeta')
      .matches(/([A-Za-z0-9]+( [A-Za-z0-9]+)+)/i, 'El formato de la dirección es invalido'),
    dni: Yup.string()
      .required('❗ Ingresa el número de tu documento de identidad')
      .matches(/^[0-9]+$/i, 'El campo debe contener solo numeros'),
    email: Yup.string().email('❗ Ingresa un email valido').required('❗ El email es requerido'),
  });

  useEffect(() => {
    if (location.pathname.includes('vp')) {
      getProgress();
    }
  }, [progressId]);

  useEffect(() => {
    setStepNumber(stepNumber);

    return () => null;
  }, [stepNumber]);

  const handleSubmitByStepTwo = async () => { };

  return (
    <div ref={appRef}>
      <Header />
      <Elements stripe={stripePromise}>
        <section className={'container is-max-widescreen'}>
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
                  country: Yup.string().required('❗ El pais es requerido'),
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
                  payment_method: Yup.string().required('❗ El método de pago es requerido'),
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
                  mod: Yup.string().required('❗ Seleccione un modo de pago'),
                  quotes: Yup.string().when('mod', {
                    is: (val) => !(val && val.includes('Tradicional')),
                    then: Yup.string().required('❗ Especifique las cuotas'),
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
                  checkContract: Yup.string().required('❗ El campo es requerido'),
                })}
              />

              <GeneratePaymentLinkStep
                checkoutLink={checkoutLink}
                validationSchema={validationSchemaFinalStep}
              />
            </MultiStep>
          </div>
          {/* <pre>{JSON.stringify(contractData, null, 2)}</pre> */}
        </section>
      </Elements>
    </div>
  );
}

export default PasarelaApp;
