/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/prefer-default-export */
import React, { useContext } from 'react'
import { AppContext } from '../Provider/StateProvider'
import RadioButton from '../RadioButton';

export function SelectCountryStep() {
    const [state] = useContext(AppContext);
 
    return (
    <div id="pais-grid" className="gridCuartos">
      {state.countryOptions.map(({ ...props }) => (
        <RadioButton {...props} name="country" key={props.idElement} />
      ))}
    </div>
  )
}

export function SelectPaymentMethodStep() {
  const [state] = useContext(AppContext);
  const isoCountry = state.userFlow.stepOne.isoRef
  const somePaymentsInCountry = (payment) => payment.allowedCountries.some(country => country === isoCountry)
  const filterPayments = state.paymentOptions.filter((payment) => somePaymentsInCountry(payment))
  
  return (
    <div id="metPago_grid" className="gridCuartos">
      {filterPayments.map(({ ...props }) => (
        <RadioButton {...props} showText={false} key={props.shortName} typeBtn="payment_method" />
      ))}
    </div>
  )
}