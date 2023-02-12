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
  } = useContext(AppContext);
  const formik = useFormikContext();
  const { cardComplete, email } = formik.values;
  const { country, quotes, amount, sale, contact, products } = formikValues;

  //console.log({ formik });

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
      fireToast('Eror al generar el PaymentMethod de Stripe');
      setFetching(false);
      return null;
    }

    handleRequestToGatewayAndCRM(paymentMethod.id);
  };

  const handleRequestToGatewayAndCRM = (paymentMethodId) => {
    const { STRIPE, UPDATE_CONTRACT } = URLS;
    const allIsoCodes = getAllISOCodes();
    const filterIso = allIsoCodes.filter((iso) => iso.countryName === country);
    const countryObject = filterIso[0];
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
    formRef.current.style.position = 'relative';
    formRef.current.style.zIndex = '-9999';

    const body = new FormData();
    const type = formikValues.mod.toLowerCase().substring(0, 4);
    const requestConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const months = formikValues.quotes && formikValues.quotes > 0 ? formikValues.quotes : 0;
    const allIsoCodes = getAllISOCodes();
    const clearedCountry = removeAccents(country);
    const filterIso = allIsoCodes.filter((iso) => iso.countryName === clearedCountry);
    //console.log({ allIsoCodes, country, clearedCountry, filterIso });
    const [countryObject] = filterIso;
    const { iso } = countryObject;

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
    body.append('country', iso);

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
    <div className='is-4 column side pl-6'>
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
                className={`bigger is-primary is-medium ${fetching && 'is-loading'}`}
                label={stripeRequest ? 'Pago Realizado' : 'Generar pago'}
                fullwidth
                onClick={handleSubmitStripe}
                disabled={typeof stripeRequest?.id === 'string'}
              />
            ) : (
              <Button
                className={`bigger is-primary is-medium ${fetching && 'is-loading'}`}
                label={checkoutLink ? 'Link generado' : 'Generar link'}
                fullwidth
                onClick={handleSubmitMercadoPago}
                disabled={checkoutLink}
              />
            )}
          </>
        )}
      </div>
      <motion.div
        style={{
          width: '100%',
          height: '100vh',
          position: 'absolute',
          top: '0',
          right: '-69%',
          zIndex: '-99',
          backgroundColor: '#F4F5F7',
          //backgroundColor:"red",
        }}
      ></motion.div>
      {openBlockLayer && (
        <>
          <motion.div
            style={{
              width: '3000px',
              height: '100vh',
              position: 'absolute',
              top: '0',
              right: '0',
              zIndex: '-100',
              backgroundColor: 'white',
            }}
            animate={{ backgroundColor: 'rgba(63, 108, 187, 0.8)' }}
            transition={{ ease: 'easeOut', duration: 0.5 }}
          ></motion.div>

          {!fetching && (
            <motion.div
              style={{
                width: '500px',
                height: '300px',
                position: 'absolute',
                top: '0',
                left: '0',
                bottom: '0',
                zIndex: '-98',
                backgroundColor: 'white',
                margin: 'auto 0px',
                borderRadius: '4rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
              animate={{ backgroundColor: '#32bea6', boxShadow: '5px 5px 2rem rgba(0,0,0, 0.3)' }}
              transition={{ ease: 'easeOut', duration: 0.5 }}
            >
              {userInfo.stepTwo.value.includes('Stripe') ? (
                <>
                  <motion.h2 className='title is-2 has-text-white'>Pago realizado!</motion.h2>
                  <a
                    href='https://crm.zoho.com/crm/org631172874/tab/SalesOrders'
                    className='button is-primary'
                  >
                    Cobrar otro contrato
                  </a>
                </>
              ) : (
                <>
                  <motion.h2 className='title is-2 has-text-white'>Link generado!</motion.h2>
                  <a
                    href={checkoutLink}
                    disabled={checkoutLink ? false : true}
                    className='button is-link is-rounded '
                    target='_blank'
                    rel='noreferrer'
                  >
                    Continuar en la pasarela de MercadoPago
                  </a>
                  <button
                    disabled={checkoutLink ? false : true}
                    className='button is-primary is-rounded mt-3'
                    onClick={handleCopyLink}
                  >
                    Copiar Link
                  </button>
                  <a
                    href='https://crm.zoho.com/crm/org631172874/tab/SalesOrders'
                    className='button is-primary mt-3'
                  >
                    Cobrar otro contrato
                  </a>
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
