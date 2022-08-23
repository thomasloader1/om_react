/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import './RadioButton.scss';
import { Form } from 'react-bulma-components';

import IMAGES from '../../../img/pasarelaCobros/share';

function RadioButton({
  disabled,
  showText,
  status,
  idElement,
  img,
  value,
  name,
  className,
  classLabel
}) {
  const buttonStatus = {
    active: `is-link is-light is-outlined ${className}`
  };
  const classNameStatus = status !== '' ? `${buttonStatus[status]}` : className;

  // Botón default render
  return (
    <Form.Field className={classLabel} id={`${idElement}_field`}>
      <Form.Control>
        <Form.Radio
          hasText={showText}
          id={idElement}
          htmlFor={idElement}
          className={`gridCuartos-item button ${classNameStatus}`}
          name={name}
          value={value}
          disabled={disabled}
        >
          {img && <img src={IMAGES[img]} alt={value} />}
          {showText && <h4 className="text_option">{value}</h4>}
        </Form.Radio>
      </Form.Control>
    </Form.Field>
  );
}

RadioButton.propTypes = {
  showText: PropTypes.bool,
  disabled: PropTypes.bool,
  status: PropTypes.string,
  className: PropTypes.string,
  classLabel: PropTypes.string,
  name: PropTypes.string,
  idElement: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  img: PropTypes.string
};
RadioButton.defaultProps = {
  showText: true,
  disabled: false,
  status: '',
  className: '',
  classLabel: '',
  name: '',
  img: ''
};
export default RadioButton;
