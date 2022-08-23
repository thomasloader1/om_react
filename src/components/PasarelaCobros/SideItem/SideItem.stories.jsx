/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import SideItem from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/Pasarela de Cobros/SideItem',
  component: SideItem,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
function Template(args) {
  return (
    <div className="Side-body" style={{ maxWidth: '335px' }}>
      <SideItem {...args} />
    </div>
  );
}

export function States(args) {
  return (
    <div className="Side-body" style={{ maxWidth: '335px' }}>
      <SideItem {...args} />
      <Current status="current" />
      <Completed status="completed" />
    </div>
  );
}

export const Current = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Current.args = {
  currentStep: 1,
  status: 'current',
  idElement: 'pais',
  valueSelected: 'Argentina',
  label: 'PAÍS'
};

export const Completed = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Completed.args = {
  currentStep: 1,
  status: 'completed',
  valueSelected: 'Argentina',
  label: 'PAÍS'
};
