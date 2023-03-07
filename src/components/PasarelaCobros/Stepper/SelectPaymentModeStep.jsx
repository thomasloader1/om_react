import { useFormikContext } from 'formik';
import React, { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import InputField from '../InputField';
import { AppContext } from '../Provider/StateProvider';
import ButtonField from '../RadioButton/ButtonField';
import SelectQuote from '../SelectQuote';
import { FormStep } from './MultiStep';

function SelectPaymentModeStep() {
  const { options, setOptions, userInfo, setUserInfo, appEnv } = useContext(AppContext);
  const { stepOne, stepThree } = userInfo;
  const { id } = useParams();
  const location = useLocation();
  const formik = useFormikContext();
  const contractIdValue = formik.values.contractId;

  useEffect(() => {
    if (!location.pathname.includes('vp')) {
      formik.setFieldValue('contractId', id);
    }
  }, [id]);

  useEffect(() => {
    if (appEnv != null && appEnv?.contract.entity_id_crm) {
      formik.setFieldValue('contractId', appEnv.contract.entity_id_crm);
    }
  }, [appEnv]);

  return (
    <>
      <FormStep stepNumber={3} stepName='Selecciona un modo de pago'>
        <div id='medModPago_grid' className='grid-med_mod_payment-mp'>
          {options.paymentModeOptions.map(({ ...props }) => (
            <ButtonField
              {...props}
              className={`grid-payment_method-item button ${
                props.value === stepThree.value && 'active'
              }`}
              showText={true}
              id={props.idElement}
              name='mod'
              key={props.idElement}
              /* disabled={props.value !== "Tradicional"} */
              onClick={() => {
                const { sideItemOptions } = options;
                const { stepThree } = userInfo;

                sideItemOptions[2].value = props.value;
                stepThree.value = props.value;

                setOptions({
                  ...options,
                  sideItemOptions: [...sideItemOptions],
                });

                setUserInfo({
                  ...userInfo,
                });
              }}
            />
          ))}

          <InputField
            label='Ingrese ID de Contrato'
            type='text'
            placeholder='2000339000004553081'
            id='contractId'
            name='contractId'
            value={contractIdValue}
            readOnly
          />

          {stepThree.value !== 'Tradicional' && stepThree.value !== '' && (
            <SelectQuote name='quotes' id='quotes' country={stepOne.value} />
          )}
        </div>
      </FormStep>
    </>
  );
}

export default SelectPaymentModeStep;
