/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Card from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/Pasarela de Cobros/Card',
  component: Card,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
function Template(args) {
  return <Card {...args} />;
}

export const Comercial = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Comercial.args = {
  title: 'Asesor comercial',
  srcImg: 'asesorComercial',
  altImg: 'tarjeta de asesor comercial',
  idElement: 'asesorComercial',
  idBtnElement: 'ctaAsesorComercial'
};

export const Cobranza = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Cobranza.args = {
  title: 'Asesor de cobranzas',
  srcImg: 'asesorCobranzas',
  altImg: 'tarjeta de asesor de cobranzas',
  idElement: 'asesorCobranzas',
  idBtnElement: 'ctaAsesorCobranzas'
};