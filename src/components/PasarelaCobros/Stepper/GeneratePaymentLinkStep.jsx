
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

  console.log({stripePromise})


  if (userInfo.stepTwo.value === "Mercado Pago") {
    console.log({ formikValues })
    return (
      <div id='grid-client_data'>
        <h3>Este paso tiene que hacerse en la plataforma {formikValues.payment_method}</h3>
        <p>Oprima en finalizar para generar el link</p>
        <pre>{JSON.stringify(formikValues, null, 2)}</pre>
        {checkoutLink && <a href={checkoutLink} className="button is-link is-rounded" target="_blank" rel="noreferrer"> Ir al Link </a>}

      </div>)
  } else {
    return (
      <>
      <FormStep
        stepNumber={5}
        stepName='Finalize su compra'
      >
      <div id='grid-payment_stripe'>
      { stripeRequest === null &&
        <div className="checkout_stripe field">
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      }
        <div id="serverNotify">
          { stripeRequest?.status === 'active' &&
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
