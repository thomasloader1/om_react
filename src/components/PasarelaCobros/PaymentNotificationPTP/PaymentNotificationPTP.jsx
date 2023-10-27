import {getMessageStatus} from "../../../logic/ptp";
import React from "react";

const PaymentNotificationPTP = ({paymentStatus, payment}) => {
    const { className , message} = getMessageStatus(paymentStatus);
    return ( <div className={`is-flex is-flex-direction-column notification ${className} my-5 mx-5`}>
        <h4 className="mb-5 is-size-4">{message}</h4>
        <p>
            <strong>Reference:</strong> {payment.reference}
        </p>
        <p className={"my-3"}>
            <strong>Estado del Pago:</strong>{' '}
            {payment.message}
        </p>
        <p>
            <strong>Monto del Pago:</strong>{' '}
            {payment.total}{' '}
            {payment.currency}
        </p>

        <a className="mt-5 button is-info" href={`/#/status/ptp/${payment.requestId}`}>Ver detalles</a>
    </div>)
};

export default PaymentNotificationPTP;