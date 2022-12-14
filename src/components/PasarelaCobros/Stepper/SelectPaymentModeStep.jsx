import React, { useContext } from 'react';
import InputField from '../InputField';
import { AppContext } from '../Provider/StateProvider';
import ButtonField from '../RadioButton/ButtonField';
import SelectQuote from '../SelectQuote';
import { FormStep } from './MultiStep';

function SelectPaymentModeStep() {
  const { options, setOptions, userInfo, setUserInfo } = useContext(AppContext);
  const { stepOne, stepTwo, stepThree } = userInfo


  if (stepTwo.value === 'Mercado Pago') {

    return (
      <FormStep
        stepNumber={3}
        stepName='Seleccione un modo de pago'
      >
        <div id="medModPago_grid" className="grid-med_mod_payment-mp">


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

          <InputField label="Ingrese ID de Contrato" id="contractId" name="contractId" />


          {stepThree.value !== 'Tradicional' && stepThree.value !== '' &&
          <SelectQuote name='quotes' id='quotes' country={stepOne.value}  />
        }

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

        <InputField label="Ingrese ID de Contrato" id="contractId" name="contractId" />

        {stepThree.value !== 'Tradicional' && stepThree.value !== '' &&
          <SelectQuote name='quotes' id='quotes' country={stepOne.value} />
        }

      </div>
    </FormStep>
  );
}

export default SelectPaymentModeStep;