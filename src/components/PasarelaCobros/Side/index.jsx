/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useState } from 'react';
import './Side.scss';
import Button from '../Button';
import SideItem from '../SideItem';
import { motion } from 'framer-motion';
import { useFormikContext } from 'formik';
import axios from 'axios';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { getAllISOCodes } from 'iso-country-currency';
import { AppContext } from '../Provider/StateProvider';
import { useEffect } from 'react';
import { fireAlert, fireToast } from '../Hooks/useSwal';
import { MdContentCopy, MdCheckCircleOutline } from 'react-icons/md';
import { BsCashCoin } from 'react-icons/bs';
import { useMediaQSmall } from '../Hooks/useMediaQuery';

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
  const stripe = useStripe();
  const elements = useElements();
  const [openBlockLayer, setOpenBlockLayer] = useState(false);

  const {
    formikValues,
    stripeRequest,
    setStripeRequest,
    userInfo,
    formRef,
    checkoutLink,
    setCheckoutLink,
    setOptions,
    options: optionsGlobal,
    appEnv,
  } = useContext(AppContext);
  const formik = useFormikContext();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const { cardComplete, email } = formik.values;
  const { country, quotes, amount, sale, contact, products } = formikValues;

  const removeAccents = (country) => {
    const accents = {
      á: 'a',
      é: 'e',
      í: 'i',
      ó: 'o',
      ú: 'u',
      Á: 'A',
      É: 'E',
      Í: 'I',
      Ó: 'O',
      Ú: 'U',
    };
    const regex = new RegExp(`[${Object.keys(accents).join('')}]`, 'g');
    return country.replace(regex, (match) => accents[match]);
  };

  const generateButton = userInfo.stepTwo.value.includes('Stripe')
    ? formik.isValid && cardComplete
    : formik.isValid && email;

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

  const handleSubmitStripe = async (event) => {
    setFetching(true);
    setOpenBlockLayer(true);

    formRef.current.style.filter = 'blur(5px)';
    formRef.current.style.position = 'relative';
    formRef.current.style.zIndex = '-9999';

    event.preventDefault();
    event.stopPropagation();

    if (elements == null) {
      return;
    }


    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });


    console.log({ error, paymentMethod });


    if (error) {
      setPaymentError(error.message);
    } else {
      setPaymentMethod(paymentMethod.id);
    }


    if (error?.message) {
      fireToast(error.message);
      setFetching(false);
      return null;
    } else {
      handleRequestToGatewayAndCRM(paymentMethod.id);
    }

  };

  const handleRequestToGatewayAndCRM = (paymentMethodId) => {
    const { STRIPE, UPDATE_CONTRACT } = URLS;
    const allIsoCodes = getAllISOCodes();
    const thisCountry = country ? country : appEnv?.country
    const clearedCountry = removeAccents(thisCountry);

    const filterIso = allIsoCodes.filter((iso) => iso.countryName === clearedCountry);
    const countryObject = filterIso[0];
    console.log({ filterIso, countryObject })
    const { currency, iso } = countryObject;

    const postStripe = {
      currency,
      country: iso,
      installments: quotes ? quotes : 1,
      email,
      paymentMethodId: paymentMethodId,
      amount,
      contact,
      sale,
      products,
      contractId: formikValues.contractId,
      address: formik.values.address,
      dni: formik.values.dni,
      phone: formik.values.phone,
      fullname: formik.values.fullName,
      is_suscri: !userInfo.stepThree.value.includes('Tradicional'),
    };

    axios
      .post(STRIPE, postStripe)
      .then((res) => {
        console.log({ res });
        setStripeRequest(res.data);
        fireToast('Pago en Stripe correcto!', 'success', 5000);

        const postUpdateZohoStripe = {
          installments: quotes ? quotes : 1,
          email,
          amount,
          contractId: formikValues.contractId,
          subscriptionId: res.data.id,
          installment_amount: amount / (quotes ? quotes : 1),
          address: formik.values.address,
          dni: formik.values.dni,
          phone: formik.values.phone,
          fullname: formik.values.fullName,
          is_suscri: !userInfo.stepThree.value.includes('Tradicional'),
        };

        axios
          .post(UPDATE_CONTRACT, postUpdateZohoStripe)
          .then((res) => {
            console.log({ res });
            fireToast('Contrato actualizado', 'success', 5000);
          })
          .catch((err) => {
            console.log({ err });
            fireToast('Contrato no actualizado', 'error', 5000);
          })
          .finally((res) => {
            console.log({ res });
          });
      })
      .catch((err) => {
        formRef.current.style.filter = 'blur(0px)';
        formRef.current.style.position = 'relative';
        formRef.current.style.zIndex = '0';
        setOpenBlockLayer(false);

        console.error({ err });
        fireAlert(`${err.response.data}`, 'error');
      })
      .finally(() => {
        setFetching(false);
      });
  };

  const handleCopyLink = () => {
    fetch('https://api-ssl.bitly.com/v4/shorten', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${REACT_APP_BITLY_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        long_url: checkoutLink,
        domain: 'bit.ly',
        group_guid: 'Bm82hIzUJIK',
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log({ data }))
      .catch((err) => console.log({ err }));

    navigator.clipboard.writeText(checkoutLink);
    fireToast('¡Link copiado en portapapeles!', 'success');
  };

  const handleSubmitMercadoPago = () => {
    setFetching(true);
    setOpenBlockLayer(true);

    formRef.current.style.filter = 'blur(5px)';
    /* formRef.current.style.position = 'relative';
    formRef.current.style.zIndex = '-1'; */

    const body = new FormData();
    const type = formikValues.mod.toLowerCase().substring(0, 4);
    const requestConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const months = formikValues.quotes && formikValues.quotes > 0 ? formikValues.quotes : 0;
    const allIsoCodes = getAllISOCodes();
    const thisCountry = country ? country : appEnv?.country;
    const clearedCountry = removeAccents(thisCountry);
    const filterIso = allIsoCodes.filter((iso) => iso.countryName === clearedCountry);
    //console.log({ allIsoCodes, country, clearedCountry, filterIso });
    const [countryObject] = filterIso;
    const { iso } = countryObject;

    const condicionalCountry = iso === 'MX' ? 'mx_msk' : iso

    body.append('months', months);
    body.append('amount', `${formikValues.amount}`);
    body.append('type', type);
    body.append('so', formikValues.sale.SO_Number);
    body.append('address', formik.values.address);
    body.append('dni', formik.values.dni);
    body.append('phone', formik.values.phone);
    body.append('fullname', formik.values.fullName);
    body.append('sale_id', formikValues.contractId);
    body.append('mail', email);
    body.append('country', condicionalCountry);

    const { MP } = URLS;

    axios
      .post(MP, body, requestConfig)
      .then((res) => {
        if (res.data.status === 0) {
          formRef.current.style.filter = 'blur(0px)';
          formRef.current.style.position = 'relative';
          formRef.current.style.zIndex = '0';
          setOpenBlockLayer(false);
          fireAlert(res.data.error);
          return;
        }

        setCheckoutLink(res.data.url);
      })
      .catch((err) => {
        formRef.current.style.filter = 'blur(0px)';
        formRef.current.style.position = 'relative';
        formRef.current.style.zIndex = '0';
        setOpenBlockLayer(false);
        fireAlert('ERROR');
        console.error({ error: err.response.data });
      })
      .finally(() => {
        setFetching(false);
      });
  };

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

        {generateButton && (
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
                onClick={handleSubmitStripe}
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
                    {/*<div className='tooltip'>{checkoutLink ? '' : 'Generar link'}</div>*/}
                  </>
                }
                fullwidth
                onClick={handleSubmitMercadoPago}
                disabled={checkoutLink}
              />
            )}
          </>
        )}
      </div>
      <motion.div id='background-side'></motion.div>
      {openBlockLayer && (
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
      )}
    </div>
  );
}

Side.defaultProps = {
  sideTitle: 'Resumen del pago',
};

export default Side;
