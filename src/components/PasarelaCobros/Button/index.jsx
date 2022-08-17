/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

/**
 * Primary UI component for user interaction
 */
function Button({ outlined, label }) {
  const mode = outlined
    ? 'column button is-primary is-outlined'
    : 'column button is-primary';
  return (
    <button type='button' className={mode}>{label}</button>
  );
}

Button.propTypes = {
  outlined: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

export default Button;
