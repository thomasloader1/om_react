/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';
import { useRef } from 'react';
import {
  countryOptions,
  sideItemOptions,
  sideItemOptionsVP,
  paymentOptions,
  paymentMethodOptions,
  paymentModeOptions,
  userFlow,
} from '../../../config/config';
import { useApi } from '../../VentaPresencial/Hook/useApi';

const { NODE_ENV, REACT_APP_API } = process.env;
const isProduction = NODE_ENV === 'production';

const apiProfession = isProduction
  ? `${REACT_APP_API}/api/professions`
  : '/api/professions';
const apiSpecialities = isProduction
  ? `${REACT_APP_API}/api/specialities`
  : '/api/specialities';
const apiMethods = isProduction
  ? `${REACT_APP_API}/api/methods`
  : '/api/methods';

function StateProvider({ children }) {
  const { fetching: fetchProfessions, data: professions } =
    useApi(apiProfession);
  const { fetching: fetchSpecialties, data: specialties } =
    useApi(apiSpecialities);
  const { fetching: fetchMethods, data: methods } = useApi(apiMethods);
  const [products, setProducts] = useState([]);

  const [options, setOptions] = useState({
    countryOptions,
    paymentOptions,
    paymentMethodOptions,
    paymentModeOptions,
    sideItemOptionsVP,
    sideItemOptions,
  });

  const [formikValues, setFormikValues] = useState(null);
  const [userInfo, setUserInfo] = useState(userFlow);
  const [stepNumberGlobal, setStepNumberGlobal] = useState(0);
  const [stripeRequest, setStripeRequest] = useState(null);
  const [checkoutLink, setCheckoutLink] = useState('');
  const [appEnv, setAppEnv] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
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
        stepNumberGlobal,
        setStepNumberGlobal,
        stripeRequest,
        setStripeRequest,
        checkoutLink,
        setCheckoutLink,
        appRef,
        formRef,
        appEnv,
        setAppEnv,
        fetchProfessions,
        professions,
        fetchSpecialties,
        specialties,
        fetchMethods,
        methods,
        products,
        setProducts,
        selectedCourses,
        setSelectedCourses,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default StateProvider;
export const AppContext = createContext();
