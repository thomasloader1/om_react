/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import '../../../scss/pasarela-de-cobros.scss';
import RadioButton from '../RadioButton';
/* import Side from '../Side'; */
import Step from '../Step';
import {
  countryOptions,
  /*  paymentOptions,
   paymentMedOptions,
   paymentModOptions,
   clientData */
} from '../Step/options';

function Composition() {
  const [state] = useState({
    currentStep: 1,
    titleStep: 'Seleccione país',
    idStepElement: 'seleccion_pais'
  })

  return (
    <Step
      idStepElement={state.idStepElement}
      currentStep={state.currentStep}
      stepTitle={state.titleStep}
    >
      <div id="pais-grid" className="gridCuartos">
        {countryOptions.map(({ ...props }) => (
          <RadioButton {...props} name="pais" />
        ))}
      </div>
    </Step>
  );
}


export default Composition;
