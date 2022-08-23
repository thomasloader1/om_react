/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { MdInfoOutline } from 'react-icons/md';
import Button from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/Pasarela de cobros/Button',
  component: Button
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
function Template(args) {
  return <Button {...args} />;
}

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  color: 'primary',
  label: 'Button'
};
export const Fullwidth = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Fullwidth.args = {
  fullwidth: true
};

export function Variants(args) {
  return (
    <>
      <Button {...args} label="Fill" />
      <Button {...args} label="Light" colorVariant="light" />
      <Button {...args} label="Outlined" outlined />
      <Button {...args} label="Rounded" rounded />
      <Button {...args} label="Inverted" inverted />
      <Button {...args} label="Inverted outlined" inverted outlined />
      <Button {...args} label="Ghost" color="" className="is-ghost" />
      <Button {...args} label="Text" color="" className="is-text" />
      <Button {...args} label="whit Icon" icon={<MdInfoOutline />} />
    </>
  );
}

export function States(args) {
  return (
    <>
      <Button {...args} label="Hover" status="hover" />
      <Button {...args} label="Focus" status="focus" />
      <Button {...args} label="Active" status="active" />
      <Button {...args} label="Disabled" disabled />
      <Button {...args} loading />
      <Button {...args} label="Static" isStatic />
    </>
  );
}

export function Colors(args) {
  return (
    <>
      <Button {...args} label="Primary" color="primary" />
      <Button {...args} label="Link" color="link" />
      <Button {...args} label="Info" color="info" />
      <Button {...args} label="Sucess" color="success" />
      <Button {...args} label="Warning" color="warning" />
      <Button {...args} label="Danger" color="danger" />
      <Button {...args} label="Dark" color="dark" />
    </>
  );
}

export function Sizes(args) {
  return (
    <>
      <Button {...args} label="Default" size="normal" />
      <Button {...args} label="Small" size="small" />
      <Button {...args} label="Medium" size="medium" />
      <Button {...args} label="Large" size="large" />
    </>
  );
}
