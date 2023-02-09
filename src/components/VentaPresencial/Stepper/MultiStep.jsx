import React, { useState, useContext } from 'react';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import { Form, Formik } from 'formik';
import { Block, Notification } from 'react-bulma-components';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import InfoNotify from '../../PasarelaCobros/InfoNotify';
import Side from '../Side';
import FormNavigation from '../StepControl/FormNavigation';
import {motion} from 'framer-motion'

const MultiStep = ({
  children,
  initialValues,
  className,
  onSubmit,
  stepStateNumber,
}) => {
  const { options, setOptions, formRef } = useContext(AppContext);
  const { stepNumberGlobal, setStepNumberGlobal } = stepStateNumber;
  const { sideItemOptionsVP } = options;
  const [spanshot, setSpanshot] = useState(initialValues);
  const steps = React.Children.toArray(children);
  const step = steps[stepNumberGlobal];
  const totalSteps = steps.length;
  const isLastStep = stepNumberGlobal === totalSteps - 1;

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
                {step}
                
                {formik.errors && Object.keys(formik.errors).length > 0 && (
                  <motion.div 
                  initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        exit={{opacity: 0}}>
                  <Block style={{ margin: '1rem 0' }}>
                    <Notification color="danger" light="true">
                      {Object.entries(formik.errors).map((e) => (
                        <motion.p key={e[0]} className="field"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        exit={{opacity: 0}}
                        >
                          {e[1]}
                        </motion.p>
                      ))}
                    </Notification>
                  </Block>
                  </motion.div>
                )}

                {formik.values &&
                  Object.entries(formik.values).map((e) => {
                    return <InfoNotify key={e[0]} messages={e} />;
                  })}
                <FormNavigation
                  isLastStep={isLastStep}
                  hasPrevious={stepNumberGlobal > 0}
                  onBackClick={() => previous(formik.values)}
                />
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
