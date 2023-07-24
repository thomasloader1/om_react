
import React from 'react'

const InvoiceDetail = ({ invoiceDetail }) => {
    const { advancePayment, formattedFirstPay, formattedPayPerMonth } = invoiceDetail;
    const { info, isTraditional, isSuscription, isAdvanceSuscription } = advancePayment

    /* console.group("InvoiceDetail Component")
    console.log({ invoiceDetail })
    console.groupEnd() */

    return (<>
        {isTraditional && (
            <div>
                <p className='mb-4'>Realiza el primer pago y, en los meses siguientes, completarás los pagos restantes.</p>
                <p className='item-deail-text mb-2'>{1} pago de:</p>
                <h3 className='title is-3 item-deail-text has-text-weight-bold'>{formattedFirstPay}</h3>
            </div>
        )}

        {(isSuscription || isAdvanceSuscription) && (
            <div>
                <p className='mb-4'>Realiza el primer pago y, en los meses siguientes, completarás los pagos restantes.</p>
                <p className='item-deail-text mb-2'>{1} pago de:</p>
                <h3 className='title is-3 item-deail-text has-text-weight-bold'>{formattedFirstPay}</h3>
                <p className='invoice-text'>{info.remainingQuotes} pagos restantes de <span className='has-text-weight-bold'>{formattedPayPerMonth}</span></p>
            </div>
        )}
    </>)
}

export default InvoiceDetail