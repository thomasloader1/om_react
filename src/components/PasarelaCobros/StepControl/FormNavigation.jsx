import { useFormikContext } from 'formik';
/* import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'; */
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button } from 'react-bulma-components';
import { getAllISOCodes } from 'iso-country-currency';
import { AppContext } from '../Provider/StateProvider';

const {
  REACT_APP_OCEANO_URL,
  REACT_APP_OCEANO_STRIPESUBSCRIPTION,
  REACT_APP_OCEANO_STRIPESUBSCRIPTION_LOCAL,
  NODE_ENV,
} = process.env;

const FormNavigation = (props) => {
  const [fetching, setFetching] = useState(false);
  const formik = useFormikContext();
  const URL =
    NODE_ENV === 'production'
      ? `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_STRIPESUBSCRIPTION}`
      : REACT_APP_OCEANO_STRIPESUBSCRIPTION_LOCAL;

  const disabledButton = props.isLastStep === !formik.values.cardComplete;

  /*   const stripe = useStripe();
    const elements = useElements(); */
  const [openModal, setOpenModal] = useState(null);
  const { formikValues, setStripeRequest } = useContext(AppContext);
  const { country, quotes, amount, sale, contact, products } = formikValues;

  /* const handleSubmit = async (event) => {
    setFetching(true);
    event.preventDefault();
    event.stopPropagation();

    if (elements == null) {
      return;
    }

    const allIsoCodes = getAllISOCodes();
    const filterIso = allIsoCodes.filter((iso) => iso.countryName === country);
    const countryObject = filterIso[0];
    const { currency, iso } = countryObject;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    // console.log({ error, paymentMethod })

    const postStripe = {
      currency,
      country: iso,
      installments: quotes ? quotes : 1,
      email: contact.Email,
      paymentMethodId: paymentMethod.id,
      amount,
      contact,
      sale,
      products,
      contractId: formikValues.contractId,
    };

    const laravelResponse = await axios.post(URL, postStripe);
    setStripeRequest(laravelResponse.data);
    // console.log({ laravelResponse })
    setOpenModal('card');
    setFetching(false);
  }; */

  return (
    <div className='controls'>
      {props.hasPrevious && (
        <Button
          className='flex-grow-1 is-primary is-outlined is-normal is-fullwidth'
          type='button'
          onClick={props.onBackClick}
        >
          Volver
        </Button>
      )}
      {!props.isLastStep && (
        <Button
          className={`flex-grow-1 is-primary is-normal is-fullwidth`}
          disabled={disabledButton}
          type='submit'
        >
          {props.isLastStep ? 'Pagar' : 'Siguiente'}
        </Button>
      )}
    </div>
  );
};

export default FormNavigation;
