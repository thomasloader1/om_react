import React, { useContext } from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import { AppContext } from '../Provider/StateProvider';
import { useFormikContext } from 'formik';
import { useMediaQSmall } from '../Hooks/useMediaQuery';

const CheckoutForm = () => {
  const { options, setOptions } = useContext(AppContext);
  const isMobile = useMediaQSmall();
  const formik = useFormikContext();

  const handleChange = (event) => {
    if (event.complete) {
      options.sideItemOptions[4].status = 'completed';
      options.sideItemOptions[4].value = 'Completos';
      setOptions({ ...options });
      formik.setFieldValue('cardComplete', true);
    } else {
      options.sideItemOptions[4].status = 'current';
      options.sideItemOptions[4].value = 'Sin Completar';
      setOptions({ ...options });
      formik.setFieldValue('cardComplete', false);
    }
  };

  return (
    <>
      <label htmlFor='card_element' className='label'>
        Tarjeta
      </label>
      <CardElement id='card_element' onChange={handleChange} />
    </>
  );
};

export default CheckoutForm;
