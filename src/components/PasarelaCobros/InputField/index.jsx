import { useField } from 'formik';
import React from 'react';
import PhoneInput from 'react-phone-number-input';

const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const renderInput = props.type === 'phone' ? <PhoneInput
    className={meta.error ? 'input is-danger' : 'input'}
    {...field} {...props}
  /> : <input className={meta.error ? 'input is-danger' : 'input'} {...field} {...props} />

  return (
    <div className='field'>
      <label htmlFor={props.id} className='label'>
        {label}
      </label>
      <div className='control'>
        {renderInput}
      </div>
    </div>
  );
};

export default InputField;
