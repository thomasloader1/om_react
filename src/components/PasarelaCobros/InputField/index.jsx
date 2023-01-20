import { useField, useFormikContext } from 'formik';
import React from 'react';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const { setFieldTouched, setFieldValue } = useFormikContext();

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
            containerClassName="intl-tel-input"
            inputClassName={meta.error ? 'input is-danger' : 'input'}
            type="tel"
            defaultValue={field.value}
            fieldId={field.id}
            fieldName={field.name}
            onPhoneNumberBlur={() => {
              setFieldTouched(field.name, true);
            }}
            onPhoneNumberChange={(...args) => {
              const [_, phone, countryObject] = args;
              setFieldValue(field.name, `${countryObject.dialCode}${phone}`);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default InputField;
