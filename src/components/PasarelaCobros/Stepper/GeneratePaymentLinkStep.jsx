import React from 'react';
import RebillCheckoutForm from './RebillCheckoutForm';

function GeneratePaymentLinkStep() {

  return (<RebillCheckoutForm />)

  /* if (userInfo.stepTwo.value === 'Mercado Pago') {
    return (
      <FormStep stepNumber={5} stepName='Finaliza la compra'>
        <div id='grid-payment_mp'>
          <InputField
            type='text'
            id='fullName'
            name='fullName'
            label='Nombre del titular'
            placeholder='Ingresar nombre del titular'
          />
          <InputField
            type='phone'
            id='phone'
            name='phone'
            label='Teléfono'
            placeholder='Ingresar número de teléfono'
          />
          <InputField
            type='address'
            id='address'
            name='address'
            label='Dirección de facturación'
            placeholder='Dirección completa'
          />
          <InputField
            type='number'
            id='dni'
            name='dni'
            label='Numero de identificación'
            placeholder='Numero de identificación'
          />
          <InputField
            type='email'
            id='email'
            name='email'
            label='E-mail'
            placeholder='Ingresar e-mail'
          />
        </div>
      </FormStep>
    );
  } else {
    return (
      <>
        <FormStep stepNumber={5} stepName='Finaliza la compra'>
          <div id='grid-payment_stripe'>
            <InputField
              type='text'
              id='fullName'
              name='fullName'
              label='Nombre del titular'
              placeholder='Ingresar nombre del titular'
            />
            <InputField
              type='phone'
              id='phone'
              name='phone'
              label='Teléfono'
              placeholder='Ingresar número de teléfono'
            />
            <InputField
              type='address'
              id='address'
              name='address'
              label='Dirección de facturación'
              placeholder='Dirección completa'
            />
            <InputField
              type='number'
              id='dni'
              name='dni'
              label='Número de identificación'
              placeholder='Número de identificación'
            />
            <InputField
              type='email'
              id='email'
              name='email'
              label='E-mail'
              placeholder='Ingresar e-mail'
            />

            <motion.div className='checkout_stripe field'>
              <CheckoutForm />
            </motion.div>
          </div>
        </FormStep>
      </>
    );
  } */
}

export default GeneratePaymentLinkStep;
