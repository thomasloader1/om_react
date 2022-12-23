/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import CourseItem from './index';
import '../../../../src/scss/pasarela-de-cobros.scss';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/Pasarela de Cobros/CourseItem',
  component: CourseItem,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
function Template(args) {
  return (
    <div className="courses-grid">
      <CourseItem {...args} />
    </div>
  );
}

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  profession: 'medicina',
  specialty: 'Anestesiología y dolor',
  hours: 320,
  courseId: 'curso-1',
  name: 'Estrés ante la hospitalización y ansiedad prequirúrgica en pacientes adultos',
  price: 200.972
};

export function List(args) {
  return (
    <>
      <div className="courses-grid">
        <div className="courses-grid-searchFilter"></div>
        <CourseItem {...args} />
        <CourseItem
          {...args}
          name="Enfermería y cuidados intensivos neonatales"
        />
        <CourseItem {...args} />
        <CourseItem {...args} />
        <CourseItem {...args} />
        <CourseItem {...args} />
      </div>
    </>
  );
}
List.args = {
  profession: 'medicina',
  specialty: 'Anestesiología y dolor',
  hours: 320,
  courseId: 'curso-1',
  name: 'Estrés ante la hospitalización y ansiedad prequirúrgica en pacientes adultos',
  price: 200.972
};
