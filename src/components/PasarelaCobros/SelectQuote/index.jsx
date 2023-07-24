import { useField, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { getIsoCode } from '../../../utils/getIsoCode';
import { getAvailableInstallments } from '../../../utils/getAvailableInstallments';

const SelectQuote = ({ selectName = 'Seleccionar las cuotas', country, ...props }) => {
  const [field, meta] = useField(props);
  const formik = useFormikContext();

  const countryCode = getIsoCode(country);
  const options = getAvailableInstallments(countryCode);
  const maxOption = Math.max(...options);
  const [currentValue, setCurrentValue] = useState(maxOption)

  useEffect(() => {
    ////console.log(maxOption, { options });
    formik.setFieldValue('quotes', maxOption);
    setCurrentValue(maxOption)
    return () => null;
  }, [currentValue]);

  return (
    <div className={`select ${meta.error ? 'is-danger' : 'is-link'}`}>
      <label className='label'>{selectName}</label>
      <select {...props} {...field} defaultValue={currentValue}>
        {options.map((option) => (
          <option key={option} value={option} >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectQuote;
