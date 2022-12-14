
import { Elements } from '@stripe/react-stripe-js';
import React, { useContext } from 'react';
import { Block, Notification } from 'react-bulma-components';
import useStripeEnv from '../Hooks/useStripeEnv';

import { AppContext } from '../Provider/StateProvider';
import CheckoutForm from './CheckoutForm';
import { FormStep } from './MultiStep';

function GeneratePaymentLinkStep({ checkoutLink }) {
  const { formikValues, userInfo, stripeRequest } = useContext(AppContext);
  const { stripePromise } = useStripeEnv();


  if (userInfo.stepTwo.value === "Mercado Pago") {
    return (
      <>
        <h2 className="title is-4">
          <span className="has-text-white has-background-black is-circle">5</span>
          Ultimo paso!
        </h2>
        <div id='grid-payment_mp'>
          <h3>Para completar la compra debera usarse plataforma {formikValues.payment_method}</h3>
          <a href={checkoutLink && checkoutLink} disabled={checkoutLink ? false : true} className="button is-link is-rounded" target="_blank" rel="noreferrer">{checkoutLink ? 'Ir al Link' : 'Oprima en finalizar para generar el link'}</a>

        </div>
      </>)
  } else {
    return (
      <>
        <FormStep
          stepNumber={5}
          stepName='Finalize su compra'
        >
          <div id='grid-payment_stripe'>
            {stripeRequest === null &&
              <div className="checkout_stripe field">
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              </div>
            }
            <div id="serverNotify">
              {stripeRequest?.status === 'active' &&
                <Block>
                  <Notification color="success">
                    ¡El pago fue exitoso!
                    {/* {JSON.stringify(stripeRequest, null, 2)} */}
                  </Notification>
                </Block>}
            </div>
          </div>
        </FormStep>
      </>
    );
  }



}

export default GeneratePaymentLinkStep;
