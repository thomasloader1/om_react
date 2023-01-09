import React, { useContext, useState,useEffect } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import Header from '../../PasarelaCobros/Header';
import MultiStep from '../Stepper/MultiStep';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import SelectCountryStep from '../../PasarelaCobros/Stepper/SelectCountryStep';
import LeadStep from '../Stepper/Lead';
import ContactStep from '../Stepper/Contact';


const { REACT_APP_OCEANO_URL,
   REACT_APP_OCEANO_GENERATECHECKOUTPRO, NODE_ENV,REACT_APP_PHP_LARAVEL_APIPAYMENTS } =
  process.env;
const PHP_LARAVEL_APIPAYMENTS = "http://127.0.0.1:8000/api/db/stepCreateLead";
console.log(process.env);

function VentaPresencialApp() {
  const { formikValues, setFormikValues, checkoutLink, setCheckoutLink,leadForm } = useContext(AppContext);
  const [stepNumber, setStepNumber] = useState(0);
  useEffect(() => {
    setStepNumber(stepNumber);

    return () => null;
  }, [stepNumber]);

  return (
    <>
      <Header />
      <section className="container is-max-widescreen">
        <div className="pasarela columns mx-auto">

          <MultiStep
            stepStateNumber={{ stepNumber, setStepNumber }}
            className="pasarela-1 column seleccion-pais"
            initialValues={{}}
            onSubmit={ async (values) => {
              const body = new FormData();
              const type = formikValues.mod.toLowerCase().substring(0, 4);
              const requestConfig = {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              }

              body.append('months', 0);
              body.append('amount', `${formikValues.amount}`);
              body.append('type', type);
              body.append('so', formikValues.sale.SO_Number);

              // const URL = PHP_LARAVEL_APIPAYMENTS;
              const URL =
                NODE_ENV === 'production'
                  ? `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_GENERATECHECKOUTPRO}`
                  : PHP_LARAVEL_APIPAYMENTS;
                  debugger;//8
              const response = await axios.post("http://127.0.0.1:8000/api/db/stepCreateLead", body, requestConfig);
              // const response = await axios.post(URL, body, requestConfig);
              setCheckoutLink(response.data.url);
              console.log({ response });
            }
          }
          >
                <SelectCountryStep
                  onSubmit={(values) => {
                    setFormikValues((prevFormikValues) => ({
                      ...prevFormikValues,
                      ...values
                    }));
                  }}
                  validationSchema={Yup.object({
                    country: Yup.string().required('El pais es requerido')
                  })}
                />
               
               <LeadStep
                 onSubmit={(values) => {
                  setFormikValues((prevFormikValues) => ({
                    ...prevFormikValues,
                    ...values
                  }));
                }}
                validationSchema={
                  Yup.object({
                  name: Yup.string().required('El nombre es requerido'),
                  username: Yup.string().required('El apellido es requerido'),
                  email: Yup.string().required('El e-mail es requerido'),
                  telephone: Yup.string().required('El telefono es requerido'),
                  profession: Yup.string().required('La profesion es requerido'),
                  speciality: Yup.string().required('La especialidad es requerido'),
                  // method_contact: Yup.string().required('El metodo de contacto es requerido'),
                })}

               />
                <ContactStep
                 onSubmit={(values) => {
                  setFormikValues((prevFormikValues) => ({
                    ...prevFormikValues,
                    ...values
                  }));
                }}
                validationSchema={
                  Yup.object({
                  country: Yup.string().required('El pais es requerido')
                })}

               />
               
          </MultiStep>
        </div>
      </section>
      {/*   <pre>{JSON.stringify(formikValues, null, 2)}</pre> */}
    </>
  );
}

export default VentaPresencialApp;
