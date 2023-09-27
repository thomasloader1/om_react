import { useField, useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import { getIsoCode } from '../../../utils/getIsoCode';
import { getAvailableDocuments } from '../../../utils/getAvailableDocuments';

const SelectDocument = ({
  selectName = 'Seleccione el tipo de identificacion',
  country,
  ...props
}) => {
  const [field, meta] = useField(props);
  const formik = useFormikContext();

  const countryCode = getIsoCode(country);
  const options = getAvailableDocuments(countryCode);

  useEffect(() => {
    formik.setFieldValue('document_type', 'CC');

    return () => null;
  }, []);

  return (
    <div className={`select ${meta.error ? 'is-danger' : 'is-link'}`}>
      <label className='label'>{selectName}</label>
      <select {...props} {...field}>
        {options.map((option) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDocument;
