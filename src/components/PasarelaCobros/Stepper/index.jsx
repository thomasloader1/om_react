import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AppContext } from '../Provider/StateProvider';
import Step from '../Step';
import {
  FormClientDataStep,
  SelectCountryStep,
  SelectPaymentMethodStep,
  SelectPaymentModeStep
} from './Steps';


function Stepper() {
  const [state] = useContext(AppContext);
  const [currentInfoStep] = state.sideItemOptions.filter(
    (sideOption) => sideOption.status === 'current'
  );
  const [actualStep, setCurrentStep] = useState(currentInfoStep);

  useEffect(() => {
    setCurrentStep(currentInfoStep);
  }, [state]);

  const formik = useFormik({
    initialValues: {
      country: '',
    },
    validationSchema: Yup.object({
      country: Yup.string().required('Seleccione un pais'),
    }),
    onSubmit: (values) => {
      console.log('formik values',values);
      
    }
  })

  const { step, label } = actualStep;

  return (
    <section className="container is-max-widescreen">
      <Step currentStep={step} stepTitle={`Seleccione un ${label}`} setCurrentStep={setCurrentStep} formikHook={formik}>
        <div>
          <SelectCountryStep 
          countryOptions={state.countryOptions} 
          currentStep={step} 
          setCurrentStep={setCurrentStep} 
          />
        </div>
        <div>
          <SelectPaymentMethodStep
          currentStep={step} 
          setCurrentStep={setCurrentStep} 

            paymentOptions={state.paymentOptions}
            userFlow={state.userFlow}
          />
        </div>
        <div>
          <SelectPaymentModeStep 
          currentStep={step} 
          setCurrentStep={setCurrentStep}
           />
        </div>
        <div>
          <FormClientDataStep
          currentStep={step} 
          setCurrentStep={setCurrentStep} 
          />
        </div>
        <div>
          Todavia no pa
        </div>
      </Step>
      
    </section>
  );
}

export default Stepper;
