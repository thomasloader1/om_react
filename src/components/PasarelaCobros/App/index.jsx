import React, { useContext, useState } from 'react';
// import '../../../scss/pasarela-de-cobros.scss';
import Header from '../Header';
import Stepper from '../Stepper';
import * as Yup from 'yup';
import MultiStep from '../Stepper/MultiStep';
import Side from '../Side';
import { AppContext } from '../Provider/StateProvider';
import SelectCountryStep from '../Stepper/SelectCountryStep';
import SelectPaymentMethodStep from '../Stepper/SelectPaymentMethodStep';
import SelectPaymentModeStep from '../Stepper/SelectPaymentModeStep';
import FormClientDataStep from '../Stepper/FormClientDataStep';
import GeneratePaymentLinkStep from '../Stepper/GeneratePaymentLinkStep';
import axios from 'axios';
import { useEffect } from 'react';

function PasarelaApp() {
  const { options, formikValues, setFormikValues } = useContext(AppContext);
  const [stepNumber, setStepNumber] = useState(0);
  const [checkoutLink, setCheckoutLink] = useState('');

  useEffect(() => {
    setStepNumber(stepNumber);

    return () => null;
  }, [stepNumber]);

  return (
    <>
      <Header />
      {/* <Stepper />  */}
      <section className="container is-max-widescreen">
        <div className="pasarela columns mx-auto">
          <MultiStep
            stepStateNumber={{ stepNumber, setStepNumber }}
            className="pasarela-1 column seleccion-pais"
            initialValues={{
              country: '',
              payment_method:'',
              contractId: '',
              mod: '',
              checkContract: '',

            }}
            onSubmit={async (values) => {
              const body = new FormData();
              const type = formikValues.mod.toLowerCase().substring(0, 4);
              console.log({ values }, formikValues.mod === 'Tradicional', {
                type
              });
              body.append('months', 0);
              body.append('amount', `${formikValues.amount}`);
              body.append('type', type);
              body.append('so', formikValues.contractId);

              const response = await axios.post(
                'https://www.oceanomedicina.com.ar/suscripciontest/remote/generateCheckoutPro',
                body,
                {
                  headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                }
              );

              setCheckoutLink(response.data.url);
              console.log({ response });
            }}
          >
            <SelectCountryStep
              onSubmit={(values) => {
                setFormikValues({
                  ...formikValues,
                  ...values
                });

                console.log('Step 1 submit', { values, formikValues });
              }}
              validationSchema={Yup.object({
                country: Yup.string().required('El pais es requerido')
              })}
            />
            <SelectPaymentMethodStep
              onSubmit={(values) => {
                setFormikValues({
                  ...formikValues,
                  ...values
                });

                console.log('Step 2 submit', { values, formikValues });
              }}
              validationSchema={Yup.object({
                payment_method: Yup.string().required(
                  'El metodo de pago es requerido'
                )
              })}
            />
            <SelectPaymentModeStep
              onSubmit={(values) => {
                setFormikValues({
                  ...formikValues,
                  ...values
                });

                console.log('Step 3 submit', { values, formikValues });
              }}
              validationSchema={Yup.object({
                contractId: Yup.string().required('Ingrese el ID del contrato es requerido'),
                mod: Yup.string().required('Seleccione un modo de pago'),
                quotes: Yup.string().when('mod',{
                  is: (val) => !(val && val.includes('Tradicional')),
                  then: Yup.string().required('Especifique las cuotas'),
                  otherwise: null
                })
              })}
            />
            <FormClientDataStep
              onSubmit={(values) => {
                setFormikValues({
                  ...formikValues,
                  ...values
                });

                console.log('Step 4 submit', { values, formikValues });
              }}
              validationSchema={Yup.object({
                checkContract: Yup.string().required('El campo es requerido'),
              })}
            />

            <GeneratePaymentLinkStep checkoutLink={checkoutLink} />
          </MultiStep>
          <Side
            options={options.sideItemOptions}
            stepStateNumber={{ stepNumber, setStepNumber }}
          />
        </div>
      </section>
      <pre>{JSON.stringify(formikValues, null, 2)}</pre>
    </>
  );
}

export default PasarelaApp;
