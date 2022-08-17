/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Button from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/Pasarela de cobros/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
function Template(args) {
  return <Button {...args} />;
}

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  outlined: false,
  label: 'Siguiente'
};

export const Secondary = Template.bind({});
Secondary.args = {
  outlined: true,
  label: 'Volver'
};

