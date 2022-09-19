/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useContext } from 'react';
import { Form } from 'semantic-ui-react';
import { AppContext } from '../Provider/StateProvider';
import RadioButton from '../RadioButton';

export function SelectCountryStep({ countryOptions }) {
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
  });
  return (
    <form autoComplete='off' id="pais-grid" className="gridCuartos" onSubmit={formik.handleSubmit}>
      {countryOptions.map(({ ...props }) => (
        <RadioButton {...props} name="country" key={props.idElement} formikHook={formik} />
      ))}
    </form>
  );
}

export function SelectPaymentMethodStep({ paymentOptions, userFlow }) {
  const isoCountry = userFlow.stepOne.isoRef;

  return (
    <div id="metPago_grid" className="gridCuartos">
      {paymentOptions.map(
        ({ ...props }) =>
          props.allowedCountries.includes(isoCountry) && (
            <RadioButton
              {...props}
              showText={false}
              key={props.shortName}
              typeBtn="payment_method"
            />
          )
      )}
    </div>
  );
}

export function SelectPaymentModeStep() {
  const [state] = useContext(AppContext);

  return (
    <div id="medModPago_grid" className="grid-med_mod_payment">
      {state.paymentMethodOptions.map(({ ...props }) => {
        console.log({ props });
        return <RadioButton {...props} key={props.idElement} />;
      })}
      <div className="is-divider doble" />
      {state.paymentModeOptions.map(({ ...props }) => (
        <RadioButton {...props} key={props.idElement} />
      ))}
    </div>
  );
}

export function FormClientDataStep() {
  // const [state] = useContext(AppContext);


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required(true),
      email: Yup.string().required(true),
      phone: Yup.string()
    }),
    onSubmit: (values) => {
      console.log(values);
      
    }
  });

  console.log({formik})

  return (
    <Form autoComplete='off' style={{width: '80%', margin: '0 auto'}} onSubmit={formik.handleSubmit}>
      <Form.Input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.errors.name}
          />
      <Form.Input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email}

          />
     <Form.Input
            name="phone"
            type="tel"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.errors.phone}

          />
      <button type='submit'>enviar</button>
    </Form>
  );
}
