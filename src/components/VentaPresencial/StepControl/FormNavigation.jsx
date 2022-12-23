import { useFormikContext } from 'formik';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button } from 'react-bulma-components';
import { getAllISOCodes } from 'iso-country-currency';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider'; 

const { REACT_APP_OCEANO_URL,REACT_APP_OCEANO_STRIPESUBSCRIPTION,REACT_APP_OCEANO_STRIPESUBSCRIPTION_LOCAL, NODE_ENV } = process.env


const FormNavigation = (props) => {
  const [fetching, setFetching] = useState(false);
  const formik = useFormikContext();
  const URL = NODE_ENV === "production" ? (`${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_STRIPESUBSCRIPTION}`) : REACT_APP_OCEANO_STRIPESUBSCRIPTION_LOCAL;
  
  const disabledButton = props.isLastStep === !formik.values.cardComplete

  const [openModal, setOpenModal] = useState(null)
  const { formikValues, stripeRequest, setStripeRequest, userInfo } = useContext(AppContext)
  const { country, quotes, amount, sale, contact, products } = formikValues

console.log({props})
  
  return (
    <div className='controls'>
      {props.hasPrevious && (
        <Button className="flex-grow-1 is-primary is-normal is-fullwidth" type='button' onClick={props.onBackClick}>Volver</Button>
      )}
      {!props.isLastStep && (
        <Button className={`flex-grow-1 is-primary is-normal is-fullwidth`} disabled={disabledButton} type='submit'>{props.isLastStep ? 'Pagar' : 'Siguiente'}</Button>
      )}
    </div>
  );
};

export default FormNavigation;
