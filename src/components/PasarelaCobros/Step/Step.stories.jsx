/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import LabelCountry from '../LabelCountry';
import LabelPayment from '../LabelPayment';
import Step from './index';
import { countryOptions, paymentOptions } from './options';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/Pasarela de Cobros/Step',
  component: Step,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
function Template(args) {
  return <Step {...args} />;
}

export const SeleccionPais = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SeleccionPais.args = {
  children: (
    <div id="pais-grid" className="gridCuartos">
      {countryOptions.map(({ ...props }) => (
        <LabelCountry {...props} />
      ))}
    </div>
  ),
  idStepElement: 'seleccion_pais',
  currentStep: 1,
  stepTitle: 'Seleccione país'
};

export const SeleccionPago = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SeleccionPago.args = {
  children: (
    <div id="metPago_grid" className="gridCuartos">
      {paymentOptions.map(({ ...props }) => (
        <LabelPayment {...props} />
      ))}
    </div>
  ),
  idStepElement: 'seleccion_metPago',
  currentStep: 2,
  stepTitle: 'Seleccione método de pago'
};
