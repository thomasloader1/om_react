import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Provider/StateProvider';
import Step from '../Step';
import {
  SelectCountryStep,
  SelectPaymentMethodStep,
  SelectPaymentModeStep
} from './Steps';

function Stepper() {
  const [state] = useContext(AppContext);
  const [currentInfoStep] = state.sideItemOptions.filter(
    (sideOption) => sideOption.status === 'current'
  );
  const [actualStep, setCurrentStep] = useState(currentInfoStep);

  useEffect(() => {
    setCurrentStep(currentInfoStep);
  }, [state, currentInfoStep]);

  const { step, label } = actualStep;
  return (
    <section className="container is-max-widescreen">
      <Step currentStep={step} stepTitle={`Seleccione un ${label}`}>
        <div>
          <SelectCountryStep countryOptions={state.countryOptions} />
        </div>
        <div>
          <SelectPaymentMethodStep
            paymentOptions={state.paymentOptions}
            userFlow={state.userFlow}
          />
        </div>
        <div>
          <SelectPaymentModeStep />
        </div>
      </Step>
      
    </section>
  );
}

export default Stepper;
