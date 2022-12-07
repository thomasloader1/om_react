import React, { useContext, useState } from 'react';
import {
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import axios from 'axios';
import { AppContext } from '../Provider/StateProvider';
import { Button, Content, Image, Media, Modal } from 'react-bulma-components';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [openModal, setOpenModal] = useState(null)

  const { formikValues, stripeRequest, setStripeRequest } = useContext(AppContext)
  const { country, quotes, amount, sale, contact, products } = formikValues

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

    console.log({ error, paymentMethod })

    const postStripe = {
      currency: country === "Chile" && "CLP",
      country: country === "Chile" && "CH",
      installments: quotes ? quotes : 1,
      email: contact.Email,
      paymentMethodId: paymentMethod.id,
      amount,
      contact,
      sale,
      products
    }

    const laravelResponse = await axios.post("http://localhost:8000/api/stripe/subscriptionPayment", postStripe)
    setStripeRequest(laravelResponse.data)
    console.log({ laravelResponse })
    setOpenModal('card')
  };

  return (
    <>
      <label htmlFor="card_element" className='label'>Tarjeta</label>
      <CardElement id='card_element' />
      <button className='button is-primary' type="button" onClick={handleSubmit} disabled={!stripe || !elements}>
        Pagar
      </button>

      <Modal
        show={openModal === 'card'}
        showClose={false}
        onClose={() => {
          return setOpenModal();
        }}
      >
        <Modal.Card>
          <Modal.Card.Header>
            <Modal.Card.Title>Title</Modal.Card.Title>
          </Modal.Card.Header>
          <Modal.Card.Body>
            <Media>
              {/* <Media.Item renderAs="figure" align="left">
                <Image
                  size={64}
                  alt="64x64"
                  src="http://bulma.io/images/placeholders/128x128.png"
                />
              </Media.Item> */}
              <Media.Item>
                <Content>
                  <pre>
                    {JSON.stringify(stripeRequest, null, 2)}
                  </pre>
                </Content>
              </Media.Item>
            </Media>
          </Modal.Card.Body>
        </Modal.Card>
      </Modal>
    </>
  );
};

export default CheckoutForm