/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';
import { useRef } from 'react';
import {
  countryOptions,
  sideItemOptions,
  paymentOptions,
  paymentMethodOptions,
  paymentModeOptions,
  clientForm,
  userFlow,
} from '../../../config/config';

function StateProvider({ children }) {
  const [options, setOptions] = useState({
    countryOptions,
    paymentOptions,
    paymentMethodOptions,
    paymentModeOptions,
    clientForm,
    sideItemOptions,
  });

  const [contractData, setContractData] = useState(null)
  const [formikValues, setFormikValues] = useState({});
  const [userInfo, setUserInfo] = useState(userFlow);
  const [stripeRequest, setStripeRequest] = useState(null);
  const [checkoutLink, setCheckoutLink] = useState('');
  const [appEnv, setAppEnv] = useState(null);
  const [stepNumber, setStepNumber] = useState(0);

  const appRef = useRef(null);
  const formRef = useRef(null);

  return (
    <AppContext.Provider
      value={{
        options,
        setOptions,
        formikValues,
        setFormikValues,
        userInfo,
        setUserInfo,
        stripeRequest,
        setStripeRequest,
        checkoutLink,
        setCheckoutLink,
        appRef,
        formRef,
        appEnv,
        setAppEnv,
        stepNumber,
        setStepNumber,
        contractData, setContractData
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default StateProvider;
export const AppContext = createContext();
