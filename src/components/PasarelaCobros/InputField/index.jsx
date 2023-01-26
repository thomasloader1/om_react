import { useField, useFormikContext } from 'formik';
import React from 'react';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const { setFieldTouched, setFieldValue } = useFormikContext();
  console.log({ props });
  return (
    <div className="field">
      <label htmlFor={props.id} className="label">
        {label}
      </label>
      <div className="control">
        {props.id && props.name !== 'telephone' ? (
          <input
            className={meta.error ? 'input is-danger' : 'input'}
            {...field}
            {...props}
          />
        ) : (
          <IntlTelInput
            defaultCountry="ar"
            type={props.type}
            containerClassName="intl-tel-input"
            inputClassName={meta.error ? 'input is-danger' : 'input'}
            defaultValue={`${field.value}`}
            fieldId={props.id}
            fieldName={props.name}
            onPhoneNumberBlur={() => {
              setFieldTouched(props.name, true);
            }}
            onPhoneNumberChange={(...args) => {
              const [_, phone, countryObject] = args;
              setFieldValue(props.name, `${countryObject.dialCode}${phone}`);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default InputField;
