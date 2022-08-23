/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import './FormInput.scss';
import { Form } from 'react-bulma-components';

function FormInput({
  disabled,
  label,
  tooltip,
  placeholder,
  status,
  idElement,
  value,
  name,
  className,
  type
}) {
  // Botón default render
  return (
    <Form.Field id={`${idElement}_field`} className="form-item">
      <Form.Label htmlFor={idElement} className="is-uppercase">
        {!label ? 'Label' : label}
      </Form.Label>
      <Form.Control className="is-flex">
        <Form.Input
          type={type}
          id={idElement}
          name={name}
          value={value}
          disabled={disabled}
          status={status}
          className={`is-flex is-flex-grow-1 ${className}`}
          placeholder={placeholder}
        />
      </Form.Control>
      <Form.Help color="danger">El {tooltip} no es valido</Form.Help>
    </Form.Field>
    /* <Form.Field>
        <Form.Label>Subject</Form.Label>
        <Form.Field kind="group">
          <Form.Control>
            <Form.Select
              value={subject}
              onChange={(e) => {
                return setSubject(e.target.value);
              }}
            >
              <option value="select-dropdown">Select dropdown</option>
              <option value="with-options">With options</option>
            </Form.Select>
          </Form.Control>
          <Form.Control fullwidth loading>
            <Form.Input placeholder="With loading state" />
          </Form.Control>
        </Form.Field>
      </Form.Field> */
  );
}

FormInput.propTypes = {
  disabled: PropTypes.bool,
  type: PropTypes.string,
  status: PropTypes.string,
  label: PropTypes.string,
  tooltip: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  idElement: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};
FormInput.defaultProps = {
  disabled: false,
  type: '',
  label: '',
  tooltip: '',
  placeholder: '',
  status: '',
  className: '',
  name: ''
};
export default FormInput;
