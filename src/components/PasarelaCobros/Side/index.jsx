/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useState } from 'react';
import './Side.scss';
import SideItem from '../SideItem';
import { motion } from 'framer-motion';
import { useFormikContext } from 'formik';
/* import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'; */
import { AppContext } from '../Provider/StateProvider';
import { useEffect } from 'react';
import { useMediaQSmall } from '../Hooks/useMediaQuery';
import { removeAccents } from '../../../utils/removeAccents';
import BlockLayer from '../../BlockLayer';

const {
  REACT_APP_OCEANO_URL,
  REACT_APP_OCEANO_STRIPESUBSCRIPTION,
  REACT_APP_API_PAYMENTS_PREFIX_PRD,
  REACT_APP_OCEANO_UPDATECONTRACT,
  REACT_APP_OCEANO_GENERATECHECKOUTPRO,
  REACT_APP_OCEANO_GENERATECHECKOUTPRO_TEST,
  NODE_ENV,
} = process.env;

const itsProduction = NODE_ENV === 'production';

const URLS = {
  MP: itsProduction
    ? `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_GENERATECHECKOUTPRO}`
    : `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_GENERATECHECKOUTPRO_TEST}`,
  STRIPE: itsProduction
    ? `${REACT_APP_OCEANO_URL}${REACT_APP_API_PAYMENTS_PREFIX_PRD}${REACT_APP_OCEANO_STRIPESUBSCRIPTION}`
    : REACT_APP_OCEANO_STRIPESUBSCRIPTION,
  UPDATE_CONTRACT: itsProduction
    ? `${REACT_APP_OCEANO_URL}${REACT_APP_API_PAYMENTS_PREFIX_PRD}${REACT_APP_OCEANO_UPDATECONTRACT}`
    : REACT_APP_OCEANO_UPDATECONTRACT,
};

function Side({ options, sideTitle, stepStateNumber, formikInstance }) {
  const isMobile = useMediaQSmall();
  /*   const stripe = useStripe();
    const elements = useElements(); */
  //  const [openBlockLayer, setOpenBlockLayer] = useState(false);
  const [sideOptionsElements, setSideOptionsElements] = useState(null);
  const {
    stripeRequest,
    userInfo,
    openBlockLayer,
    setOptions,
    options: optionsGlobal,
    CTCPayment,
  } = useContext(AppContext);

  const formik = useFormikContext();
  const { cardHolder, email } = formik.values;

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

  useEffect(() => {
    //console.log({ CTCPayment })

    const sideOptionsElementsMapping = options
      .map(({ step, label, status, value }) => {
        if (!CTCPayment && step > 5) {
          return false;
        }

        return (
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
        );
      })
      .filter((item) => item !== false);
    setSideOptionsElements(sideOptionsElementsMapping);

    //return () => console.log('Clear function OptionsGlobal')
  }, [optionsGlobal]);

  return (
    <div className={`is-4 column side pl-6`}>
      <h2 className='title is-4'>{sideTitle}</h2>
      <div className='side-body'>{sideOptionsElements}</div>
      <motion.div id='background-side'></motion.div>
      {openBlockLayer && <BlockLayer />}
    </div>
  );
}

Side.defaultProps = {
  sideTitle: 'Resumen del pago',
};

export default Side;
