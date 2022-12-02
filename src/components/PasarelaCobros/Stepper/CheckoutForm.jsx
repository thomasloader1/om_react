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


  const [stripeRequest, setStripeRequest] = useState(null)
  const [openModal, setOpenModal] = useState(null)

  const { formikValues } = useContext(AppContext)
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
   /*  const { client_secret } = laravelResponse.data.response
    console.log({ client_secret })


    const { paymentIntent } = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    }
    )

    console.log({ paymentIntent }) */
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
          {JSON.stringify(stripeRequest, null, 2)}
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
                  <p>
                    <strong>John Smith</strong> <small>@johnsmith</small>{' '}
                    <small>31m</small>
                    <br />
                    If the children of the Modal is a card, the close button
                    will be on the Card Head instead than the top-right corner
                    You can also pass showClose = false to Card.Head to hide the
                    close button
                  </p>
                </Content>
              </Media.Item>
            </Media>
          </Modal.Card.Body>
          <Modal.Card.Footer renderAs={Button.Group} align="right" hasAddons>
            <Button color="success">Like</Button>
            <Button>Share</Button>
          </Modal.Card.Footer>
        </Modal.Card>
      </Modal>
    </>
  );
};

export default CheckoutForm