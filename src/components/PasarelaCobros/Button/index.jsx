/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import 'bulma/css/bulma.min.css';
import { Button } from 'react-bulma-components';

const SIZES = {
  N: 'normal',
  S: 'small',
  M: 'medium',
  L: 'large'
};
const STATES = {
  NONE: '',
  FOCUS: 'focus',
  HOVER: 'hover',
  ACTIVE: 'active'
};
const COLORVARIANT = {
  LIGHT: 'light',
  NORMAL: ''
};

function Btn({
  disabled,
  loading,
  outlined,
  status,
  color,
  size,
  label,
  className,
  colorVariant,
  isStatic,
  rounded,
  fullwidth,
  inverted,
  icon
}) {
  //  const disabledState = disabled ? 'button is-primary is-outlined' : 'button is-primary';

  return (
    <Button
      disabled={disabled}
      loading={loading}
      outlined={outlined}
      status={status}
      className={className}
      color={color}
      size={size}
      colorVariant={colorVariant}
      isStatic={isStatic}
      rounded={rounded}
      fullwidth={fullwidth}
      inverted={inverted}
    >
      {icon}
      {label}
    </Button>
  );
}

Btn.propTypes = {
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  outlined: PropTypes.bool,
  status: PropTypes.oneOf(Object.values(STATES)),
  colorVariant: PropTypes.oneOf(Object.values(COLORVARIANT)),
  isStatic: PropTypes.bool,
  rounded: PropTypes.bool,
  fullwidth: PropTypes.bool,
  inverted: PropTypes.bool,
  label: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.oneOf(Object.values(SIZES)),

  className: PropTypes.string
};

Btn.defaultProps = {
  disabled: false,
  loading: false,
  outlined: false,
  status: '',
  colorVariant: '',
  isStatic: false,
  rounded: false,
  fullwidth: false,
  inverted: false,
  color: 'primary',
  size: 'normal',
  label: 'Button',
  className: ''
};
export default Btn;
