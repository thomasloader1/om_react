import React, { useContext, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { AppContext } from '../Provider/StateProvider';
/* import { Elements } from '@stripe/react-stripe-js'; */
import Header from '../Header';
import MultiStep from '../Stepper/MultiStep';
import SelectCountryStep from '../Stepper/SelectCountryStep';
import SelectPaymentMethodStep from '../Stepper/SelectPaymentMethodStep';
import SelectPaymentModeStep from '../Stepper/SelectPaymentModeStep';
import FormClientDataStep from '../Stepper/FormClientDataStep';
import GeneratePaymentLinkStep from '../Stepper/GeneratePaymentLinkStep';
import { useMediaQSmall } from '../Hooks/useMediaQuery';

import useStripeEnv from '../Hooks/useStripeEnv';

import { useProgress } from '../Hooks/useProgress';
import { useLocation, useParams } from 'react-router';
import { useContractZoho } from '../Hooks/useContractZoho';
import MotionSpinner from '../Spinner/MotionSpinner';
/* import { loadStripe } from '@stripe/stripe-js'; */

//console.log(process.env)

function PasarelaApp() {
  const { setFormikValues, checkoutLink, appRef, stepNumber, setStepNumber } = useContext(AppContext);
  const location = useLocation();
  const { id } = useParams();
  const needRunEffect = !location.pathname.includes('vp');

  const { loading } = useContractZoho(id, needRunEffect);
  const pasarelaContainerRef = useRef(null);
  const isMobile = useMediaQSmall();

  const setHeightMobile = () => {
    pasarelaContainerRef.current.style.height = `90vh`;
  };

  // const { fetching: stripeFetch, pk } = useStripeEnv(data?.sale?.Pais);
  //const stripePromise = loadStripe(pk)

  const { progressId, getProgress } = useProgress();

  const validationSchemaFinalStep = Yup.object({
    fullName: Yup.string()
      .required('❗ Ingresa el nombre que figura en la tarjeta')
      .matches(/^[a-zA-Z]+\s+[a-zA-Z]+(?:\s+[a-zA-Z]+)?$/i, 'El campo debe contener solo letras'),
    phone: Yup.string()
      .required('❗ Ingresa un número de telefono')
      .matches(/^\+?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9}$/, 'El campo debe contener solo numeros'),
    address: Yup.string()
      .required('❗ Ingresa calle y número del titual de la tarjeta')
      .matches(/([A-Za-z0-9]+( [A-Za-z0-9]+)+)/i, 'El formato de la dirección es invalido'),
    dni: Yup.string()
      .required('❗ Ingresa el número de tu documento de identidad')
      .test('rut-validation', 'El formato del documento es incorrecto', function (value) {
        const pais = this.resolve(Yup.ref('country'));
        if (pais === 'Chile') {
          return /^([0-9]\d{7,8})-([A-Za-z]|\d{1})$/.test(value);
        } else {
          return /^[0-9]+$/.test(value);
        }
      }),
    email: Yup.string().email('❗ Ingresa un email valido').required('❗ El email es requerido'),
    zip: Yup.string().required('❗ El zip es requerido'),
  });


  useEffect(() => {
    if (location.pathname.includes('vp')) {
      getProgress();
    }

    return () => console.log('Clean')
  }, [progressId]);

  useEffect(() => {
    setStepNumber(stepNumber);

    return () => console.log('Clean App!');
  }, [stepNumber]);

  useEffect(() => {
    //console.log({ isMobile, pasarelaContainerRef });
    if (isMobile && pasarelaContainerRef.current) {
      setHeightMobile();
    }
    return () => console.log('Another Clean')

  }, [isMobile, pasarelaContainerRef.current]);

  return (
    <main ref={appRef}>
      <Header />
      {(loading) ? (
        <MotionSpinner text='Recuperando datos del Contrato' />
      ) : (
        /*  <Elements stripe={stripePromise}> */
        <section className={'container is-max-widescreen'}>
          <div
            id='pasarela-container'
            ref={pasarelaContainerRef}
            className='pasarela columns mx-auto'
          >
            <MultiStep
              stepStateNumber={{ stepNumber, setStepNumber }}
              className='pasarela-1 column seleccion-pais'
              initialValues={{
                fullName: '',
                phone: '',
                address: '',
                dni: '',
                email: '',
                mod: '',
              }}
              onSubmit={() => { }}
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
                  mod: Yup.string().required('❗ Selecciona un modo de pago'),
                  quotes: Yup.string().when('mod', {
                    is: (val) => !(val && val.includes('Tradicional')),
                    then: (schema) => Yup.string().required('❗ Especifique las cuotas'),
                    otherwise: (schema) => null,
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
        /* </Elements> */
      )}
    </main>

  );
}

export default PasarelaApp;
