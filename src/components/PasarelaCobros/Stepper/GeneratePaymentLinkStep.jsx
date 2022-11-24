
import React, { useContext } from 'react';
import { AppContext } from '../Provider/StateProvider';


function GeneratePaymentLinkStep({checkoutLink}) {
  const { formikValues, userInfo } = useContext(AppContext);

  if (userInfo.stepTwo.value === "Mercado Pago") {
    console.log({formikValues})
    return (
      <div id='grid-client_data'>
        <h3>Este paso tiene que hacerse en la plataforma {formikValues.payment_method}</h3>
        <p>Oprima en finalizar para generar el link</p>
        <pre>{JSON.stringify(formikValues, null, 2)}</pre>
        <pre>{checkoutLink && checkoutLink}</pre>
      </div>)
  } else {
    return (
      <div id='grid-client_data'>
          
      </div>
    );
  }



}

export default GeneratePaymentLinkStep;
