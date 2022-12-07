import React, { useContext } from 'react';
import InputField from '../InputField';
import { AppContext } from '../Provider/StateProvider';
import ButtonField from '../RadioButton/ButtonField';
import { FormStep } from './MultiStep';

function SelectPaymentModeStep() {
  const { options, setOptions, userInfo, setUserInfo } = useContext(AppContext);
  const { stepTwo, stepThree } = userInfo

  console.log({userInfo})

  if (stepTwo.value === 'Mercado Pago') {

    return (
      <FormStep
        stepNumber={3}
        stepName='Seleccione un modo de pago'
      >
        <div id="medModPago_grid" className="grid-med_mod_payment-mp">

          <InputField label="Ingrese ID de Contrato" id="contractId" name="contractId" />

          {options.paymentModeOptions.map(({ ...props }) =>
            <ButtonField
              {...props}
              className={`grid-payment_method-item button ${props.value === stepThree.value && 'active'}`}
              showText={true}
              id={props.idElement}
              name="mod"
              key={props.idElement}
              /* disabled={props.value !== "Tradicional"} */
              onClick={() => {
                const { sideItemOptions } = options

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



  return (
    <FormStep
        stepNumber={3}
        stepName='Seleccione un modo de pago'
      >
        <div id="medModPago_grid" className="grid-med_mod_payment-mp">

          <InputField label="Ingrese ID de Contrato" id="contractId" name="contractId" />

          {options.paymentModeOptions.map(({ ...props }) =>
            <ButtonField
              {...props}
              className={`grid-payment_method-item button ${props.value === stepThree.value && 'active'}`}
              showText={true}
              id={props.idElement}
              name="mod"
              key={props.idElement}
              /* disabled={props.value !== "Tradicional"} */
              onClick={() => {
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
 {/* <FormStep
      stepNumber={3}
      stepName='Seleccione un modo de pago'
    >
      <div id="medModPago_grid" className="grid-med_mod_payment">

       
       

        {options.paymentMethodOptions.map(({ ...props }) =>
          <ButtonField
            {...props}
            className={`grid-payment_method-item button`}
            showText={true}
            id={props.idElement}
            name="med"
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

        <div className="is-divider doble" />

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
    </FormStep> */}