/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import * as Yup from 'yup';
import { sideItemOptions } from '../../../config/config';
import { AppContext } from '../Provider/StateProvider';
import RadioButton from '../RadioButton';
import StepControl from '../StepControl';

function SelectCountryStep({ countryOptions, currentStep, setCurrentStep }) {
  const [state] = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      country: ''
    },
    validationSchema: Yup.object({
      country: Yup.string().required('Seleccione un pais')
    }),
    onSubmit: (values) => {
      console.log('formik values', values);
    }
  });

  console.log({formikCountry: formik})

  return (
    <form
      autoComplete="off"
      id="pais-grid"
      className="grid-country"
      onSubmit={formik.handleSubmit}
    >
      {countryOptions.map(({ ...props }) => (
        <RadioButton
          {...props}
          name="country"
          key={props.idElement}
          formikHook={formik}
          onChange={formik.handleChange}
        />
      ))}
      <StepControl
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        state={state}
        sideItemOptions={sideItemOptions}
        validStep={formik.isSubmitting}
        currentFormikValues={formik.values}
      />
    </form>
  );
}

export default SelectCountryStep;
