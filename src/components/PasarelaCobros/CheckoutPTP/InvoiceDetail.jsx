import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Provider/StateProvider';

export const generateProp = (advancePayment, formattedFirstPay, formattedPayPerMonth) => ({
  advancePayment,
  formattedFirstPay,
  formattedPayPerMonth,
});

const InvoiceDetail = ({ invoiceDetail }) => {
  console.group("InvoiceDetail")
  const { advancePayment, formattedFirstPay, formattedPayPerMonth } = invoiceDetail;
  const { ptpFetching } = useContext(AppContext);
  const [info, setInfo] = useState({});
  console.log({hasAdvancedPayment: !advancePayment ,advancePayment, ptpFetching, invoiceDetail });

  useEffect(() => {
    if (advancePayment?.info) {
      setInfo(advancePayment.info);
    }
  }, []);

  if (!advancePayment) {
    const {
      status,
      date,
      reference,
      total,
      first_installment,
      quotes,
      remaining_installments,
      paymentData,
      currency,
    } = ptpFetching.updateRequestSession;

    const payer = JSON.parse(paymentData);

    return (
      <div className='box is-success mb-5'>
        <div className='content'>
          <p className='subtitle is-6'>
            <strong>Referencia:</strong> {reference}
          </p>
          <p className='subtitle is-6'>
            <strong>Estado:</strong> {status && status}
          </p>
          <p className='subtitle is-6'>
            <strong>Usuario:</strong> {`${payer.name} ${payer.surname}`}
          </p>
          <p className='subtitle is-6'>
            <strong>Correo:</strong> {payer.email}
          </p>
          <p className='subtitle is-6'>
            <strong>Identificación:</strong> {`${payer.documentType} ${payer.document}`}
          </p>
          <p className='subtitle is-6'>
            <strong>Monto Abonado:</strong> {first_installment ?? remaining_installments}{' '}
            {` ${currency}`}
          </p>
        </div>
      </div>
    );
  }

  const { isTraditional, isSuscription, isAdvanceSuscription } = advancePayment;

  return (
    <>
      {isTraditional && (
        <div>
          <p className='mb-4'>
            Realiza el primer pago y, en los meses siguientes, completarás los pagos restantes.
          </p>
          <p className='item-deail-text mb-2'>{1} pago de:</p>
          <h3 className='title is-3 item-deail-text has-text-weight-bold'>{formattedFirstPay}</h3>
        </div>
      )}

      {(isSuscription || isAdvanceSuscription) && (
        <div>
          <p className='mb-4'>
            Realiza el primer pago y, en los meses siguientes, completarás los pagos restantes.
          </p>
          <p className='item-deail-text mb-2'>{1} pago de:</p>
          <h3 className='title is-3 item-deail-text has-text-weight-bold'>{formattedFirstPay}</h3>
          <p className='invoice-text'>
            {info?.remainingQuotes} pagos restantes de{' '}
            <span className='has-text-weight-bold'>{formattedPayPerMonth}</span>
          </p>
        </div>
      )}
    </>
  );
  console.groupEnd()

};

export default InvoiceDetail;
