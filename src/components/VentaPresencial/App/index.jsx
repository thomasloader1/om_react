import React, { useEffect } from 'react';
import * as Yup from 'yup';
import Header from '../../PasarelaCobros/Header';
import MultiStep from '../Stepper/MultiStep';
import LeadStep from '../Stepper/Lead';
import ContactStep from '../Stepper/Contact';
import SelectCourse from '../Stepper/SelectCourse';
import SelectCountryStep from '../Stepper/SelectCountryStep';
import { useAppEnv } from '../Hook/useAppEnv';
import { useProgress } from '../Hook/useProgress';
import { useLead } from '../Hook/useLead';
import { useContact } from '../Hook/useContact';
import Spinner from '../../PasarelaCobros/Spinner';
import { motion } from 'framer-motion';
import { useContract } from '../Hook/useContract';
import ResumeStep from '../Stepper/Resume';

const { NODE_ENV, REACT_APP_SPP } = process.env;

function VentaPresencialApp() {
  const {
    setFormikValues,
    formikValues,
    setValues,
    stepNumberGlobal,
    setStepNumberGlobal,
  } = useAppEnv();

  const { fetching: creatingProgress, appEnv, updateProgress } = useProgress();
  const { fetching: processLead, createLeadSales } = useLead();
  const { createContactSales } = useContact();
  const {
    fetching: processContract,
    completeData,
    createContractSales,
  } = useContract();

  useEffect(() => {
    if (appEnv != null && typeof appEnv !== 'undefined') {
      // console.log({ appEnv });
      setValues(appEnv);
    }

    return () => null;
  }, [creatingProgress, appEnv, formikValues]);

  return (
    <>
      {creatingProgress ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          exit={{ opacity: 0 }}
          style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Spinner />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Header />
          <section className="container is-max-widescreen">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="pasarela columns mx-auto"
            >
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
                  dni: '',
                  sex: '',
                  date_of_birth: '',
                  registration_number: '',
                  area_of_work: '',
                  training_interest: '',
                  province_state: '',
                  postal_code: '',
                  street: '',
                  locality: '',
                }}
                onSubmit={async (values) => {
                  const uriRedirect =
                    NODE_ENV === 'production'
                      ? REACT_APP_SPP
                      : 'http://localhost:3001/superpasarela/';
                  //console.log('Ir a pagar a:', { appEnv, uriRedirect });

                  window.location.href = `${uriRedirect}#/vp/${appEnv.id}`;
                }}
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

                    console.log({ values });

                    createLeadSales(values);
                  }}
                  validationSchema={Yup.object({
                    name: Yup.string().required('❗ El nombre es requerido'),
                    username: Yup.string().required(
                      '❗ El apellido es requerido'
                    ),
                    email: Yup.string().required('❗ El e-mail es requerido'),
                    telephone: Yup.string().required(
                      '❗ El teléfono es requerido'
                    ),
                    profession: Yup.string()
                      .required('❗ La profesión es requerida')
                      .test(
                        'is-not-zero',
                        '❗ Seleccione una profesion valida',
                        (value) => value !== '0'
                      ),
                    speciality: Yup.string()
                      .required('❗ La especialidad es requerida')
                      .test(
                        'is-not-zero',
                        '❗ Seleccione una especialidad valida',
                        (value) => value !== '0'
                      ),
                    method_contact: Yup.string()
                      .required('❗ El método de contacto es requerido')
                      .test(
                        'is-not-zero',
                        '❗ Seleccione un método de contacto valido',
                        (value) => value !== '0'
                      ),
                  })}
                />
                <ContactStep
                  onSubmit={(values) => {
                    setFormikValues((prevFormikValues) => ({
                      ...prevFormikValues,
                      ...values,
                    }));

                    createContactSales(values);
                  }}
                  validationSchema={Yup.object({
                    dni: Yup.number().required('❗ El DNI es requerido'),
                    sex: Yup.string().required('❗ El sexo es requerido'),
                    date_of_birth: Yup.string().required(
                      '❗ La fecha de nacimiento es requerida'
                    ),
                    registration_number: Yup.number(
                      '❗ El campo debe contener solo numeros'
                    ).required('❗ El número de matrícula es requerido'),
                    area_of_work: Yup.string().required(
                      '❗ El área de trabajo es requerida'
                    ),
                    training_interest: Yup.string().required(
                      '❗ El interés de formación es requerido'
                    ),
                    province_state: Yup.string().required(
                      '❗ La provincia o estado son requeridos'
                    ),
                    country: Yup.string().required('❗ El país es requerido'),
                    postal_code: Yup.number(
                      '❗ El campo debe contener solo numeros'
                    ).required('❗ El código postal es requerido'),
                    street: Yup.string().required(
                      '❗ La dirección es requerida'
                    ),
                    locality: Yup.string().required(
                      '❗ La localidad es requerida'
                    ),
                  })}
                />
                <SelectCourse
                  onSubmit={(values) => {
                    setFormikValues((prevFormikValues) => ({
                      ...prevFormikValues,
                      ...values,
                    }));

                    createContractSales(values);
                  }}
                  validationSchema={Yup.object().shape({
                    /* products: Yup.array()
                      .min(1)
                      .of(Yup.string().required())
                      .required(), */
                  })}
                />

                <ResumeStep
                  processContract={processContract}
                  completeData={completeData}
                />
              </MultiStep>
            </motion.div>
          </section>
        </motion.div>
      )}
    </>
  );
}

export default VentaPresencialApp;
