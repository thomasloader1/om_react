import React, { useContext } from 'react';
import { AppContext } from '../Provider/StateProvider';
import ButtonField from '../RadioButton/ButtonField';
import { FormStep } from './MultiStep';

function SelectPaymentMethodStep() {
  const { options, setOptions, userInfo, setUserInfo } = useContext(AppContext);
  const { paymentOptions } = options;
  const { stepTwo } = userInfo;
  const { isoRef } = userInfo.stepOne;

  const getIsoCountry = () => {
    const filterString = isoRef.split('_').filter((ref) => ref !== 'pais' && ref !== 'input');
    return filterString[0];
  };

  const isoCountry = getIsoCountry();

  return (
    <FormStep stepNumber={2} stepName='Selecciona un método de pago'>
      <div id='metPago_grid' className='grid-payment_method'>
        {paymentOptions.map(
          ({ allowedCountries, disabledCountries, ...props }) =>
            allowedCountries.includes(isoCountry) && (
              <ButtonField
                {...props}
                className={`grid-payment_method-item tall button ${
                  props.value === stepTwo.value && 'active'
                }`}
                showText={false}
                id={props.shortName}
                name='payment_method'
                key={props.shortName}
                disabled={disabledCountries.includes(isoCountry)}
                onClick={() => {
                  const { sideItemOptions } = options;
                  const { stepTwo } = userInfo;

                  sideItemOptions[1].value = props.value;
                  stepTwo.value = props.value;

                  setOptions({
                    ...options,
                    sideItemOptions: [...sideItemOptions],
                  });

                  setUserInfo({
                    ...userInfo,
                  });

                  if (props.shortName === 'wp') {
                    window.location = 'https://www.webpay.cl/';
                  }
                }}
              />
            ),
        )}
      </div>
    </FormStep>
  );
}

export default SelectPaymentMethodStep;
