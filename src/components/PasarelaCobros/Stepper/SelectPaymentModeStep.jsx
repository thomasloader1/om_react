/* eslint-disable react-hooks/exhaustive-deps */
import { useFormikContext } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
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
  const { setFieldValue } = useFormikContext();
  const [contractId, setContractId] = useState(0)

  useEffect(() => {
    if (!location.pathname.includes('vp')) {
      setFieldValue('contractId', id);
      setContractId(id)
    }
  }, [id]);

  useEffect(() => {
    if (appEnv != null && appEnv?.contract.entity_id_crm) {
      setFieldValue('contractId', appEnv.contract.entity_id_crm);
    }
  }, [appEnv]);

  return (
    <>
      <FormStep stepNumber={3} stepName='Selecciona un modo de pago'>
        <div id='medModPago_grid' className='grid-med_mod_payment-mp'>
          {options.paymentModeOptions.map(({ ...props }) => (
            <ButtonField
              {...props}
              className={`grid-payment_method-item button ${props.value === stepThree.value && 'active'
                }`}
              showText={true}
              id={props.idElement}
              name='mod'
              key={props.idElement}
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
            value={contractId}
            readOnly
          />

          {stepThree.value.includes('Suscripción') && (
            <SelectQuote name='quotes' id='quotes' country={stepOne.value} />
          )}
        </div>
      </FormStep>
    </>
  );
}

export default SelectPaymentModeStep;
