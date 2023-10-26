import React, { useState } from 'react';

function RejectedSessionPTP({ rejectedSessionPTP }) {
  const [status] = useState(rejectedSessionPTP.payment.status ?? rejectedSessionPTP.payment);

  const classNameNotification = status.includes('PENDING') ? 'is-warning' : 'is-danger';

  if (rejectedSessionPTP.paymentOfSession) {
    return (
      <div id='rejectedSessionPTP' className={'notification ' + classNameNotification}>
        <p>
          <strong>Estado del pago:</strong> {rejectedSessionPTP?.paymentOfSession?.status}
        </p>
        <p>
          <strong>Referencia de pago:</strong> {rejectedSessionPTP?.paymentOfSession?.reference}
        </p>
        <p>
          <strong>Monto:</strong> {rejectedSessionPTP?.paymentOfSession?.currency}{' '}
          {rejectedSessionPTP?.paymentOfSession?.total}
        </p>
        <p>
          <strong>Nombre de usuario:</strong> {rejectedSessionPTP.fullName}
        </p>
        <a href={`/#/status/ptp/${rejectedSessionPTP?.paymentOfSession?.requestId}`}>
          Ver detalles
        </a>
      </div>
    );
  }

  return (
    <div id='rejectedSessionPTP' className={'notification ' + classNameNotification}>
      <p>
        <strong>Estado del pago:</strong> {status}
      </p>
      <p>
        <strong>Referencia de pago:</strong> {rejectedSessionPTP.payment.reference}
      </p>
      <p>
        <strong>Monto:</strong> {rejectedSessionPTP.payment.currency}{' '}
        {rejectedSessionPTP.payment.total}
      </p>
      <p>
        <strong>Nombre de usuario:</strong> {rejectedSessionPTP.fullName}
      </p>
    </div>
  );
}

export default RejectedSessionPTP;
