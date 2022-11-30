import React, { useContext } from 'react';
import {
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import axios from 'axios';
import { AppContext } from '../Provider/StateProvider';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { formikValues } = useContext(AppContext)

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (elements == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    })

    console.log({error, paymentMethod})

    const laravelResponse = await axios.post("http://localhost:8000/api/stripe/paymentIntent", {
      amount: 12345,
      currency: 'usd'
    })

    const { client_secret } = laravelResponse.data.response
    console.log({ client_secret })


    const { paymentIntent } = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    }
    )

    console.log({ paymentIntent })


  };

  return (
    <form action="#" id='payment_form' onSubmit={handleSubmit}>
      <pre>{JSON.stringify(formikValues, null, 2)}</pre>
      <label htmlFor="card_element">Tarjeta</label>
      <CardElement id='card_element' />
      <button className='button is-primary' type="button" onClick={handleSubmit} disabled={!stripe || !elements}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm