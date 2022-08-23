/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import FormInput from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/Pasarela de Cobros/FormInput',
  component: FormInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
function Template(args) {
  return (
    <div className="form-grid">
      <FormInput {...args} />
    </div>
  );
}

export const TextField = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TextField.args = {
  label: 'Número de Contrato',
  value: '',
  tooltip: 'Nombre',
  placeholder: 'Ingrese número de contrato',
  type: 'number'
};
