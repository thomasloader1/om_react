import React, { useContext } from 'react';
import InputField from '../InputField';
import {motion} from 'framer-motion';
import { AppContext } from '../Provider/StateProvider';
import CheckoutForm from './CheckoutForm';
import { FormStep } from './MultiStep';
import { useFormikContext } from 'formik';

function GeneratePaymentLinkStep({ checkoutLink }) {
  const { formikValues, userInfo } = useContext(AppContext);
const formik = useFormikContext()

  if (userInfo.stepTwo.value === "Mercado Pago") {
    return (
      <FormStep
      stepNumber={5}
          stepName='Finalize su compra'
      >
        <div id='grid-payment_mp'>
        <InputField type='text' id='fullName' name='fullName' label='Nombre del titular de la tarjeta' placeholder='Gomez Tomas Gonzalo' />
            <InputField type='phone' id='phone' name='phone' label='Telefono de facturacion' placeholder='1155011250' />
            <InputField type='address' id='address' name='address' label='Direccion de facturacion' placeholder='Calle falsa 123' />
            <InputField type='number' id='dni' name='dni' label='Numero de documento' placeholder='37827753' />
         {/*  <h3>Para completar la compra debera usarse plataforma {formikValues.payment_method}</h3>
          <a href={checkoutLink && checkoutLink} disabled={checkoutLink ? false : true} className="button is-link is-rounded" target="_blank" rel="noreferrer">{checkoutLink ? 'Ir al Link' : 'Oprima en finalizar para generar el link'}</a> */}

        </div>
      </FormStep>)
  } else {
    return (
      <>
        <FormStep
          stepNumber={5}
          stepName='Finalize su compra'
        >
          <div id='grid-payment_stripe'>

            <InputField type='text' id='fullName' name='fullName' label='Nombre del titular de la tarjeta' placeholder='Gomez Tomas Gonzalo' />
            <InputField type='phone' id='phone' name='phone' label='Telefono de facturacion' placeholder='1155011250' />
            <InputField type='address' id='address' name='address' label='Direccion de facturacion' placeholder='Calle falsa 123' />
            <InputField type='number' id='dni' name='dni' label='Numero de documento' placeholder='37827753' />
            
            
            <motion.div className="checkout_stripe field">

              <CheckoutForm />

            </motion.div>

          </div>
        </FormStep>
      </>
    );
  }



}

export default GeneratePaymentLinkStep;
