/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import '../../../scss/pasarela-de-cobros.scss';
import RadioButton from '../RadioButton';
import Side from '../Side';
import Step from '../Step';
import {
  countryOptions,
  paymentOptions,
  paymentMedOptions,
  paymentModOptions,
  clientData
} from '../Step/options';

class Composition extends Component {
  state = {
    currentStep: 1,
    titleStep: 'Seleccione país',
    idStepElement: 'seleccion_pais'
  };

  render() {
    return (
      <div className="pasarela columns mx-auto">
        <Step
          idStepElement={this.state.idStepElement}
          currentStep={this.state.currentStep}
          stepTitle={this.state.titleStep}
        >
          <div id="pais-grid" className="gridCuartos">
            {countryOptions.map(({ ...props }) => (
              <RadioButton {...props} name="pais" />
            ))}
          </div>
        </Step>
        <Side currentStep={this.state.currentStep} />
      </div>
    );
  }
}

export default Composition;
