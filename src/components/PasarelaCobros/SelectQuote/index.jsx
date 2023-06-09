import { useField, useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import { getIsoCode } from '../../../utils/getIsoCode';
import { getAvailableInstallments } from '../../../utils/getAvailableInstallments';

const SelectQuote = ({ selectName = 'Seleccionar las cuotas', country, ...props }) => {
  const [field, meta] = useField(props);
  const formik = useFormikContext();

  const countryCode = getIsoCode(country);
  const options = getAvailableInstallments(countryCode);
  const maxOption = Math.max(...options);

  useEffect(() => {
    ////console.log(maxOption, { options });
    formik.setFieldValue('quotes', maxOption);
    return () => null;
  }, []);

  return (
    <div className={`select ${meta.error ? 'is-danger' : 'is-link'}`}>
      <label className='label'>{selectName}</label>
      <select {...props} {...field} >
        {options.map((option) => (
          <option key={option} value={option} selected={maxOption === option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectQuote;
