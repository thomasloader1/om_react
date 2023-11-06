import React from 'react';
import PaymentElement from '../CheckoutPTP/PaymentElement';

import PaymentNotificationPTP from '../PaymentNotificationPTP/PaymentNotificationPTP';
import MotionSpinner from '../Spinner/MotionSpinner';
const PaymentStatusPTP = ({ checkoutPayment, handleInitPayment, startPayment }) => {
  const isExpired = new Date(checkoutPayment?.transaction?.expiration_date) < new Date();
  const hasPaymentInformation = checkoutPayment.payment;
  console.log(checkoutPayment);

  const checkSessionExpiredToPay = (isExpired) => {
    if (isExpired) {
      return (
        <div className='notification is-info my-5 mx-3'>
          El tiempo para pagar la inscripcion fue superada, <strong>solicite un nuevo link</strong>{' '}
          para continuar con el pago
        </div>
      );
    }

    if (!startPayment) {
      return (
        <PaymentElement checkoutPayment={checkoutPayment} handleInitPayment={handleInitPayment} />
      );
    } else if (startPayment && !hasPaymentInformation) {
      return <MotionSpinner text={'Procesando pago'} viewHeight={'200px'} />;
    }
  };

  const initialContent = checkSessionExpiredToPay(isExpired);

  if (hasPaymentInformation) {
    return (
      <PaymentNotificationPTP
        paymentStatus={hasPaymentInformation.status}
        payment={hasPaymentInformation}
      />
    );
  }

  return initialContent;
};

export default PaymentStatusPTP;
