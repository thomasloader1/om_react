/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, lazy, Suspense, useContext } from 'react';

import { motion } from 'framer-motion';

import { useContract } from '../Hook/useContract';
import { useYupValidation } from '../Hook/useYupValidation';
import { useAppEnv } from '../Hook/useAppEnv';
import { useProgress } from '../Hook/useProgress';
import { useLead } from '../Hook/useLead';
import { useContact } from '../Hook/useContact';
import { useMediaQSmall } from '../Hook/useMediaQuery';

import Header from '../../PasarelaCobros/Header';
import LeadStep from '../Stepper/Lead';
import ContactStep from '../Stepper/Contact';
import SelectCourse from '../Stepper/SelectCourse';
import SelectCountryStep from '../Stepper/SelectCountryStep';
import ResumeStep from '../Stepper/Resume';
import MotionSpinner from '../../PasarelaCobros/Spinner/MotionSpinner';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';

const { NODE_ENV, REACT_APP_SPP } = process.env;

const MultiStepLazy = lazy(() => import('../Stepper/MultiStep'));

function VentaPresencialApp() {
  //const { user, selectedCourses, tokenLogin, formikValues: ctxFV } = useContext(AppContext)
  const pasarelaContainerRef = useRef();
  const isMobile = useMediaQSmall();
  /*   const setHeightMobile = () => {
      pasarelaContainerRef.current.style.height = `${window.innerHeight}px`;
    }; */
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
  const { fetching: processContact, createContactSales } = useContact();
  const {
    fetching: processContract,
    completeData,
    createContractSales,
  } = useContract();

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
    products: [],
  };

  useEffect(() => {
    if (appEnv != null && typeof appEnv !== 'undefined') {
      // console.log({ appEnv });
      setValues(appEnv);
    }

    return () => null;
  }, [creatingProgress, appEnv, formikValues]);

  /*   useEffect(() => {
      if (isMobile) {
        setHeightMobile();
      }
    }, [isMobile]); */

  return (
    <>
      {creatingProgress ? (
        <MotionSpinner text="Cargando el progreso" />
      ) : (
        <Suspense fallback={<MotionSpinner text="Cargando Aplicacion" />}>
          <motion.div
            style={{
              height: isMobile ? `${window.innerHeight}px` : '100vh',
              width: '100vw',
              overflow: 'hidden scroll',
            }}
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
                ref={pasarelaContainerRef}
              >
                <MultiStepLazy
                  stepStateNumber={{ stepNumberGlobal, setStepNumberGlobal }}
                  className={`pasarela-1 column seleccion-pais ${stepNumberGlobal === 3 ? 'seleccion-de-cursos' : ''
                    }`}
                  initialValues={initialFormValues}
                  onSubmit={async (values) => {
                    const uriRedirect =
                      NODE_ENV === 'production'
                        ? REACT_APP_SPP
                        : 'http://localhost:3001/superpasarela';
                    //console.log('Ir a pagar a:', { appEnv, uriRedirect });

                    window.location.href = `${uriRedirect}/#/vp/${appEnv.id}`;
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
                    loading={processLead}
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
                    loading={processLead}
                    loadingText="Generando nuevo Lead"
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
                    loading={processContact}
                    loadingText="Convirtiendo Lead a Contacto"
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
                    loading={processContract}
                    loadingText="Generando un nuevo Contrato"
                    completeData={completeData}
                  />
                </MultiStepLazy>
                {/* <pre>{JSON.stringify({ user, selectedCourses, ctxFV, tokenLogin }, null, 2)}</pre> */}
              </motion.div>
            </section>
          </motion.div>
        </Suspense>
      )}
    </>
  );
}

export default VentaPresencialApp;
