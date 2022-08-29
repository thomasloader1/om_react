/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useContext } from 'react';
import { AppContext } from '../Provider/StateProvider';
import RadioButton from '../RadioButton';

export function SelectCountryStep({ countryOptions }) {
  return (
    <div id="pais-grid" className="gridCuartos">
      {countryOptions.map(({ ...props }) => (
        <RadioButton {...props} name="country" key={props.idElement} />
      ))}
    </div>
  );
}

export function SelectPaymentMethodStep({ paymentOptions, userFlow }) {
  // const [state] = useContext(AppContext);
  const isoCountry = userFlow.stepOne.isoRef;
  /* const somePaymentsInCountry = (payment) =>
    payment.allowedCountries.some((country) => country === isoCountry); */
  paymentOptions.map((payment) =>
    console.log(payment.allowedCountries.includes(isoCountry), isoCountry)
  );

  return (
    <div id="metPago_grid" className="gridCuartos">
      {paymentOptions.forEach(({ ...props }) => {
        props.allowedCountries.includes(isoCountry) && (
          <RadioButton
            {...props}
            showText={false}
            key={props.shortName}
            typeBtn="payment_method"
          />
        );
      })}
    </div>
  );
}

export function SelectPaymentModeStep() {
  const [state] = useContext(AppContext);

  return (
    <div id="medModPago_grid" className="gridCuartos">
      {state.paymentMethodOptions.map(({ ...props }) => (
        <RadioButton {...props} key={props.idElement} />
      ))}
      <div className="is-divider doble" />
      {state.paymentModeOptions.map(({ ...props }) => (
        <RadioButton {...props} key={props.idElement} />
      ))}
    </div>
  );
}
