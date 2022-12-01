
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useContext } from 'react';
import { AppContext } from '../Provider/StateProvider';
import CheckoutForm from './CheckoutForm';
import { FormStep } from './MultiStep';


function GeneratePaymentLinkStep({ checkoutLink }) {
  const { formikValues, userInfo } = useContext(AppContext);
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_TEST_OM);


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
      <FormStep
        stepNumber={5}
        stepName='Finalize su compra'
      >
      <div id='grid-payment_stripe'>
        <div className="checkout_stripe field">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
        </div>
        <div id="serverNotify">

        </div>
        <pre>{JSON.stringify(formikValues, null, 2)}</pre>
      </div>
      </FormStep>
    );
  }



}

export default GeneratePaymentLinkStep;
