import React, { useEffect, useState } from 'react'

const PaymentElement = ({checkoutPayment, handleInitPayment}) => {

const [termsChecked, setTermsChecked] = useState(false);
  const [policyChecked, setPolicyChecked] = useState(false);
  const [showPaymentButton, setShowPaymentButton] = useState(false);
      const handleTermsChange = () => {
    setTermsChecked(!termsChecked);
  };

  const handlePolicyChange = () => {
    setPolicyChecked(!policyChecked);
  };


  useEffect(() => {
    // Verifica si ambos checkboxes están marcados
    if (termsChecked && policyChecked) {
      setShowPaymentButton(true);
    } else {
      setShowPaymentButton(false);
    }
  }, [termsChecked, policyChecked]);

  return (
    <>
        <div className='is-flex is-flex-direction-column is-align-items-center  mt-3 '>
                  <div>
                    <input
                      type='checkbox'
                      name='terms'
                      className='mr-3'
                      checked={termsChecked}
                      onChange={handleTermsChange}
                    />
                    <span className='invoice-text'>
                      Si acepto los{' '}
                      <a
                        href='https://msklatam.com/ec/condiciones-de-contratacion'
                        target='_blank'
                        rel='noreferrer'
                        className='has-text-info'
                      >
                        términos y condiciones
                      </a>
                    </span>
                  </div>
                  <div>
                    <input
                      type='checkbox'
                      name='policy'
                      className='mr-3'
                      checked={policyChecked}
                      onChange={handlePolicyChange}
                    />
                    <span className='invoice-text'>
                      Si acepto las{' '}
                      <a
                        href='https://msklatam.com/ec/politica-de-privacidad'
                        target='_blank'
                        rel='noreferrer'
                        className='has-text-info'
                      >
                        políticas de protección de datos
                      </a>
                    </span>
                  </div>
                </div>

                <div className='mx-auto is-fullheight'>
                  {checkoutPayment?.status.includes('Pendiente') ||
                  checkoutPayment?.status.includes('Efectivo') ? (
                    <div className='my-5 is-flex is-justify-content-center is-align-items-center'>
                      El estado de su pago es:{'  '}
                      <span className='price-one ml-2'>
                        <strong>{checkoutPayment?.status}</strong>
                      </span>
                    </div>
                  ) : (
                    <div className='my-5 is-flex is-justify-content-center is-align-items-center'>
                      <button
                        id='ptpPayNow'
                        className='button is-success'
                        onClick={handleInitPayment}
                        disabled={!showPaymentButton}
                      >
                        Iniciar Pago
                      </button>
                    </div>
                  )}
                </div>
    </>
  )
}

export default PaymentElement