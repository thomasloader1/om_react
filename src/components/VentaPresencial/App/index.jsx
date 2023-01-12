import React, { useContext, useState, useEffect } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import Header from '../../PasarelaCobros/Header';
import MultiStep from '../Stepper/MultiStep';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import SelectCountryStep from '../../PasarelaCobros/Stepper/SelectCountryStep';
import LeadStep from '../Stepper/Lead';
import ContactStep from '../Stepper/Contact';
import SelectCourse from '../Stepper/SelectCourse';

const {
  REACT_APP_OCEANO_URL,
  REACT_APP_OCEANO_GENERATECHECKOUTPRO,
  NODE_ENV,
  REACT_APP_PHP_LARAVEL_APIPAYMENTS,
} = process.env;
const PHP_LARAVEL_APIPAYMENTS = 'http://127.0.0.1:8000/api/db/stepCreateLead';

function VentaPresencialApp() {
  const { formikValues, setFormikValues, setCheckoutLink, setAppEnv, appEnv } =
    useContext(AppContext);
  const [stepNumber, setStepNumber] = useState(0);

  const saveLead = async (values) => {
    const body = new FormData();
    const requestConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    let dataJson = {
      lead: {
        lead_id: appEnv.lead_id !== undefined ?
        appEnv.lead_id:null,
        ...values
      }
    };

    body.append('dataJson', JSON.stringify(dataJson));

    const responseOfLaravel = await axios.post(
      'http://127.0.0.1:8000/api/db/stepCreateLead',
      body,
      requestConfig
    );
    console.log({ responseOfLaravel });

    if(responseOfLaravel.data.message === "success"){
      setAppEnv((appEnvCurrent) => ({
        ...appEnvCurrent, 
        lead_id: responseOfLaravel.data.newLead.id 
      }));
    }
    console.log({ appEnv });
  };

  const saveContact = async (values) => {
    console.log({values});
    const body = new FormData();
    const requestConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    let dataJson = {
      contact: {
        id: appEnv.contact_id !== undefined ?
            appEnv.contact_id:null ,
        dni: values.dni,
        sex: values.sex,
        date_of_birth: values.date_of_birth,
        registration_number: values.registration_number,
        area_of_work: values.area_of_work,
        training_interest: values.training_interest
      },
      address: {
        id: appEnv.address_id !== undefined ?
            appEnv.address_id:null ,
        country: values.country,
        province_state: values.province_state,
        postal_code: values.postal_code,
        street: values.street,
        locality: values.locality
      }
    };
  
    // body.append('dataJson', JSON.stringify(formik.values))
    body.append('dataJson', JSON.stringify(dataJson));
  
    const responseOfLaravel = await axios.post(
      'http://127.0.0.1:8000/api/db/stepConversionContact',
      body,
      requestConfig
    );

  
    if(responseOfLaravel.data.message === "success"){
      setAppEnv((appEnvCurrent) => ({
        ...appEnvCurrent, 
        contact_id: responseOfLaravel.data.newContact.id,
        address_id: responseOfLaravel.data.newAddress.id
      }));
    }
     
    console.log({ appEnv });
  };

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

              // const URL = PHP_LARAVEL_APIPAYMENTS;
              const URL =
                NODE_ENV === 'production'
                  ? `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_GENERATECHECKOUTPRO}`
                  : PHP_LARAVEL_APIPAYMENTS;
              debugger; //8
              const response = await axios.post(
                'http://127.0.0.1:8000/api/db/stepCreateLead',
                body,
                requestConfig
              );
              // const response = await axios.post(URL, body, requestConfig);
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

            <LeadStep
              onSubmit={(values) => {
                setFormikValues((prevFormikValues) => ({
                  ...prevFormikValues,
                  ...values,
                }));

                saveLead(values);
              }}
              validationSchema={Yup.object({
                name: Yup.string().required('El nombre es requerido'),
                username: Yup.string().required('El apellido es requerido'),
                email: Yup.string().required('El e-mail es requerido'),
                telephone: Yup.string().required('El telefono es requerido'),
                profession: Yup.string().required('La profesion es requerido'),
                speciality: Yup.string().required(
                  'La especialidad es requerido'
                ),
                // method_contact: Yup.string().required('El metodo de contacto es requerido'),
              })}
            />
            <ContactStep
              onSubmit={(values) => {
                setFormikValues((prevFormikValues) => ({
                  ...prevFormikValues,
                  ...values,
                }));

                saveContact(values);
              }}
              validationSchema={Yup.object({
                dni: Yup.string().required('El dni es requerido'),
                sex: Yup.string().required('El sexo es requerido'),
                date_of_birth: Yup.string().required(
                  'La fecha de nacimiento es requerida'
                ),
                registration_number: Yup.string().required(
                  'El nummero de matricula es requerido'
                ),
                area_of_work: Yup.string().required(
                  'El area de trabajo es requerida'
                ),
                training_interest: Yup.string().required(
                  'El interes de formacion'
                ),
                province_state: Yup.string().required(
                  'La provincia o estado son requeridos'
                ),
                country: Yup.string().required('El pais es requerido'),
                postal_code: Yup.string().required(
                  'El codigo postal es requerido'
                ),
                street: Yup.string().required('La direccion es requerida'),
                locality: Yup.string().required('La localidad es requerida'),
              })}
            />
            <SelectCourse
              onSubmit={(values) => {
                setFormikValues((prevFormikValues) => ({
                  ...prevFormikValues,
                  ...values,
                }));
              }}
              validationSchema={Yup.object({})}
            />
          </MultiStep>
        </div>
      </section>
      {/*   <pre>{JSON.stringify(formikValues, null, 2)}</pre> */}
    </>
  );
}

export default VentaPresencialApp;
