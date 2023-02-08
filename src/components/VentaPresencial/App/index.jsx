import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Header from '../../PasarelaCobros/Header';
import MultiStep from '../Stepper/MultiStep';
import LeadStep from '../Stepper/Lead';
import ContactStep from '../Stepper/Contact';
import SelectCourse from '../Stepper/SelectCourse';
import SelectCountryStep from '../Stepper/SelectCountryStep';
import { useAppEnv } from '../Hook/useAppEnv';
import { useProgress } from '../Hook/useProgress';

function VentaPresencialApp() {
  const {
    setFormikValues,
    saveLead,
    saveContact,
    setValues,
    stepNumberGlobal,
    setStepNumberGlobal,
  } = useAppEnv();
  const { fetching: creatingProgress, appEnv, updateProgress } = useProgress();
  // console.log({ stepNumber });
  const [progressLoadedFormStep, setProgressLoadedFormStep] = useState(null);

  useEffect(() => {
    if (
      appEnv != null &&
      typeof appEnv !== 'undefined' &&
      progressLoadedFormStep === null
    ) {
      console.log({ appEnv });
      setValues(appEnv);
    }

    return () => null;
  }, [stepNumberGlobal, creatingProgress, appEnv]);

  return (
    <>
      <Header />
      <section className="container is-max-widescreen">
        <div className="pasarela columns mx-auto">
          <MultiStep
            stepStateNumber={{ stepNumberGlobal, setStepNumberGlobal }}
            className="pasarela-1 column seleccion-pais"
            initialValues={{
              country: '',
              name: '',
              username: '',
              profession: '',
              telephone: '',
              speciality: '',
              method_contact: '',
            }}
            onSubmit={async (values) => {}}
          >
            <SelectCountryStep
              onSubmit={(values) => {
                setFormikValues((prevFormikValues) => ({
                  ...prevFormikValues,
                  ...values,
                }));
                updateProgress(values, 2);
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
                method_contact: Yup.string().required(
                  'El metodo de contacto es requerido'
                ),
              })}
            />
            <ContactStep
              onSubmit={(values) => {
                setFormikValues((prevFormikValues) => ({
                  ...prevFormikValues,
                  ...values,
                }));
              }}
              validationSchema={Yup.object({
                /* dni: Yup.number().required('El dni es requerido'),
                sex: Yup.string().required('El sexo es requerido'),
                date_of_birth: Yup.string().required(
                  'La fecha de nacimiento es requerida'
                ),
                registration_number: Yup.number(
                  'El campo deben ser solo numeros'
                ).required('El nummero de matricula es requerido'),
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
                postal_code: Yup.number(
                  'El campo deben ser solo numeros'
                ).required('El codigo postal es requerido'),
                street: Yup.string().required('La direccion es requerida'),
                locality: Yup.string().required('La localidad es requerida'), */
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

            <div></div>
          </MultiStep>
        </div>
      </section>
      <pre>{JSON.stringify(appEnv, null, 2)}</pre>
    </>
  );
}

export default VentaPresencialApp;
