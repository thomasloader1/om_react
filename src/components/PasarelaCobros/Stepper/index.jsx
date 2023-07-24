import { Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext } from 'react';
import { useCurrentStep } from '../Hooks/useCurrentStep';
import { AppContext } from '../Provider/StateProvider';
import Step from '../Step';
import FormClientDataStep from './FormClientDataStep';
import GeneratePaymentLinkStep from './GeneratePaymentLinkStep';
import SelectCountryStep from './SelectCountryStep';
import SelectPaymentMethodStep from './SelectPaymentMethodStep';
import SelectPaymentModeStep from './SelectPaymentModeStep';

function Stepper() {
  const { options } = useContext(AppContext);
  const { sideItemOptions } = options;
  const { actualStep, setCurrentStep } = useCurrentStep(sideItemOptions);

  const validationSchema = Yup.object({
    country: Yup.string().required('Selecciona un pais'),
  });

  console.group('Stepper');
  // //console.log({ options })
  console.groupEnd('Stepper');

  return (
    <section className='container is-max-widescreen'>
      <Formik
        initialValues={{
          country: '',
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <Step
              currentStep={actualStep.step}
              stepTitle={`Selecciona un ${actualStep.label}`}
              setCurrentStep={setCurrentStep}
            >
              <div>
                <SelectCountryStep currentStep={actualStep.step} setCurrentStep={setCurrentStep} />
              </div>
              <div>
                <SelectPaymentMethodStep
                  currentStep={actualStep.step}
                  setCurrentStep={setCurrentStep}
                />
              </div>
              <div>
                <SelectPaymentModeStep
                  currentStep={actualStep.step}
                  setCurrentStep={setCurrentStep}
                />
              </div>
              <div>
                <FormClientDataStep currentStep={actualStep.step} setCurrentStep={setCurrentStep} />
              </div>
              <div>
                <GeneratePaymentLinkStep
                  currentStep={actualStep.step}
                  setCurrentStep={setCurrentStep}
                />
              </div>
              {/* <div>
          <FormCardPayStep currentStep={actualStep.step} setCurrentStep={setCurrentStep} />
        </div> */}
            </Step>
          </form>
        )}
      </Formik>
    </section>
  );
}

export default Stepper;
