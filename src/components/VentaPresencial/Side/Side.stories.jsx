/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import SideItem from '../SideItem';

import Side from './index';
import { SideData } from './options';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/Pasarela de Cobros/Side',
  component: Side,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
function Template(args) {
  return <Side {...args} />;
}

export const SideMenu = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SideMenu.args = {
  children: (
    <div className="side-body">
      {SideData.map(({ ...props }) => (
        <SideItem {...props} />
      ))}
    </div>
  ),
  currentStep: 1,
  label: 'País'
};
