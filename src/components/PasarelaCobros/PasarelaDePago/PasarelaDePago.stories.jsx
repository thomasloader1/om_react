/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PasarelaDePago from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'layouts/PasarelaDePago',
  component: PasarelaDePago,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' }
  }
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
function Template(args) {
  return <PasarelaDePago {...args} />;
}

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  title: 'Actualización en politraumatismos y emergencias',
  size: '20rem',
  backgroundColor: '#FFF'
};