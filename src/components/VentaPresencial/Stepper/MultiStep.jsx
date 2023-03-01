import React, { useState, useContext } from 'react';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import { Form, Formik } from 'formik';
import { Block, Notification } from 'react-bulma-components';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import InfoNotify from '../../PasarelaCobros/InfoNotify';
import Side from '../Side';
import FormNavigation from '../StepControl/FormNavigation';
import { motion } from 'framer-motion';
import { MdTune, MdClose } from 'react-icons/md';
import { useMediaQSmall } from '../Hook/useMediaQuery';

const MultiStep = ({
  children,
  initialValues,
  className,
  onSubmit,
  stepStateNumber,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const {
    options,
    setOptions,
    formRef,
    expandSelectCourses,
    toggleSelectCourses,
  } = useContext(AppContext);
  const { stepNumberGlobal, setStepNumberGlobal } = stepStateNumber;
  const { sideItemOptionsVP } = options;
  const [spanshot, setSpanshot] = useState(initialValues);
  const steps = React.Children.toArray(children);
  const step = steps[stepNumberGlobal];
  const totalSteps = steps.length;
  const isLastStep = stepNumberGlobal === totalSteps - 1;
  const isMediaQSmall = useMediaQSmall();

  const next = (values) => {
    setSpanshot(values);

    const indexOfNextStep = stepNumberGlobal + 1;

    sideItemOptionsVP[stepNumberGlobal].status = 'completed';
    sideItemOptionsVP[indexOfNextStep].status = 'current';

    setOptions((prevState) => ({
      ...prevState,
      sideItemOptionsVP: [...sideItemOptionsVP],
    }));

    setStepNumberGlobal((step) => step + 1);
  };
  const previous = (values) => {
    setSpanshot(values);

    const indexOfPrevStep = stepNumberGlobal - 1;

    sideItemOptionsVP[stepNumberGlobal].status = '';
    sideItemOptionsVP[indexOfPrevStep].status = 'current';

    setOptions((prevState) => ({
      ...prevState,
      sideItemOptionsVP: [...sideItemOptionsVP],
    }));

    setStepNumberGlobal((step) => step - 1);
  };

  const handleSubmit = async (values, actions) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values);
    }

    if (isLastStep) {
      return onSubmit(values, actions);
    } else {
      actions.setTouched({});
      next(values);
    }
  };

  const variantStyles = {
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <SwitchTransition>
      <CSSTransition
        key={stepNumberGlobal}
        addEndListener={(node, done) =>
          node.addEventListener('transitionend', done, false)
        }
        classNames="fade"
      >
        <Formik
          initialValues={spanshot}
          onSubmit={handleSubmit}
          validationSchema={step.props.validationSchema}
        >
          {(formik) => (
            <>
              <Form className={className} ref={formRef}>
                <motion.div
                  className="pasarela-overlay"
                  initial={{
                    opacity: 0,
                    display: 'none',
                  }}
                  animate={{
                    opacity: 1,
                    display: 'block',
                  }}
                  transition={{ duration: 0.5 }}
                ></motion.div>

                {step}

                {formik.errors && Object.keys(formik.errors).length > 0 && (
                  <motion.div
                    className={`notification-container ${
                      isMediaQSmall ? 'modal is-active' : ''
                    }`}
                    initial={{ opacity: 0, y: '100vh', zIndex: '10' }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    exit={{ opacity: 0 }}
                  >
                    {' '}
                    {isMediaQSmall && <div className="modal-background" />}
                    <Block
                      className={`${isMediaQSmall ? 'modal-content' : ''}`}
                      style={{ margin: '1rem 0' }}
                    >
                      <Notification color="danger" light="true">
                        {Object.entries(formik.errors).map((e) => {
                          const [key, message] = e;
                          return (
                            <motion.p
                              key={key}
                              className="field"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5 }}
                              exit={{ opacity: 0 }}
                            >
                              {message}
                            </motion.p>
                          );
                        })}
                      </Notification>
                    </Block>
                  </motion.div>
                )}

                {formik.values &&
                  Object.entries(formik.values).map((e) => {
                    const [key] = e;
                    return <InfoNotify key={key} messages={e} />;
                  })}
                <FormNavigation
                  isLastStep={isLastStep}
                  hasPrevious={stepNumberGlobal > 0}
                  onBackClick={() => previous(formik.values)}
                />
                <motion.div
                  className={`searchcourses-overlay ${
                    expandSelectCourses ? 'is-expanded' : ''
                  }`}
                  variants={variantStyles}
                  initial="closed"
                  animate={expandSelectCourses ? 'open' : 'closed'}
                  exit={{ opacity: 0 }}
                >
                  <h2 className="title has-text-white is-4">
                    Buscar por
                    <MdClose
                      className="is-size-4"
                      onClick={toggleSelectCourses}
                    />
                  </h2>
                  <div></div>
                </motion.div>
              </Form>

              <Side
                options={options.sideItemOptionsVP}
                stepStateNumber={{ stepNumberGlobal, setStepNumberGlobal }}
                formikInstance={formik}
              />
              {/*  <pre>{JSON.stringify(formik, null, 2)}</pre> */}
            </>
          )}
        </Formik>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default MultiStep;
export const FormStep = ({ stepNumber = 0, stepName = '', children }) => {
  const { toggleSelectCourses } = useContext(AppContext);

  const toggleButton = stepNumber === 4 && (
    <MdTune
      className="is-size-4 rotate-90"
      onClick={() => {
        toggleSelectCourses();
      }}
    />
  );

  console.log({ stepNumber }, toggleButton);

  return (
    <>
      {stepNumber !== 0 && (
        <>
          <h2 className="title is-4">
            <span className="has-text-white has-background-black is-circle">
              {stepNumber}
            </span>
            {stepName}
            {toggleButton}
          </h2>
        </>
      )}

      {children}
    </>
  );
};
