import React from 'react';
import PaymentElement from "../CheckoutPTP/PaymentElement";

import PaymentNotificationPTP from "../PaymentNotificationPTP/PaymentNotificationPTP";
const PaymentStatusPTP = ({ checkoutPayment, handleInitPayment, startPayment}) => {
    const isExpired = new Date(checkoutPayment?.transaction?.expiration_date) < new Date();
    console.log(checkoutPayment)

    const checkSessionExpiredToPay = (isExpired) => {
        if(isExpired){
            return (
                <div className='notification is-info my-5 mx-3'>
                    El tiempo para pagar la inscripcion fue superada,{' '}
                    <strong>solicite un nuevo link</strong> para continuar con el pago
                </div>)
        }

        if(!startPayment){
            return (<PaymentElement
                checkoutPayment={checkoutPayment}
                handleInitPayment={handleInitPayment}
            />)
        }

    }

    const initialContent = checkSessionExpiredToPay(isExpired);

    if (checkoutPayment.payment) {
       return <PaymentNotificationPTP paymentStatus={checkoutPayment.payment.status} payment={checkoutPayment.payment} />
    }

    return initialContent;



};

export default PaymentStatusPTP;