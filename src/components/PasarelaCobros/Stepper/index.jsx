import React from 'react';
import Step from '../Step';
import { SelectCountryStep } from './Steps'; 

function Stepper() {
  return (
    <section className="container is-max-widescreen">
      <Step currentStep={1} stepTitle="Seleccione Pais">
         <SelectCountryStep />
      </Step>
    </section>
  );
}

export default Stepper;
