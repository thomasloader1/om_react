/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import { useFormik } from 'formik';
import * as Yup from 'yup';

import React, { useContext } from 'react';
import { Form } from 'semantic-ui-react';
import { Form as FB } from 'react-bulma-components'
import { AppContext } from '../Provider/StateProvider';
import { sideItemOptions } from '../../../config/config';
import RadioButton from '../RadioButton';
import StepControl from '../StepControl';

export function SelectCountryStep({
  countryOptions,
  currentStep,
  setCurrentStep
}) {
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
    },
    onChange: (values) => {
      console.log('Change', values);
    }
  });

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
      />
    </form>
  );
}

export function SelectPaymentMethodStep({
  paymentOptions,
  userFlow,
  currentStep,
  setCurrentStep
}) {
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
    },
    onChange: (values) => {
      console.log('Change', values);
    }
  });

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
              onChange={formik.handleChange}
            />
          )
        /* console.log(props)
        return <pre>{JSON.stringify({props,isoCountry}, null, 2)}</pre> */
      )}
      <StepControl
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        state={state}
        sideItemOptions={sideItemOptions}
      />
    </form>
  );
}

export function SelectPaymentModeStep({ currentStep, setCurrentStep }) {
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
    },
    onChange: (values) => {
      console.log('Change', values);
    }
  });

  return (
    <form
      id="medModPago_grid"
      className="grid-med_mod_payment"
      onSubmit={formik.handleSubmit}
    >
      {state.paymentMethodOptions.map(({ ...props }) => {
        console.log({ props });
        return <RadioButton {...props} key={props.idElement} />;
      })}
      
      <div className="is-divider doble" />

      {state.paymentModeOptions.map(({ ...props }) => (
        <RadioButton {...props} key={props.idElement} />
      ))}
      
      <StepControl
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        state={state}
        sideItemOptions={sideItemOptions}
      />
    </form>
  );
}

export function FormClientDataStep({ currentStep, setCurrentStep }) {
  const [state] = useContext(AppContext);
const clientFormWithoutOptions = state.clientForm.filter( input => !input.options)
  const formik = useFormik({
    initialValues: {
      numeroContrato: '',
      email: '',
      montoContrato: '',
      cuotas: '',
      montoMensual: '',
    },
    validationSchema: Yup.object({
      numeroContrato: Yup.string().required(true),
      email: Yup.string().email('Correo Invalido').required(true),
      montoContrato: Yup.string().required(true),
      cuotas: Yup.string().required(true),
      montoMensual: Yup.string().required(true),
    }),
    onSubmit: (values) => {
      console.log(values);
    }
  });
  console.log(formik.values)

  return (
    <>
   {/*  <pre>{JSON.stringify(state.clientForm, null, 2)}</pre>  */}

    <Form
      autoComplete="off"
      style={{ width: '80%', margin: '0 auto' }}
      className="grid-client_form"
      onSubmit={formik.handleSubmit}
    >
{clientFormWithoutOptions.map((input) => {
  console.log(formik.values[input.idElement])
  return(
    <FB.Field>
    <FB.Label>
      {input.label}
    </FB.Label>
    <FB.Control>
      <FB.Input
        placeholder={input.placeholder}
        type="text"
        value={formik.values[input.idElement]}
        onChange={formik.handleChange}
        name={input.idElement}
        id={input.idElement}
      />
      {formik.errors[input.idElement] && formik.touched[input.idElement] ? (<div>{formik.errors[input.idElement]}</div>) : null}
    </FB.Control>
  </FB.Field>)}
)}
      
      <StepControl
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        state={state}
        sideItemOptions={sideItemOptions}
      />
    </Form>
    </>
  );
}
