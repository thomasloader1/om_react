import React, { useState } from 'react';
import PaymentElement from "../CheckoutPTP/PaymentElement";
import {ptpStates} from "../../../logic/ptp";

const PaymentStatusPTP = ({ checkoutPayment, handleInitPayment }) => {
    const [paymentStatus, setPaymentStatus] = useState(null);
    const isExpired = new Date(checkoutPayment?.transaction?.expiration_date) < new Date();

   console.log({isExpired, checkoutPayment})

    const checkSessionExpiredToPay = () => {
        if(isExpired){
            return (
                <div className='notification is-info my-5 mx-3'>
                El tiempo para pagar la inscripcion fue superada,{' '}
                <strong>solicite un nuevo link</strong> para continuar con el pago
            </div>)
        }

        return (<PaymentElement
                checkoutPayment={checkoutPayment}
                handleInitPayment={handleInitPayment}
            />)
    }

    const getMessageStatus = (paymentStatus) => {
       let response = {
           message: "",
           className: "",
       }
        switch (paymentStatus) {
            case ptpStates.PENDING:
                response.message = "El pago realizado está en estado pendiente.";
                response.className = "is-warning";
                break;
            case ptpStates.REJECT:
                response.message = "El pago realizado ha sido rechazado. Por favor, vuelva a comenzar.";
                response.className = "is-danger";
                break;
            default:
                response.message = "El pago realizado ha sido aprobado correctamente.";
                response.className = "is-success";
                break;
        }

        return response;
    }

    const getPaymentNotification = (paymentStatus, payment) => {

        const { className , message} = getMessageStatus(paymentStatus);

        return ( <div className={`notification ${className} my-5 mx-3`}>
            <h4 className="mb-3">{payment.message}</h4>
            <p>
                <strong>Reference:</strong> {payment.reference}
            </p>
            <p>
                <strong>Estado del Pago:</strong>{' '}
                {payment.status}
            </p>
            <p>
                <strong>Monto del Pago:</strong>{' '}
                {payment.total}{' '}
                {payment.currency}
            </p>

            <a className="mt-3 button is-info mx-auto" href={`/#/status/ptp/${payment.requestId}`}>Ver detalles</a>
        </div>)
    };

    if (checkoutPayment.payment) {
       return getPaymentNotification(checkoutPayment.payment.status, checkoutPayment.payment);
    } else {
        return checkSessionExpiredToPay(isExpired);
    }


};

export default PaymentStatusPTP;