/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useState } from 'react';
import './Side.scss';
import Button from '../../PasarelaCobros/Button';
import SideItem from '../SideItem';
import { motion } from 'framer-motion'
import { useFormikContext } from 'formik';
import axios from 'axios';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { getAllISOCodes } from 'iso-country-currency';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import { useEffect } from 'react';


const { REACT_APP_OCEANO_URL, REACT_APP_OCEANO_STRIPESUBSCRIPTION, REACT_APP_OCEANO_STRIPESUBSCRIPTION_LOCAL, REACT_APP_OCEANO_GENERATECHECKOUTPRO, NODE_ENV } = process.env


function Side({ options, sideTitle, stepStateNumber, formikInstance }) {
  const [fetching, setFetching] = useState(false)
  const formik = useFormikContext()

  const [openBlockLayer, setOpenBlockLayer] = useState(false)
  const { formikValues, stripeRequest, setStripeRequest, userInfo, formRef, checkoutLink, setCheckoutLink, setOptions, options: optionsGlobal } = useContext(AppContext)
  const { country, quotes, amount, sale, contact, products } = formikValues

  const URL = NODE_ENV === "production" ? (`${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_STRIPESUBSCRIPTION}`) : REACT_APP_OCEANO_STRIPESUBSCRIPTION_LOCAL;

  const {cardComplete, dni, address, fullName, phone} = formik.values

  const generateButton = userInfo.stepTwo.value.includes('Stripe') ? cardComplete : (dni && address && [...address].length > 10)
  console.log({stripeRequest})

  useEffect(()=>{
    if(generateButton){
      optionsGlobal.sideItemOptions[4].status = 'completed';
      optionsGlobal.sideItemOptions[4].value = 'Completos';
      setOptions({ ...optionsGlobal });
    }else if(dni && address && fullName && phone){
      optionsGlobal.sideItemOptions[4].status = 'current';
      optionsGlobal.sideItemOptions[4].value = 'Sin Completar';
      setOptions({ ...optionsGlobal });
    }
    return () => null
  },[generateButton]);
  
  

  const handleSubmitMercadoPago = () => {
    setFetching(true);
    setOpenBlockLayer(true)
    
    formRef.current.style.filter = 'blur(5px)'
    formRef.current.style.position = 'relative'
    formRef.current.style.zIndex = '-9999'

    const body = new FormData();
        const type = formikValues.mod.toLowerCase().substring(0, 4);
        const requestConfig = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }

        body.append('months', 0);
        body.append('amount', `${formikValues.amount}`);
        body.append('type', type);
        body.append('so', formikValues.sale.SO_Number);
        body.append('address', formik.values.address);
        body.append('dni', formik.values.dni);
        body.append('phone', formik.values.phone);
        body.append('fullname', formik.values.fullName);

        const URL =
          NODE_ENV === 'production'
            ? `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_GENERATECHECKOUTPRO}`
            : REACT_APP_OCEANO_GENERATECHECKOUTPRO;
        
        axios.post(URL, body, requestConfig).then(res => {
          console.log({ res })
          setCheckoutLink(res.data.url);
    
        }).catch(err => {
          formRef.current.style.filter = 'blur(0px)'
          formRef.current.style.position = 'relative'
          formRef.current.style.zIndex = '0'
          setOpenBlockLayer(false)
          console.error({ err })
        }).finally(() => {
          setFetching(false);
        });

  }

  return (
    <div className="is-4 column side pl-6">
      <h2 className="title is-4">{sideTitle}</h2>
      <div className="side-body">
        {options.map(
          ({ step, label, status, value }) => (
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
          )
        )}

        {generateButton && (
          <>
          { userInfo.stepTwo.value.includes('Stripe') ? (
          <Button
              className={`bigger is-primary is-medium ${fetching && 'is-loading'}`}
              label={stripeRequest ? "Pago Realizado" : "Generar pago"}
              fullwidth
              onClick={() => console.log('NOPE')}
              disabled={stripeRequest}
            />
            ) : (
              <Button
              className={`bigger is-primary is-medium ${fetching && 'is-loading'}`}
              label={checkoutLink ? "Link generado" : "Generar link"}
              fullwidth
              onClick={handleSubmitMercadoPago}
              disabled={checkoutLink}
            />
            ) }
            

          </>
        )}
      </div>
      <motion.div style={{
        width: "100%",
        height: '100vh',
        position: 'absolute',
        top: '0',
        right: '-69%',
        zIndex: '-99',
        backgroundColor: "#F4F5F7",
        //backgroundColor:"red",
      }}>

      </motion.div>
      {
        openBlockLayer && (<>
        <motion.div style={{
          width: "3000px",
          height: '100vh',
          position: 'absolute',
          top: '0',
          right: '0',
          zIndex: '-100',
          backgroundColor: "white",
        }}
          animate={{ backgroundColor: "rgba(63, 108, 187, 0.8)" }}
          transition={{ ease: "easeOut", duration: 0.5 }}>



          </motion.div>
          <motion.div
          style={{
            width: "500px",
            height: '300px',
            position: 'absolute',
            top: '0',
            left: '0',
            bottom: '0',
            zIndex: '-98',
            backgroundColor: "white",
            margin: 'auto 0px',
            borderRadius: '4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}
          animate={{ backgroundColor: "#32bea6", boxShadow:'5px 5px 2rem rgba(0,0,0, 0.3)' }}
          transition={{ ease: "easeOut", duration: 0.5 }}
          >
            <motion.h2 className='title is-2 has-text-white'>Pago realizado!</motion.h2>
            <a href='http://localhost:3000/superpasarela/2712674000017120001' className='button is-primary'>Cobrar otro contrato</a>
          </motion.div>
          
        </>)}
    </div>
  );
}

Side.defaultProps = {
  sideTitle: 'Resumen del pago'
};

export default Side;
