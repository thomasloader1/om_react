import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Provider/StateProvider';
import Step from '../Step';
import { FormCardPayStep } from './CheckoutForm';
import FormClientDataStep from './FormClientDataStep';
import SelectCountryStep from './SelectCountryStep';
import SelectPaymentMethodStep from './SelectPaymentMethodStep';
import SelectPaymentModeStep from './SelectPaymentModeStep';

function Stepper() {
  const [state] = useContext(AppContext);
  const [currentInfoStep] = state.sideItemOptions.filter(
    (sideOption) => sideOption.status === 'current'
  );
  const [actualStep, setCurrentStep] = useState(currentInfoStep);
  
  useEffect(() => {
    setCurrentStep(currentInfoStep);
  }, [state, actualStep]);

  const { step, label } = actualStep;

  return (
    <section className="container is-max-widescreen">
      <Step
        currentStep={step}
        stepTitle={`Seleccione un ${label}`}
        setCurrentStep={setCurrentStep}
      >
        <div>
          <SelectCountryStep
            countryOptions={state.countryOptions}
            currentStep={step}
            setCurrentStep={setCurrentStep}
          />
        </div>
        <div>
          <SelectPaymentMethodStep
            currentStep={step}
            setCurrentStep={setCurrentStep}
            paymentOptions={state.paymentOptions}
            userFlow={state.userFlow}
          />
        </div>
        <div>
          <SelectPaymentModeStep
            currentStep={step}
            setCurrentStep={setCurrentStep}
          />
        </div>
        <div>
          <FormClientDataStep
            currentStep={step}
            setCurrentStep={setCurrentStep}
          />
        </div>
        <div>
          <FormCardPayStep currentStep={step} setCurrentStep={setCurrentStep} />
        </div>
      </Step>
    </section>
  );
}

export default Stepper;
