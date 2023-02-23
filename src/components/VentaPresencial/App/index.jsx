import React, { useEffect, lazy, Suspense } from 'react';

import { motion } from 'framer-motion';

import { useContract } from '../Hook/useContract';
import { useYupValidation } from '../Hook/useYupValidation';
import { useAppEnv } from '../Hook/useAppEnv';
import { useProgress } from '../Hook/useProgress';
import { useLead } from '../Hook/useLead';
import { useContact } from '../Hook/useContact';

import Header from '../../PasarelaCobros/Header';
import LeadStep from '../Stepper/Lead';
import ContactStep from '../Stepper/Contact';
import SelectCourse from '../Stepper/SelectCourse';
import SelectCountryStep from '../Stepper/SelectCountryStep';
import ResumeStep from '../Stepper/Resume';
import MotionSpinner from '../../PasarelaCobros/Spinner/MotionSpinner';

const { NODE_ENV, REACT_APP_SPP } = process.env;

const MultiStepLazy = lazy(() => import('../Stepper/MultiStep'));

function VentaPresencialApp() {
  const {
    setFormikValues,
    formikValues,
    setValues,
    stepNumberGlobal,
    setStepNumberGlobal,
  } = useAppEnv();

  const {
    countryStepValidation,
    leadStepValidation,
    contactStepValidation,
    selectCoursesStepValidation,
  } = useYupValidation();

  const { fetching: creatingProgress, appEnv, updateProgress } = useProgress();
  const { fetching: processLead, createLeadSales } = useLead();
  const { createContactSales } = useContact();
  const {
    fetching: processContract,
    completeData,
    createContractSales,
  } = useContract();

  const processEntity = processLead;

  const initialFormValues = {
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
  };

  useEffect(() => {
    if (appEnv != null && typeof appEnv !== 'undefined') {
      // console.log({ appEnv });
      setValues(appEnv);
    }

    return () => null;
  }, [creatingProgress, appEnv, formikValues]);

  return (
    <Suspense fallback={<MotionSpinner />}>
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
            <MultiStepLazy
              stepStateNumber={{ stepNumberGlobal, setStepNumberGlobal }}
              className="pasarela-1 column seleccion-pais"
              initialValues={initialFormValues}
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
                validationSchema={countryStepValidation}
              />

              <LeadStep
                onSubmit={(values) => {
                  setFormikValues((prevFormikValues) => ({
                    ...prevFormikValues,
                    ...values,
                  }));

                  createLeadSales(values);
                }}
                validationSchema={leadStepValidation}
              />

              <ContactStep
                onSubmit={(values) => {
                  setFormikValues((prevFormikValues) => ({
                    ...prevFormikValues,
                    ...values,
                  }));

                  createContactSales(values);
                }}
                validationSchema={contactStepValidation}
              />

              <SelectCourse
                onSubmit={(values) => {
                  setFormikValues((prevFormikValues) => ({
                    ...prevFormikValues,
                    ...values,
                  }));

                  createContractSales(values);
                }}
                validationSchema={selectCoursesStepValidation}
              />

              <ResumeStep
                processContract={processContract}
                completeData={completeData}
              />
            </MultiStepLazy>
          </motion.div>
        </section>
      </motion.div>
    </Suspense>
  );
}

export default VentaPresencialApp;
