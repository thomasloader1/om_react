import React, { useContext } from 'react';
import InputField from '../InputField';
import { motion } from 'framer-motion';
import { AppContext } from '../Provider/StateProvider';
import CheckoutForm from './CheckoutForm';
import { FormStep } from './MultiStep';

function GeneratePaymentLinkStep({ checkoutLink }) {
  const { userInfo } = useContext(AppContext);

  if (userInfo.stepTwo.value === "Mercado Pago") {
    return (
      <FormStep
        stepNumber={5}
        stepName='Finalize su compra'
      >
        <div id='grid-payment_mp'>
          <InputField type='text' id='fullName' name='fullName' label='Nombre del titular de la tarjeta' placeholder='Nombre completo' />
          <InputField type='phone' id='phone' name='phone' label='Telefono de facturacion' placeholder='Numero de telefono' />
          <InputField type='address' id='address' name='address' label='Direccion de facturacion' placeholder='Direccion completa' />
          <InputField type='number' id='dni' name='dni' label='Numero de documento' placeholder='Numero de indentificacion' />
          <InputField type='email' id='email' name='email' label='Correo Electronico' placeholder='Correo electronico de facturacion' />
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
            <InputField type='text' id='fullName' name='fullName' label='Nombre del titular de la tarjeta' placeholder='Nombre completo' />
            <InputField type='phone' id='phone' name='phone' label='Telefono de facturacion' placeholder='Numero de telefono' />
            <InputField type='address' id='address' name='address' label='Direccion de facturacion' placeholder='Direccion completa' />
            <InputField type='number' id='dni' name='dni' label='Numero de documento' placeholder='Numero de indentificacion' />
            <InputField type='email' id='email' name='email' label='Correo Electronico' placeholder='Correo electronico de facturacion' />

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
