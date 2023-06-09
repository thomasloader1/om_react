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
    options: optionsGlobal,
    rebillFetching
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
        {options.map(({ step, label, status, value }) => (
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
        ))}

        {/*  {generateButton && (
          <>
            {userInfo.stepTwo.value.includes('Stripe') ? (
              <Button
                className={`bigger is-medium ${fetching && ' is-loading'}${stripeRequest ? ' payment-generated' : ' generate-payment'
                  }`}
                label={
                  <>
                    {isMobile ? (
                      stripeRequest ? (
                        <MdCheckCircleOutline />
                      ) : (
                        <BsCashCoin />
                      )
                    ) : (
                      <span> {stripeRequest ? 'Pago Realizado' : 'Generar pago'}</span>
                    )}
                  </>
                }
                color={`${checkoutLink ? 'success' : 'primary'}`}
                fullwidth
                onClick={() => //console.log('No hay implementacion')}
                disabled={typeof stripeRequest?.id === 'string'}
              />
            ) : (
              <Button
                className={`bigger is-medium ${fetching && ' is-loading'} ${checkoutLink ? ' payment-generated' : ' generate-payment'
                  }`}
                color={`${checkoutLink ? 'success' : 'primary'}`}
                label={
                  <>
                    {isMobile ? (
                      checkoutLink ? (
                        <MdCheckCircleOutline />
                      ) : (
                        <BsCashCoin />
                      )
                    ) : (
                      <span>{checkoutLink ? 'Link generado' : 'Generar link'}</span>
                    )}
                    {<div className='tooltip'>{checkoutLink ? '' : 'Generar link'}</div>}
                  </>
                }
                fullwidth
                onClick={() => { }}
                disabled={checkoutLink}
              />
            )}
          </>
        )} */}
      </div>
      <motion.div id='background-side'></motion.div>
      {openBlockLayer && /* (
        <>
          <motion.div
            style={{
              width: '3000px',
              height: '100%',
              minHeight: '100vh',
              position: 'absolute',
              top: '0',
              right: '0',
              zIndex: '1',
              backgroundColor: 'white',
            }}
            animate={{ backgroundColor: 'rgba(63, 108, 187, 0.8)' }}
            transition={{ ease: 'easeOut', duration: 0.5 }}
          ></motion.div>

          {!fetching && (
            <motion.div
              className='modal-generated-link'
              animate={{ backgroundColor: '#f4f5f7', boxShadow: '5px 5px 2rem rgba(0,0,0, 0.3)' }}
              transition={{ ease: 'easeOut', duration: 0.5 }}
            >
              {userInfo.stepTwo.value.includes('Stripe') ? (
                <>
                  <motion.h2 className='title is-2 has-text-success my-5'>
                    Pago realizado!
                  </motion.h2>
                  <a
                    href='https://crm.zoho.com/crm/org631172874/tab/SalesOrders'
                    className='button is-success'
                  >
                    Cobrar otro contrato
                  </a>
                </>
              ) : (
                <>
                  <motion.h2 className='title is-4'>¡Link generado!</motion.h2>

                  <div className='is-flex is-flex-direction-column mt-3'>
                    <a
                      href={checkoutLink}
                      disabled={checkoutLink ? false : true}
                      className='button is-link has-text-weight-bold is-fullwidth'
                      target='_blank'
                      rel='noreferrer'
                    >
                      Continuar a la pasarela de MercadoPago
                    </a>
                    <div className='is-flex is-fullwidth'>
                      <button
                        disabled={checkoutLink ? false : true}
                        className='button is-primary has-text-weight-bold'
                        onClick={handleCopyLink}
                      >
                        Copiar Link <MdContentCopy className='ml-2' />
                      </button>
                      <a
                        href='https://crm.zoho.com/crm/org631172874/tab/SalesOrders'
                        className='button is-primary is-outlined has-text-weight-bold'
                      >
                        Generar nuevo pago
                      </a>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </>
      ) */ <BlockLayer />}
    </div>
  );
}

Side.defaultProps = {
  sideTitle: 'Resumen del pago',
};

export default Side;
