/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import RadioButton from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/Pasarela de Cobros/RadioButton',
  component: RadioButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
function Template(args) {
  return (
    <div className="gridCuartos">
      <RadioButton {...args} />
    </div>
  );
}

export function States(args) {
  return (
    <div className="gridCuartos">
      <RadioButton {...args} value="Default" status="hover" />
      <RadioButton
        {...args}
        value="active"
        status="active"
        className="is-light is-link"
      />
      <RadioButton {...args} value="Disabled" disabled />
      <br />
      <MetPaymentButton img="mp" className="tall" />
      <MetPaymentButton img="mp" className="tall" status="active" />
      <MetPaymentButton img="mp" className="tall" dsiabled />
    </div>
  );
}

export const CountryButton = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
CountryButton.args = {
  idElement: 'pais_arg_label',
  img: 'argFlag',
  value: 'Argentina'
};

export const MetPaymentButton = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
MetPaymentButton.args = {
  idElement: 'met_pago_label',
  img: 'mp',
  value: 'Mercado Pago',
  className: 'tall',
  showText: false
};

export const MedModPaymentButton = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
MedModPaymentButton.args = {
  idElement: 'med_tarjeta',
  value: 'Pagar con tarjeta',
  classLabel: 'half'
};
