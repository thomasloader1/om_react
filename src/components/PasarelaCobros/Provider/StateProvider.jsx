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
  const [state, setState] = useState({
    countryOptions,
    paymentOptions,
    paymentMethodOptions,
    paymentModeOptions,
    clientForm,
    sideItemOptions,
    userFlow
  });

  return (
    <AppContext.Provider value={[state, setState]}>
      {children}
    </AppContext.Provider>
  );
}

export default StateProvider;
export const AppContext = createContext();
