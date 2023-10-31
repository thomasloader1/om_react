import { getMessageStatus, ptpStates } from '../../../logic/ptp';
import React from 'react';

const PaymentNotificationPTP = ({ paymentStatus, payment }) => {
  const { className, message } = getMessageStatus(paymentStatus);

  const amountOfPayment =
    payment?.first_installment || payment?.remaining_installments || payment?.total;

  return (
    <div className={`is-flex is-flex-direction-column notification ${className} my-5 mx-5`}>
      <h4 className='mb-5 is-size-4'>{message}</h4>
      <p>
        <strong>Reference:</strong> {payment.reference}
      </p>
      <p className={'my-3'}>
        <strong>Estado del Pago:</strong> {payment.message}
      </p>
      <p>
        <strong>Monto del Pago:</strong> {amountOfPayment} {payment.currency}
      </p>

      {paymentStatus !== ptpStates.REJECT && (
        <a
          className='mt-5 button is-info'
          target='_blank'
          href={`/#/status/ptp/${payment.requestId}`}
        >
          Ver detalles
        </a>
      )}
    </div>
  );
};

export default PaymentNotificationPTP;
