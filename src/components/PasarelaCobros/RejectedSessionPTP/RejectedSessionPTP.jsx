import React, { useState } from 'react';
import {ptpMessagesStates, ptpStates} from "../../../logic/ptp";

function RejectedSessionPTP({ rejectedSessionPTP }) {
  const [status] = useState(rejectedSessionPTP.payment.status ?? rejectedSessionPTP.payment);

  if (rejectedSessionPTP.paymentOfSession && status !== ptpStates.OK) {
    const classNameNotification = status.includes(ptpStates.PENDING) ? 'is-warning' : 'is-danger';

    return (
      <div id='rejectedSessionPTP' className={'is-flex is-flex-direction-column notification ' + classNameNotification}>
        <p>
          <strong>Estado del pago:</strong> {ptpMessagesStates[rejectedSessionPTP?.paymentOfSession?.status]}
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
        <a className={"button is-info mt-5"} target={"_blank"} href={`/#/status/ptp/${rejectedSessionPTP?.paymentOfSession?.requestId}`}>
          Ver detalles
        </a>
      </div>
    );
  }

  //Cuando el usuario no desea continuar con el pago o es distinto de PENDING

  const classNameNotification = status.includes(ptpStates.REJECT) ? 'is-danger' : 'is-success';
  return (
    <div id='rejectedSessionPTP' className={'notification ' + classNameNotification}>
      <p>
        <strong>Estado del pago:</strong> {ptpMessagesStates[status]}
      </p>
      <p>
        <strong>Referencia de pago:</strong> {rejectedSessionPTP.reference}
      </p>
      <p>
        <strong>Nombre de usuario:</strong> {rejectedSessionPTP.fullName}
      </p>
    </div>
  );
}

export default RejectedSessionPTP;
