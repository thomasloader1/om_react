/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import LabelCountryPasarelaCobros from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/Pasarela de Cobros/LabelCountry',
  component: LabelCountryPasarelaCobros,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
function Template(args) {
  return <LabelCountryPasarelaCobros {...args} />;
}

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  idElement:'pais_arg_label',
  flag: 'argFlag', 
  title: 'Argentina'
};
