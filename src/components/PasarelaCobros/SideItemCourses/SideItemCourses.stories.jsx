/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import SideItemCourses from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/Pasarela de Cobros/SideItemCourses',
  component: SideItemCourses,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
function Template(args) {
  return (
    <div className="side-body" style={{ maxWidth: '335px' }}>
      <SideItemCourses {...args} />
    </div>
  );
}

export function States(args) {
  return (
    <div className="side-body" style={{ maxWidth: '335px' }}>
      <SideItemCourses {...args} />
      <Current status="selection" />
    </div>
  );
}

export const Current = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Current.args = {
  currentStep: 4,
  status: 'selection',
  label: 'seleccion de cursos',
  courseId: '123456',
  courseSelected:
    'Estrés ante la hospitalización y ansiedad prequirúrgica en pacientes adultos',
  individualCost: 2000,
  totalCost: 200000
};
