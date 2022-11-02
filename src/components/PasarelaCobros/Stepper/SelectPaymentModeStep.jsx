/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import * as Yup from 'yup';
import { sideItemOptions } from '../../../config/config';
import { delegateManager } from '../Hooks/useStepManager';
import { getContractCRM } from '../Hooks/useZohoContract';
import { AppContext } from '../Provider/StateProvider';
import RadioButton from '../RadioButton';
import StepControl from '../StepControl';

function SelectPaymentModeStep({currentStep, setCurrentStep}) {
  const [state] = useContext(AppContext);
  
  const initialValuesNormal = { med: '', mod: '' };
  const validationSchemaNormal = {
    med: Yup.string().min(1).required('Seleccione un metodo'),
    mod: Yup.string().min(1).required('Seleccione un metodo')
  };

  const formik = useFormik({
    initialValues: initialValuesNormal,
    validationSchema: Yup.object(validationSchemaNormal),
    onSubmit: (values) => {
      // console.log('formik values', { values });
      /*  const [currentStepObject] = state.sideItemOptions.filter( options => options.status === 'current');
         delegateManager(currentStepObject,values) */
    },
    onChange: (values) => {
      // console.log('Change', { values });
      /* const [currentStepObject] = state.sideItemOptions.filter( options => options.status === 'current');
        delegateManager(currentStepObject,values) */
    }
  });

  // ------------------------------------------------------------------------------------

  const initialValuesSpecial = { numberSO: '' };
  const validationSchemaSpecial = {
    numberSO: Yup.string().min(1).required('Ingrese un numero de SO')
  };

  const formikSpecial = useFormik({
    initialValues: initialValuesSpecial,
    validationSchema: Yup.object(validationSchemaSpecial),
    onSubmit: (values) => {
      console.log('formikSpecial values', { values });
      const contract = getContractCRM();
      const [currentStepObject] = state.sideItemOptions.filter(
        (options) => options.status === 'current'
      );

      delegateManager(currentStepObject, contract, state)
    }
  });

  if (state.userFlow.stepTwo.value === 'Mercado Pago') {
    // console.log('formikSpecial', { formikSpecialValues: formikSpecial.values });

    return (
      <form
        id="medModPago_grid"
        autoComplete="off"
        className="grid-med_mod_payment-mp"
        onSubmit={formikSpecial.handleSubmit}
      >
        <div className="field">
          <label htmlFor="numberSO" className="label">
            Ingrese SO de Contrato
          </label>
          <div className="control">
            <input
              placeholder="2000339000004553081"
              className={
                formikSpecial.errors.numberSO ? 'input is-danger' : 'input'
              }
              type="number"
              value={formikSpecial.values.numberSO}
              onChange={formikSpecial.handleChange}
              onBlur={formikSpecial.handleBlur}
              name="numberSO"
              id="numberSO"
            />
          </div>
          {formikSpecial.errors.numberSO && (
            <p className="help is-danger">{formikSpecial.errors.numberSO}</p>
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
      id="medModPago_grid"
      autoComplete="off"
      className="grid-med_mod_payment"
      onSubmit={formik.handleSubmit}
    >
      {state.paymentMethodOptions.map(({ ...props }) => {
        console.log({ isValidForm: formik.isValid });
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

      <div className="is-divider doble" />

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

export default SelectPaymentModeStep;
