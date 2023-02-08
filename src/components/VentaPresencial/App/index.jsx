import React, { useContext, useState, useEffect } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import Header from '../../PasarelaCobros/Header';
import MultiStep from '../../PasarelaCobros/Stepper/MultiStep';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import SelectCountryStep from '../../PasarelaCobros/Stepper/SelectCountryStep';
import SelectPaymentMethodStep from '../../PasarelaCobros/Stepper/SelectPaymentMethodStep';
import SelectPaymentModeStep from '../../PasarelaCobros/Stepper/SelectPaymentModeStep';
import FormClientDataStep from '../../PasarelaCobros/Stepper/FormClientDataStep';
import GeneratePaymentLinkStep from '../../PasarelaCobros/Stepper/GeneratePaymentLinkStep';

const { REACT_APP_OCEANO_URL, REACT_APP_OCEANO_GENERATECHECKOUTPRO, NODE_ENV } = process.env;

function VentaPresencialApp() {
  const { formikValues, setFormikValues, checkoutLink, setCheckoutLink } = useContext(AppContext);
  const [stepNumber, setStepNumber] = useState(0);

  useEffect(() => {
    setStepNumber(stepNumber);

    return () => null;
  }, [stepNumber]);

  return (
    <>
      <Header />
      <section className='container is-max-widescreen'>
        <div className='pasarela columns mx-auto'>
          <MultiStep
            stepStateNumber={{ stepNumber, setStepNumber }}
            className='pasarela-1 column seleccion-pais'
            initialValues={{}}
            onSubmit={async (values) => {
              const body = new FormData();
              const type = formikValues.mod.toLowerCase().substring(0, 4);
              const requestConfig = {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
              };

              body.append('months', 0);
              body.append('amount', `${formikValues.amount}`);
              body.append('type', type);
              body.append('so', formikValues.sale.SO_Number);

              const URL =
                NODE_ENV === 'production'
                  ? `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_GENERATECHECKOUTPRO}`
                  : REACT_APP_OCEANO_GENERATECHECKOUTPRO;

              const response = await axios.post(URL, body, requestConfig);

              setCheckoutLink(response.data.url);
              // console.log({ response });
            }}
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

                // console.log('Step 2 submit', { values, formikValues });
              }}
              validationSchema={Yup.object({
                payment_method: Yup.string().required('El método de pago es requerido'),
              })}
            />
            <SelectPaymentModeStep
              onSubmit={(values) => {
                setFormikValues((prevFormikValues) => ({
                  ...prevFormikValues,
                  ...values,
                }));

                // console.log('Step 3 submit', { values, formikValues });
              }}
              validationSchema={Yup.object({
                contractId: Yup.string().required('Ingrese el ID del contrato es requerido'),
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

                // console.log('Step 4 submit', { values, formikValues });
              }}
              validationSchema={Yup.object({
                checkContract: Yup.string().required('El campo es requerido'),
              })}
            />

            <GeneratePaymentLinkStep checkoutLink={checkoutLink} />
          </MultiStep>
        </div>
      </section>
      {/*   <pre>{JSON.stringify(formikValues, null, 2)}</pre> */}
    </>
  );
}

export default VentaPresencialApp;
