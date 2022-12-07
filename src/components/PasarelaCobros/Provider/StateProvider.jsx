/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';
import {
  countryOptions,
  sideItemOptions,
  paymentOptions,
  paymentMethodOptions,
  paymentModeOptions,
  clientForm,
  userFlow
} from '../../../config/config';

function StateProvider({ children }) {
  const [options, setOptions] = useState({
    countryOptions,
    paymentOptions,
    paymentMethodOptions,
    paymentModeOptions,
    clientForm,
    sideItemOptions
  })
  
  const [formikValues, setFormikValues] = useState({})
  const [userInfo, setUserInfo] = useState(userFlow)
  const [stepNumberGlobal, setStepNumberGlobal] = useState(0)
  const [stripeRequest, setStripeRequest] = useState(null)

  return (
    <AppContext.Provider value={{ options, setOptions, 
                                  formikValues, setFormikValues, 
                                  userInfo, setUserInfo,
                                  stepNumberGlobal, setStepNumberGlobal,
                                  stripeRequest, setStripeRequest
                                 }}>
      {children}
    </AppContext.Provider>
  );
}

export default StateProvider;
export const AppContext = createContext();


