/* eslint-disable dot-notation */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint dot-notation: "error" */

import { useFormik } from 'formik';
import * as Yup from 'yup';

import React, { useContext } from 'react';
import { Form, Radio } from 'semantic-ui-react';
import { Form as FB } from 'react-bulma-components';

// pago stripe
import axios from 'axios';
// import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { AppContext } from '../Provider/StateProvider';
import { sideItemOptions } from '../../../config/config';
import RadioButton from '../RadioButton';
import StepControl from '../StepControl';
import { delegateManager } from '../Hooks/useStepManager';

export function SelectCountryStep({ countryOptions, currentStep, setCurrentStep }) {
  const [state] = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      country: '',
    },
    validationSchema: Yup.object({
      country: Yup.string().required('Selecciona un pais'),
    }),
    onSubmit: (values) => {
      // //console.log('formik values', values);
    },
  });

  return (
    <form autoComplete='off' id='pais-grid' className='grid-country' onSubmit={formik.handleSubmit}>
      {countryOptions.map(({ ...props }) => (
        <RadioButton
          {...props}
          name='country'
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
        validStep={formik.isValid}
      />
    </form>
  );
}

export function SelectPaymentMethodStep({ paymentOptions, userFlow, currentStep, setCurrentStep }) {
  const isoCountry = userFlow.stepOne.isoRef;
  const [state] = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      payment_method: '',
    },
    validationSchema: Yup.object({
      payment_method: Yup.string().required('Selecciona un método'),
    }),
    onSubmit: (values) => {
      // //console.log('formik values', values);
    },
    onChange: (values) => {
      // //console.log('Change', values);
    },
  });

  // //console.log({ formValid: formik.isValid });

  return (
    <form
      autoComplete='off'
      id='metPago_grid'
      className='grid-payment_method'
      onSubmit={formik.handleSubmit}
    >
      {paymentOptions.map(
        ({ allowedCountries, ...props }) =>
          allowedCountries.includes(isoCountry) && (
            <RadioButton
              {...props}
              name='payment_method'
              showText={false}
              key={props.shortName}
              typeBtn='payment_method'
              formikHook={formik}
              formikValue={props.value}
              onChange={formik.handleChange}
            />
          ),
      )}
      <StepControl
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        state={state}
        sideItemOptions={sideItemOptions}
        validStep={formik.isValid}
      />
    </form>
  );
}

