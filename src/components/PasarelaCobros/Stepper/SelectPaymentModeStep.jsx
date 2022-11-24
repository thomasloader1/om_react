/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { Block, Button, Notification } from 'react-bulma-components';
import * as Yup from 'yup';
import InputField from '../InputField';
import { AppContext } from '../Provider/StateProvider';
import RadioButton from '../RadioButton';
import ButtonField from '../RadioButton/ButtonField';
import SelectQuote from '../SelectQuote';
import StepControl from '../StepControl';
import { FormStep } from './MultiStep';

function SelectPaymentModeStep({ currentStep, setCurrentStep }) {
  const { options, setOptions, userInfo, setUserInfo } = useContext(AppContext);

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
    }
  });

  if (userInfo.stepTwo.value === 'Mercado Pago') {

    return (
      /*{formikSpecial.values.mod === "Suscripción" ?
           <SelectQuote selectName={'Seleccione la cantidad de coutas'} options={[1,3,6,9,12,18]}/>
           : null}
 
         {formikSpecial.errors.mod && (
           <p className="help is-danger">{formikSpecial.errors.mod}</p>
         )}
 
         {
           formikSpecial.values.mod && (
             <Block className='field_info'>
               <Notification color="info">
                 <strong> {formikSpecial.values.mod} </strong>
 
                 {formikSpecial.values.mod === "Tradicional" ? " le permite hacer la operacion habitual de compra" : null}
                 {formikSpecial.values.mod === "Suscripción" ? " le permite hacer la operacion con las cuotas sin interes!" : null}
 
               </Notification>
             </Block>
           )
         }*/
      <FormStep
        stepNumber={3}
        stepName='Seleccione un modo de pago'
      >
        <div id="medModPago_grid" className="grid-med_mod_payment-mp">

          <InputField label="Ingrese ID de Contrato" id="contractId" name="contractId" />

          {options.paymentModeOptions.map(({ ...props }) =>
            <ButtonField
              {...props}
              className={`grid-payment_method-item button`}
              showText={true}
              id={props.idElement}
              name="mod"
              key={props.idElement}
              onClick={() => {
                // console.log(userInfo)
                const { sideItemOptions } = options
                const { stepThree } = userInfo

                sideItemOptions[2].value = props.value
                stepThree.value = props.value

                setOptions({
                  ...options,
                  sideItemOptions: [
                    ...sideItemOptions
                  ]
                })

                setUserInfo({
                  ...userInfo
                })
              }}
            />
          )}
        </div>
      </FormStep>
    );
  }
  {/* <form
      id="medModPago_grid"
      autoComplete="off"
      className="grid-med_mod_payment"
      onSubmit={formik.handleSubmit}
    >
      {options.paymentMethodOptions.map(({ ...props }) => {
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

      {options.paymentModeOptions.map(({ ...props }) => (
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
        validStep={formik.isSubmitting}
        currentFormikValues={formik.values}
      />
    </form> */}
  return (

    <FormStep
      stepNumber={3}
      stepName='Seleccione un modo de pago'
    >
      <div id="medModPago_grid" className="grid-med_mod_payment">

        <InputField label="Ingrese ID de Contrato" id="contractId" name="contractId" />

        {options.paymentModeOptions.map(({ ...props }) =>
          <ButtonField
            {...props}
            className={`grid-payment_method-item button`}
            showText={true}
            id={props.idElement}
            name="mod"
            key={props.idElement}
            onClick={() => {
              // console.log(userInfo)
              const { sideItemOptions } = options
              const { stepThree } = userInfo

              sideItemOptions[2].value = props.value
              stepThree.value = props.value

              setOptions({
                ...options,
                sideItemOptions: [
                  ...sideItemOptions
                ]
              })

              setUserInfo({
                ...userInfo
              })
            }}
          />
        )}
      </div>
    </FormStep>
  );
}

export default SelectPaymentModeStep;
