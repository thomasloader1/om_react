import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Provider/StateProvider';
import Step from '../Step';
import {
  FormClientDataStep,
  SelectCountryStep,
  SelectPaymentMethodStep,
  SelectPaymentModeStep
} from './Steps';
import { data } from '../data/index';


function Stepper() {
  const [state] = useContext(AppContext);

  const [currentInfoStep] = state.sideItemOptions.filter(
    (sideOption) => sideOption.status === 'current'
  );
  const [actualStep, setCurrentStep] = useState(currentInfoStep);
console.log({actualStep, setCurrentStep})
  useEffect(() => {
    setCurrentStep(currentInfoStep);
  }, [state]);

  const { step, label } = actualStep;

  return (
    <section className="container is-max-widescreen">
      <Step  currentStep={step} stepTitle={`Seleccione un ${label}`} setCurrentStep={setCurrentStep} >
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
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
        <div>
          <FormClientDataStep
          currentStep={step} 
          setCurrentStep={setCurrentStep} 
          />
        </div>
        <div>
          Todavia no pa
        </div>
      </Step>
      
    </section>
  );
}

export default Stepper;