export function SelectPaymentModeStep({ currentStep, setCurrentStep }) {
  const [state] = useContext(AppContext);
  const initialValuesNormal = { med: '', mod: '' };
  const validationSchemaNormal = {
    med: Yup.string().min(1).required('Selecciona un método'),
    mod: Yup.string().min(1).required('Selecciona un método'),
  };

  const initialValuesSpecial = { numberSO: '' };
  const validationSchemaSpecial = {
    numberSO: Yup.string().min(1).required('Ingresar un numero de SO'),
  };

  const formik = useFormik({
    initialValues: initialValuesNormal,
    validationSchema: Yup.object(validationSchemaNormal),
    onSubmit: (values) => {
      // //console.log('formik values', { values });
      /*  const [currentStepObject] = state.sideItemOptions.filter( options => options.status === 'current');
       delegateManager(currentStepObject,values) */
    },
    onChange: (values) => {
      // //console.log('Change', { values });
      /* const [currentStepObject] = state.sideItemOptions.filter( options => options.status === 'current');
      delegateManager(currentStepObject,values) */
    },
  });

  const getContractCRM = (soNumber = '2000339000483253046') => {
    const request = axios.get(
      `https://oceanomedicina.net/laravel-foclis/zoho/test/contrato/${soNumber}`,
    );
    const contractData = request.then((res) => res.data).catch((err) => console.error({ err }));
    return contractData;
  };

  const formikSpecial = useFormik({
    initialValues: initialValuesSpecial,
    validationSchema: Yup.object(validationSchemaSpecial),
    onSubmit: (values) => {
      // //console.log('formik values', { values });
      const [currentStepObject] = state.sideItemOptions.filter(
        (options) => options.status === 'current',
      );
      const contract = getContractCRM();
      // //console.log({contract})
      // delegateManager(currentStepObject, values);
    },
  });

  if (state.userFlow.stepTwo.value === 'Mercado Pago') {
    // //console.log('formikSpecial', { formikSpecialValues:formikSpecial.values })

    return (
      <form
        id='medModPago_grid'
        autoComplete='off'
        className='grid-med_mod_payment-mp'
        onSubmit={formikSpecial.handleSubmit}
      >
        <div className='field'>
          <label htmlFor='numberSO' className='label'>
            Ingrese SO de Contrato
          </label>
          <div className='control'>
            <input
              placeholder='2000339000004553081'
              className={formikSpecial.errors.numberSO ? 'input is-danger' : 'input'}
              type='number'
              value={formikSpecial.values.numberSO}
              onChange={formikSpecial.handleChange}
              onBlur={formikSpecial.handleBlur}
              name='numberSO'
              id='numberSO'
            />
          </div>
          {formikSpecial.errors.numberSO && (
            <p className='help is-danger'>{formikSpecial.errors.numberSO}</p>
          )}
        </div>
        {/* <FB.Field style={{ marginBottom: '0.7rem' }}>
          <FB.Label>Ingrese SO de Contrato</FB.Label>
          <FB.Control>
            <FB.Input
              placeholder='2000339000004553081'
              className={formikSpecial.errors.numberSO && 'is-danger'}
              type='text'
              value={formikSpecial.values.numberSO}
              onChange={formikSpecial.handleChange}
              onkeyup={formikSpecial.handleBlur}
              name='numberSO'
              id='numberSO'
            />
            {formikSpecial.errors.numberSO && (
              <p className='help is-danger'>{formikSpecial.errors.numberSO}</p>
            )}
          </FB.Control>
        </FB.Field> */}
        {/* <div id="finalResume" className="is-full column invisible"> */}
        {/* <ResumeTicket data={data} /> */}

        <StepControl
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          state={state}
          sideItemOptions={sideItemOptions}
          validStep={formikSpecial.isValid}
        />
      </form>
    );
  }

  return (
    <form
      id='medModPago_grid'
      autoComplete='off'
      className='grid-med_mod_payment'
      onSubmit={formik.handleSubmit}
    >
      {state.paymentMethodOptions.map(({ ...props }) => {
        // //console.log({ isValidForm: formik.isValid });
        return (
          <RadioButton
            {...props}
            key={props.idElement}
            formikHook={formik}
            formikValue={formik.values.med}
            onChange={formik.handleChange}
          />
        );
      })}

      <div className='is-divider doble' />

      {state.paymentModeOptions.map(({ ...props }) => (
        <RadioButton
          {...props}
          key={props.idElement}
          formikHook={formik}
          formikValue={formik.values.mod}
          onChange={formik.handleChange}
        />
      ))}

      <StepControl
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        state={state}
        sideItemOptions={sideItemOptions}
        validStep={formik.isValid}
      />
    </form>
  );
}

export function FormClientDataStep({ currentStep, setCurrentStep }) {
  const [state] = useContext(AppContext);
  const clientFormWithoutOptions = state.clientForm.filter((input) => !input.options);
  const clientFormRadioField = state.clientForm.filter(
    (input) => input.options && typeof input.options[0] === 'string',
  );
  const [currentStepObject] = state.sideItemOptions.filter(
    (options) => options.status === 'current',
  );

  const formik = useFormik({
    initialValues: {
      numeroContrato: '',
      email: '',
      montoContrato: '',
      cuotas: '',
      montoMensual: '',
      tipoSuscripcion: '',
    },
    validationSchema: Yup.object({
      numeroContrato: Yup.number()
        .typeError('Numero de contrato debe ser un numero')
        .positive('No se permite valores negativos')
        .min(10, 'Ingrese un SO valido')
        .required('Campo requerido'),
      email: Yup.string().email('Correo Invalido').required('Campo requerido'),
      montoContrato: Yup.number()
        .typeError('Monto de contrato debe ser un numero')
        .positive('No se permite valores negativos')
        .required('Campo requerido'),
      cuotas: Yup.number()
        .typeError('Cuotas debe ser un numero')
        .positive('No se permite valores negativos')
        .required('Campo requerido'),
      montoMensual: Yup.number()
        .typeError('Numero de contrato debe ser un numero')
        .positive('No se permite valores negativos')
        .required('Campo requerido'),
      tipoSuscripcion: Yup.string().required('Campo requerido'),
    }),
    onSubmit: (values) => {
      // //console.log(values);
      state.sideItemOptions[3].value = JSON.stringify({ ...values });
      state.userFlow[3].value = JSON.stringify({ ...values });
      delegateManager(currentStepObject, values, state);
    },
    onChange: (values) => {
      delegateManager(currentStepObject, values, state);

      // //console.log({ state, formik });
    },
  });
  return (
    <Form
      autoComplete='off'
      style={{ width: '80%', margin: '0 auto' }}
      className='grid-client_form'
      onSubmit={formik.handleSubmit}
    >
      <div className='suscri_type'>
        {clientFormRadioField.map((input) => (
          <Form.Field>
            <label className='label'>{input.label}</label>
            {input.options.map((option) => (
              <Radio
                label={` ${option}`}
                name={input.idElement}
                value={option}
                checked={formik.values[input.idElement] === option}
                onChange={formik.handleChange}
                key={option.idElement}
              />
            ))}
            {formik.errors[input.idElement] && (
              <p className='help is-danger'>{formik.errors[input.idElement]}</p>
            )}
          </Form.Field>
          /*  <pre>{JSON.stringify(input, null, 2)}</pre> */
        ))}
      </div>
      {clientFormWithoutOptions.map((input) => (
        <FB.Field key={input.idElement} style={{ marginBottom: '0.7rem' }}>
          <FB.Label>{input.label}</FB.Label>
          <FB.Control>
            <FB.Input
              placeholder={input.placeholder}
              className={formik.errors[input.idElement] && 'is-danger'}
              type='text'
              value={formik.values[input.idElement]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name={input.idElement}
              id={input.idElement}
            />
            {formik.errors[input.idElement] && (
              <p className='help is-danger'>{formik.errors[input.idElement]}</p>
            )}
          </FB.Control>
        </FB.Field>
      ))}

      <StepControl
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        state={state}
        sideItemOptions={sideItemOptions}
        validStep={formik.isValid}
      />
    </Form>
  );
}

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  // const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    // setLoading(true);

    if (!error) {
      // // //console.log(paymentMethod)
      const { id } = paymentMethod;

      try {
        // eslint-disable-next-line no-shadow
        const { data } = await axios.post('http://localhost:3001/api/checkout', {
          id,
          amount: 1000,
        });

        // //console.log(data);

        // eslint-disable-next-line no-shadow
      } catch (error) {
        // //console.log(error);
      }
      // setLoading(false);

      elements.getElement(CardElement).clear();
    }
  };

  return (
    <form onSubmit={handleSubmit} className='card card-body'>
      {/* <img src="https://http2.mlstatic.com/D_NQ_NP_721030-MLA49653195444_042022-O.webp" 
      alt="k68 keyboard"
      className='img-fluid'/> */}

      {/* <h3 className='text-center my-2'>Price: 1000$</h3> */}

      <div className='form-group' styles='width: 100px;'>
        <CardElement className='form-control' />
      </div>

      <button type='submit' className='btn btn-success' disabled={!stripe}>
        Buy
      </button>
    </form>
  );
}

