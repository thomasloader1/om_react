import { useField } from 'formik';
import React from 'react';

const Select = ({ options, placeholderText, label, ...props }) => {
  const [field, meta] = useField(props);
  const { error } = meta;

  return (
    <div className="field">
      <label htmlFor={props.id} className="label">
        {label}
      </label>
      <div className="control select">
        <select
          {...field}
          {...props}
          className={error ? 'input is-danger' : 'input'}
        >
          <option>{placeholderText}</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
