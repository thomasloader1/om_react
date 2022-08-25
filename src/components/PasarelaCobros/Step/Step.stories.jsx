/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import RadioButton from '../RadioButton';
// import FormInput from '../FormInput';

import Step from './index';
import {
  countryOptions
  /*   paymentOptions,
  paymentMedOptions,
  paymentModOptions,
  clientData */
} from './options';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/Pasarela de Cobros/Step',
  component: Step,
  argTypes: {}
};

function Template(args) {
  return <Step {...args} />;
}

export const SeleccionPais = Template.bind({});
SeleccionPais.args = {
  children: (
    <div id="pais-grid" className="gridCuartos">
      {countryOptions.map(({ ...props }) => (
        <RadioButton {...props} name="pais" />
      ))}
    </div>
  ),
  currentStep: 1,
  stepTitle: 'Seleccione país'
};

/* export const SeleccionMetPago = Template.bind({});
SeleccionMetPago.args = {
  children: (
    <div id="metPago_grid" className="gridCuartos">
      {paymentOptions.map(({ ...props }) => (
        <RadioButton {...props} showText={false} />
      ))}
    </div>
  ),
  idStepElement: 'seleccion_metPago',
  currentStep: 2,
  stepTitle: 'Seleccione método de pago'
};

export const SeleccionMedModPago = Template.bind({});
SeleccionMedModPago.args = {
  children: (
    <>
      <div id="medModPago_grid" className="gridCuartos">
        {paymentMedOptions.map(({ ...props }) => (
          <RadioButton {...props} />
        ))}
      </div>
      <div className="is-divider doble" />
      <div id="medModPago_grid" className="gridCuartos">
        {paymentModOptions.map(({ ...props }) => (
          <RadioButton {...props} />
        ))}
      </div>
    </>
  ),
  idStepElement: 'seleccion_medModPago',
  currentStep: 3,
  stepTitle: 'Seleccione medio y modo de pago'
};

export const DatosPersonales = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DatosPersonales.args = {
  children: (
    <div id="form_datosPersonales" className="form-grid">
      {clientData.map(({ ...props }) => (
        <FormInput {...props} />
      ))}
    </div>
  ),
  idStepElement: 'seleccion_medModPago',
  currentStep: 4,
  stepTitle: 'Seleccione medio y modo de pago'
}; */