export function FormCardPayStep({ currentStep, setCurrentStep }) {
  // const stripePromise = loadStripe('pk_test_51LxuPAL8LzLismpRJ8x17MLBqh02YNICHMvzD91jEXEXkFQAPtDy3zE0BVM9xuRvlItl9ZWX2WH3fk5PTdzJ8TNL00n3Y1WfyW');

  const [state] = useContext(AppContext);

  // const [currentStepObject] = state.sideItemOptions.filter(options => options.status === 'current');

  // const formik = useFormik({
  //   initialValues: {
  //     numeroTarjeta: ''
  //   },
  //   validationSchema: Yup.object({
  //     numeroTarjeta: Yup.number().typeError('Numero de tarjeta debe ser un numero').positive('No se permite valores negativos').min(16, 'Ingrese un numero valido').required('Campo requerido'),
  //   }),
  //   onSubmit: (values) => {
  //     // //console.log(values);
  //     state.sideItemOptions[3].value = JSON.stringify({ ...values })
  //     state.userFlow[3].value = JSON.stringify({ ...values })
  //     delegateManager(currentStepObject, values, state)
  //   },
  //   onChange: (values) => {
  //     delegateManager(currentStepObject, values, state)
  //     // //console.log({ state, formik })
  //   }
  // });

  return (
    <Form
      autoComplete='off'
      style={{ width: '80%', margin: '0 auto' }}
      className='grid-client_form'
    // onSubmit={formik.handleSubmit}
    >
      {/* <Elements stripe={stripePromise}>
            <div className='container p-6'>
              <div className="row">
                <div className="col-md-12
                offset-md-12">
                
                  <CheckoutForm />

                </div>
              </div>
            </div>
          </Elements>  */}
      {/* 
          {state.cardForm.map((input) => (
            <FB.Field key={input.idElement} style={{ marginBottom: '0.7rem' }}>
              <FB.Label>{input.label}</FB.Label>
              <FB.Control>
                <FB.Input
                  placeholder={input.placeholder}
                  className={formik.errors[input.idElement] && 'is-danger'}
                  type='text'
                  value={formik.values[input.idElement]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name={input.idElement}
                  id={input.idElement}
                />
                
              </FB.Control>
            </FB.Field>
          ))}  */}

      <StepControl
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        state={state}
        sideItemOptions={sideItemOptions}
        validStep='true'
      // validStep={formik.isValid}
      />
    </Form>
  );
}
