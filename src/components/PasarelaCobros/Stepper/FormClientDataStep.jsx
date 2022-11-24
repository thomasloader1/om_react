/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { Form } from 'react-bulma-components';
import { Radio } from 'semantic-ui-react';
import * as Yup from 'yup';
import { AppContext } from '../Provider/StateProvider';
import ResumeTicket from '../ResumeTicket';
import StepControl from '../StepControl';
import { FormStep } from './MultiStep';

function FormClientDataStep({ currentStep, setCurrentStep }) {
  const { options, formikValues, userInfo } = useContext(AppContext);
  const { clientForm } = options


  const clientFormWithoutOptions = clientForm.filter(
    (input) => !input.options
  );

  const clientFormRadioField = clientForm.filter(
    (input) => input.options && typeof input.options[0] === 'string'
  );

  const formikNotMP = useFormik({
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
    }
  });



  if (userInfo.stepTwo.value === "Mercado Pago") {
    return (
      <FormStep
        stepNumber={4}
        stepName='Confirme los datos del cliente'
      >
        <div id="grid-client_data">
          <ResumeTicket contractId={formikValues.contractId} />
        </div>
      </FormStep>)
  } else {
    return (
      <div id='grid-client_data'>
        <Form
          autoComplete="off"
          style={{ width: '80%', margin: '0 auto' }}
          className="grid-client_form"
          onSubmit={formikNotMP.handleSubmit}
        >
          <div className="suscri_type">
            {clientFormRadioField.map((input, i) => (
              <Form.Field key={input.idElement}>
                <label className="label">{input.label}</label>
                {input.options.map((option, i) => (
                  <Radio
                    label={` ${option}`}
                    name={input.idElement}
                    value={option}
                    checked={formikNotMP.values[input.idElement] === option}
                    onChange={formikNotMP.handleChange}
                    key={option.idElement}
                  />
                ))}
                {formikNotMP.errors[input.idElement] && (
                  <p className="help is-danger">{formikNotMP.errors[input.idElement]}</p>
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
                  className={formikNotMP.errors[input.idElement] && 'is-danger'}
                  type="text"
                  value={formikNotMP.values[input.idElement]}
                  onChange={formikNotMP.handleChange}
                  onBlur={formikNotMP.handleBlur}
                  name={input.idElement}
                  id={input.idElement}
                />
                {formikNotMP.errors[input.idElement] && (
                  <p className="help is-danger">{formikNotMP.errors[input.idElement]}</p>
                )}
              </Form.Control>
            </Form.Field>
          ))}


        </Form>

      </div>
    );
  }



}

export default FormClientDataStep;
