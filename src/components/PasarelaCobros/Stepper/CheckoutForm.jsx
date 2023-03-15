import React, { useContext } from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import { AppContext } from '../Provider/StateProvider';
import { useFormikContext } from 'formik';
import InputField from '../InputField';
import { useMediaQSmall } from '../Hooks/useMediaQuery';

const CheckoutForm = () => {
  const { options, setOptions } = useContext(AppContext);
  const isMobile = useMediaQSmall();
  const formik = useFormikContext();

  const handleChange = (event) => {
    console.log({ event, formik });
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
      {isMobile ? (
        <>
          <div className='cardInputsMobile'>
            <InputField
              type='text'
              id='cardNumber'
              name='cardNumber'
              label='Número de tarjeta'
              placeholder='Ingresar el número de tarjeta' onChange={handleChange}
            />

            <InputField type='number' id='cardCVV' name='cardCVV' label='CVV' placeholder='XXX' onChange={handleChange} />
            <InputField
              type='text'
              id='cardExpDate'
              name='cardExpDate'
              label='Vencimiento'
              placeholder='MM / AA' onChange={handleChange}
            />
            <InputField
              type='text'
              id='cardPostalCode'
              name='cardPostalCode'
              label='Cód. Postal'
              placeholder='C.P.' onChange={handleChange}
            />
          </div>
        </>
      ) : (
        <>
          <label htmlFor='card_element' className='label'>
            Tarjeta
          </label>
          <CardElement id='card_element' onChange={handleChange} />
        </>
      )}

    </>
  );
};

export default CheckoutForm;
