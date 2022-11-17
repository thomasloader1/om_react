/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { Form } from 'react-bulma-components';
import { Radio } from 'semantic-ui-react';
import * as Yup from 'yup';
import { sideItemOptions } from '../../../config/config';
import { delegateManager } from '../Hooks/useStepManager';
import { AppContext } from '../Provider/StateProvider';
import ResumeTicket from '../ResumeTicket';
import StepControl from '../StepControl';

function FormClientDataStep({ currentStep, setCurrentStep }) {
  const [state] = useContext(AppContext);
  const [contract, setContract] = useState({})
  
  console.log(state)

  const clientFormWithoutOptions = state.clientForm.filter(
    (input) => !input.options
  );
  const clientFormRadioField = state.clientForm.filter(
    (input) => input.options && typeof input.options[0] === 'string'
  );
  const [currentStepObject] = state.sideItemOptions.filter(
    (options) => options.status === 'current'
  );

  const formik = useFormik({
    initialValues: {
      numeroContrato: '',
      email: '',
      montoContrato: '',
      cuotas: '',
      montoMensual: '',
      tipoSuscripcion: ''
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
      tipoSuscripcion: Yup.string().required('Campo requerido')
    }),
    onSubmit: (values) => {
      console.log(values);
      state.sideItemOptions[3].value = JSON.stringify({ ...values });
      state.userFlow[3].value = JSON.stringify({ ...values });
      delegateManager(currentStepObject, values, state);
    }
  });

  return (
    <div id='grid-client_data'>
      {/* <pre>{JSON.stringify(contract, null, 2)}</pre> */} 
        {/*  <ResumeTicket data={contract} /> */}  
      {/* <Form
      autoComplete="off"
      style={{ width: '80%', margin: '0 auto' }}
      className="grid-client_form"
      onSubmit={formik.handleSubmit}
    >
      <div className="suscri_type">
        {clientFormRadioField.map((input, i) => (
          <Form.Field key={input.idElement}>
            <label className="label">{input.label}</label>
            {input.options.map((option,i) => (
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
              <p className="help is-danger">{formik.errors[input.idElement]}</p>
            )}
          </Form.Field>
        ))}
      </div>
      
      {clientFormWithoutOptions.map((input) => (
        <Form.Field key={input.idElement} style={{ marginBottom: '0.7rem' }}>
          <Form.Label>{input.label}</Form.Label>
          <Form.Control>
            <Form.Input
              placeholder={input.placeholder}
              className={formik.errors[input.idElement] && 'is-danger'}
              type="text"
              value={formik.values[input.idElement]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name={input.idElement}
              id={input.idElement}
            />
            {formik.errors[input.idElement] && (
              <p className="help is-danger">{formik.errors[input.idElement]}</p>
            )}
          </Form.Control>
        </Form.Field>
      ))}

      
    </Form> */}

      <StepControl
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        state={state}
        sideItemOptions={sideItemOptions}
        validStep={formik.isSubmitting}
      />
    </div>
  );
}

export default FormClientDataStep;
