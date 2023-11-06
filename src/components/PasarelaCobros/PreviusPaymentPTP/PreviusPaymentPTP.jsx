import React from 'react';
import { ptpMessagesStates, ptpStates } from '../../../logic/ptp';

function PreviusPaymentPTP({ prevPayment }) {
  //console.log({ asd: prevPayment });

  if (prevPayment.status === ptpStates.PENDING) {
    return (
      <div
        id='prevPaymentPTP'
        className={'mx-5 mt-3 is-flex is-flex-direction-column notification is-warning'}
      >
        <h1 className='is-size-5 mb-2'>Usted tiene una transaction previa</h1>
        <p>
          <strong>Estado del pago:</strong> {ptpMessagesStates[prevPayment?.status]}
        </p>
        <p>
          <strong>Referencia de pago:</strong> {prevPayment.reference}
        </p>
        <p>
          <strong>Monto:</strong> {prevPayment.total} {prevPayment.currency}
        </p>
        <p>
          <strong>Nombre de usuario:</strong> {JSON.parse(prevPayment.paymentData).name}{' '}
          {JSON.parse(prevPayment.paymentData).surname}
        </p>
      </div>
    );
  }
}

export default PreviusPaymentPTP;
