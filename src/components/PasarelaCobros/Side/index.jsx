/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useState } from 'react';
import './Side.scss';
import Button from '../Button';
import SideItem from '../SideItem';
import { motion } from 'framer-motion';
import { useFormikContext } from 'formik';
import axios from 'axios';
/* import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'; */
import { getAllISOCodes } from 'iso-country-currency';
import { AppContext } from '../Provider/StateProvider';
import { useEffect } from 'react';
import { fireAlert, fireToast } from '../Hooks/useSwal';
import { MdContentCopy, MdCheckCircleOutline } from 'react-icons/md';
import { BsCashCoin } from 'react-icons/bs';
import { useMediaQSmall } from '../Hooks/useMediaQuery';
import { removeAccents } from '../../../utils/removeAccents';
import BlockLayer from '../../BlockLayer';

const {
  REACT_APP_OCEANO_URL,
  REACT_APP_OCEANO_STRIPESUBSCRIPTION,
  REACT_APP_OCEANO_STRIPESUBSCRIPTION_LOCAL,
  REACT_APP_OCEANO_UPDATECONTRACT,
  REACT_APP_OCEANO_UPDATECONTRACT_LOCAL,
  REACT_APP_OCEANO_GENERATECHECKOUTPRO,
  REACT_APP_OCEANO_GENERATECHECKOUTPRO_TEST,
  REACT_APP_BITLY_ACCESS_TOKEN,
  NODE_ENV,
} = process.env;

const itsProduction = NODE_ENV === 'production';

const URLS = {
  MP: itsProduction
    ? `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_GENERATECHECKOUTPRO}`
    : `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_GENERATECHECKOUTPRO_TEST}`,
  STRIPE: itsProduction
    ? `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_STRIPESUBSCRIPTION}`
    : REACT_APP_OCEANO_STRIPESUBSCRIPTION_LOCAL,
  UPDATE_CONTRACT: itsProduction
    ? `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_UPDATECONTRACT}`
    : REACT_APP_OCEANO_UPDATECONTRACT_LOCAL,
};

function Side({ options, sideTitle, stepStateNumber, formikInstance }) {
  const isMobile = useMediaQSmall();
  const [fetching, setFetching] = useState(false);
  /*   const stripe = useStripe();
    const elements = useElements(); */
  //  const [openBlockLayer, setOpenBlockLayer] = useState(false);

  const {
    formikValues,
    stripeRequest,
    userInfo,
    openBlockLayer,
    setOptions,
    options: optionsGlobal
  } = useContext(AppContext);

  const formik = useFormikContext();
  /*   const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentError, setPaymentError] = useState(''); */
  const { cardHolder, email } = formik.values;
  const { country } = formikValues;

  const generateButton = userInfo.stepTwo.value.includes('Stripe')
    ? formik.isValid && cardHolder
    : formik.isValid && cardHolder;

  useEffect(() => {
    if (generateButton) {
      optionsGlobal.sideItemOptions[4].status = 'completed';
      optionsGlobal.sideItemOptions[4].value = 'Completos';
      setOptions({ ...optionsGlobal });
    } else if (formik.isValid && email) {
      optionsGlobal.sideItemOptions[4].status = 'current';
      optionsGlobal.sideItemOptions[4].value = 'Sin Completar';
      setOptions({ ...optionsGlobal });
    }
    return () => null;
  }, [generateButton]);


  return (
    <div className={`is-4 column side pl-6`}>
      <h2 className='title is-4'>{sideTitle}</h2>
      <div className='side-body'>

        {
          options.map(({ step, label, status, value }) => (
            <SideItem
              key={step}
              currentStep={step}
              label={label}
              status={status}
              valueSelected={value}
              stepStateNumber={stepStateNumber}
              formikInstance={formikInstance}
              disableEdit={!!stripeRequest}
            />
          ))
        }

      </div>
      <motion.div id='background-side'></motion.div>
      {openBlockLayer && <BlockLayer />}
    </div>
  );
}

Side.defaultProps = {
  sideTitle: 'Resumen del pago',
};

export default Side;
