import { Form, Formik } from 'formik';
import React, { useState, useContext } from 'react';
import { Block, Notification } from 'react-bulma-components';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import InfoNotify from '../../PasarelaCobros/InfoNotify';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import Side from '../Side';
import FormNavigation from '../StepControl/FormNavigation';
import { motion } from 'framer-motion'

const MultiStep = ({
  children,
  initialValues,
  className,
  onSubmit,
  stepStateNumber
}) => {
  const {
    options,
    setOptions,
    stepNumberGlobal,
    setStepNumberGlobal,
    formRef,
    leadForm,
    contactForm
  } = useContext(AppContext);
  
  const { stepNumber, setStepNumber } = stepStateNumber;
  const [spanshot, setSpanshot] = useState(initialValues);
  const steps = React.Children.toArray(children);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = (values) => {

    setSpanshot(values);
    const indexOfNextStep = stepNumber + 1;
    options.sideItemOptions[stepNumber].status = 'completed';
    options.sideItemOptions[indexOfNextStep].status = 'current';
    setOptions({ ...options });
    setStepNumber(stepNumber + 1);
    setStepNumberGlobal(stepNumberGlobal + 1);
    /*  console.log('next', {
      stepNumber,
      stepNumberGlobal,
      formikValues,
      formikInstance
    });  */
  };
  const previous = (values) => {
    setSpanshot(values);
    const indexOfPrevStep = stepNumber - 1;
    options.sideItemOptions[stepNumber].status = '';
    options.sideItemOptions[indexOfPrevStep].status = 'current';
    setOptions({ ...options });
    setStepNumber(stepNumber - 1);
    setStepNumberGlobal(stepNumber - 1);
    /* console.log('previous', {
      stepNumber,
      stepNumberGlobal,
      formikValues,
      formikInstance
    }); */
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

  //console.log({ step });

  return (
    <SwitchTransition>
      <CSSTransition
        key={stepNumber}
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
              {step}
              {formik.errors && Object.keys(formik.errors).length > 0 && (
                <Block style={{ margin: '1rem 0' }}>
                  <Notification color="danger" light="true">
                    {Object.entries(formik.errors).map((e) => (
                      <p key={e[0]} className="field">
                        {e[1]}
                      </p>
                    ))}
                  </Notification>
                </Block>
              )}
              {formik.values &&
                Object.entries(formik.values).map((e) => {
                  return <InfoNotify key={e[0]} messages={e} />;
                })}
              <FormNavigation
                isLastStep={isLastStep}
                hasPrevious={stepNumber > 0}
                onBackClick={() => previous(formik.values)}
              />
            </Form>
            <Side
              options={options.sideItemOptions}
              stepStateNumber={{ stepNumber, setStepNumber }}
              formikInstance={formik}
            />
          </>
        )}
      </Formik>
    </ CSSTransition>
    </ SwitchTransition >
  );
};

export default MultiStep;
export const FormStep = ({ stepNumber = 0, stepName = '', children }) => {
  return (
    <>
      {stepNumber !== 0 && (
        <h2 className="title is-4">
          <span className="has-text-white has-background-black is-circle">
            {stepNumber}
          </span>
          {stepName}
        </h2>
      )}
      {children}
    </>
  );
};
