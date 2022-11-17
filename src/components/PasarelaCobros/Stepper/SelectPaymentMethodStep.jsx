/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import { useFormik } from 'formik';
import React, { useContext } from 'react'
import * as Yup from 'yup'
import { sideItemOptions } from '../../../config/config';
import { AppContext } from '../Provider/StateProvider';
import RadioButton from '../RadioButton';
import StepControl from '../StepControl';

function SelectPaymentMethodStep({paymentOptions,
    userFlow,
    currentStep,
    setCurrentStep}) {
        const isoCountry = userFlow.stepOne.isoRef;
        const [state] = useContext(AppContext);
      
        const formik = useFormik({
          initialValues: {
            payment_method: ''
          },
          validationSchema: Yup.object({
            payment_method: Yup.string().required('Seleccione un metodo')
          }),
          onSubmit: (values) => {
            console.log('formik values', values);
          }
        });
      
        console.log({ formValid: formik.isValid, formik });
        
    return (
        <form
          autoComplete="off"
          id="metPago_grid"
          className="grid-payment_method"
          onSubmit={formik.handleSubmit}
        >
          {paymentOptions.map(
            ({ allowedCountries, ...props }) =>
              allowedCountries.includes(isoCountry) && (
                <RadioButton
                  {...props}
                  name="payment_method"
                  showText={false}
                  key={props.shortName}
                  typeBtn="payment_method"
                  formikHook={formik}
                  formikValue={props.value}
                  onChange={formik.handleChange}
                />
              )
          )}
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

export default SelectPaymentMethodStep