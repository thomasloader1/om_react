import { useField } from 'formik';
import React from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';


const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  if (props.id === 'cardNumber') {
    return (
      <div className='field'>
        <label htmlFor={props.id} className='label'>
          {label}
        </label>
        <div className='control'>
          <CardNumberElement className={meta.error ? 'input is-danger' : 'input'} {...field} {...props} />
        </div>
      </div>
    );
  }
  if (props.id === 'cardExpDate') {
    return (
      <div className='field'>
        <label htmlFor={props.id} className='label'>
          {label}
        </label>
        <div className='control'>
          <CardExpiryElement className={meta.error ? 'input is-danger' : 'input'} {...field} {...props} />
        </div>
      </div>
    );
  }
  if (props.id === 'cardCvc') {
    return (
      <div className='field'>
        <label htmlFor={props.id} className='label'>
          {label}
        </label>
        <div className='control'>
          <CardCvcElement className={meta.error ? 'input is-danger' : 'input'} {...field} {...props} />
        </div>
      </div>
    );
  }

  return (
    <div className='field'>
      <label htmlFor={props.id} className='label'>
        {label}
      </label>
      <div className='control'>
        <input className={meta.error ? 'input is-danger' : 'input'} {...field} {...props} />
      </div>
    </div>
  );
};

export default InputField;
