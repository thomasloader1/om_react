import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Provider/StateProvider';
import Step from '../Step';
import { SelectCountryStep, SelectPaymentMethodStep } from './Steps'; 

function Stepper() {
  const [state] = useContext(AppContext)
  const [currentStep] = state.sideItemOptions.filter(sideOption => sideOption.status === 'current')
  const [actualStep, setCurrentStep] = useState(currentStep)
  
  useEffect(()=>{
    setCurrentStep(currentStep)
    console.log({currentStep})
  },[state])

  const {step, label} = actualStep
  return (
    <section className="container is-max-widescreen">
      <Step currentStep={step} stepTitle={`Seleccione un ${label}`}>
        {step === 1 && <SelectCountryStep />}
        {step === 2 && <SelectPaymentMethodStep />}
      </Step>
      
    </section>
  );
}

export default Stepper;
