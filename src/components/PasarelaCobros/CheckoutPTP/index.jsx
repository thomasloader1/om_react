import React, { useEffect, useState } from 'react';
import IMAGES from '../../../img/pasarelaCobros/share';
import { useLocation, useParams } from 'react-router';
import axios from 'axios';
import { fireModalAlert, fireToast } from '../Hooks/useSwal';
import {
  URLS,
  debitFirstPayment,
  ptpCurrencyOptions,
  ptpImages,
  updateZohoContract,
} from '../../../logic/ptp';
import { useContractZoho } from '../Hooks/useContractZoho';
import MotionSpinner from '../Spinner/MotionSpinner';
import { getCurrency } from '../../../logic/rebill';
import InvoiceDetail from './InvoiceDetail';
import { makePostUpdateZohoPTP } from '../../../logic/zoho';
import PaymentElement from './PaymentElement';
import { handleCheckoutData } from '../Helpers/handleCheckoutData';

const { logo } = IMAGES;

const CheckoutPTP = () => {
  const [checkoutPayment, setCheckoutPayment] = useState(null);
  const [processURL, setProcessURL] = useState(null);

  const [products, setProducts] = useState(null);
  const [advancePayment, setAdvancePayment] = useState({});
  const [paymentAction, setPaymentAction] = useState(false);
  const [currencyOptions, setCurrencyOptions] = useState(ptpCurrencyOptions);
  const [ptpEffect, setPtpEffect] = useState(true);
  const [invoiceDetail, setInvoiceDetail] = useState(null);

  const { so } = useParams();
  const { pathname } = useLocation();

  const needRunEffect = !pathname.includes('vp');
  const { loading, data: contractData } = useContractZoho(so, needRunEffect);

  const isExpired = new Date(checkoutPayment?.transaction?.expiration_date) < new Date();

  const valuesAdvanceSuscription = ({ total, checkoutPayment }) => {
    console.group('valuesAdvanceSuscription');
    console.log({ total });
    console.groupEnd();
    const { quotes, type } = checkoutPayment;

    const isAdvanceSuscription = type.includes('Suscripción con anticipo');
    const isSuscription = type.includes('Suscripción') && !type.includes('anticipo');
    const isTraditional = type.includes('Tradicional');

    const detailValues = {
      isAdvanceSuscription,
      isSuscription,
      isTraditional,
      info: {},
    };

    if (isAdvanceSuscription) {
      const quoteForMonth = Math.floor(total / quotes);
      const remainingQuotes = quotes === 1 ? 1 : quotes - 1;

      const firstQuoteDiscount = Math.floor(quoteForMonth / 2);
      const remainingAmountToPay = total - firstQuoteDiscount;
      const payPerMonthAdvance = Math.floor(remainingAmountToPay / remainingQuotes);
      const adjustmentPayment = parseFloat(
        (payPerMonthAdvance * remainingQuotes + firstQuoteDiscount - total).toFixed(2),
      );

      detailValues.info = {
        remainingQuotes,
        firstQuoteDiscount,
        remainingAmountToPay,
        payPerMonthAdvance,
        adjustmentPayment,
      };
    } else if (isSuscription) {
      const quoteForMonth = Math.floor(total / quotes);
      const remainingQuotes = quotes === 1 ? 1 : quotes - 1;
      const payPerMonthAdvance = quoteForMonth;
      const adjustmentPayment = parseFloat((payPerMonthAdvance * quotes - total).toFixed(2));

      detailValues.info = {
        quoteForMonth,
        remainingQuotes,
        payPerMonthAdvance,
        adjustmentPayment,
      };
    } else {
      const quoteForMonth = Math.floor(total / 1);

      const payPerMonthAdvance = quoteForMonth;
      const adjustmentPayment = parseFloat((payPerMonthAdvance - total).toFixed(2));

      detailValues.info = {
        quoteForMonth,
        payPerMonthAdvance,
        adjustmentPayment,
      };
    }

    return detailValues;
  };

  useEffect(() => {
    if (!loading && !paymentAction) {
      fetchPaymentLink();
    }

    if (paymentAction) {
      fetchPaymentLink();
    }

    async function fetchPaymentLink() {
      const { GET_PAYMENT_LINK } = URLS;
      try {
        const { data } = await axios.get(`${GET_PAYMENT_LINK}/${so}`);

        const auxCheckoutPayment = { ...data.checkout, sale: contractData.sale };

        console.log(data);

        setCheckoutPayment(auxCheckoutPayment);
        setProducts(contractData.products);
        setProcessURL(
          `${data.checkout.transaction.requestId}/${data.checkout.transaction.processUrl}`,
        );

        const inscription = valuesAdvanceSuscription({
          total: contractData.sale?.Grand_Total,
          checkoutPayment: data.checkout,
        });

        setAdvancePayment(inscription);

        const mergedData = {
          paymentLinkData: { ...data },
          ZohoData: { ...contractData },
          advanceSuscription: inscription,
        };

        const { currency } = getCurrency(data.checkout.country);
        setCurrencyOptions((prevState) => ({ ...prevState, currency }));

        setTicketData(mergedData);
        setFetchContent(false);

        const { totalMonths, formattedFirstPay, formattedPayPerMonth, formattedAmount } =
          handleCheckoutData(currencyOptions, auxCheckoutPayment, inscription);

        setInvoiceDetail({
          advancePayment,
          formattedFirstPay,
          formattedPayPerMonth,
          checkoutPayment,
          totalMonths,
          formattedAmount,
        });

        const regex = /(Rechazado|pending)/i;
      } catch (error) {
        fireModalAlert('Error', error.message);
      }
    }
  }, [contractData, paymentAction]);

  useEffect(() => {
    const makeFirstPayment = async (requestId) => {
      try {
        const res = await debitFirstPayment({ requestId });
        console.log({ res });
        fireToast('Cobro existoso', 'success');
        const paymentData = JSON.parse(res.data.updateRequestSession.paymentData);
        const street = paymentData.address.street;
        console.log(street);
        const data = {
          requestId: requestId.requestId,
          adjustment: 0,
          contractId: so,
          street,
        };
        const bodyZoho = makePostUpdateZohoPTP(data);
        updateZohoContract(bodyZoho);
      } catch (e) {
        console.log({ e });
        fireToast('Error al cobrar');
      }
    };

    if (ptpEffect) {
      setPtpEffect(false);
      window.P.on('response', function (response) {
        console.log({ response });
        const { status } = response.status;
        setStatusRequestPayment(status);

        if (status.includes('APPROVED')) {
          const { requestId } = response;

          const body = {
            requestId,
          };

          try {
            makeFirstPayment(body);
          } catch (error) {
            console.log(error);
          }

          return;
        }

        fireToast(`El estado de la sesion cambio a ${status}`, 'info');
      });
    }

    return () => {
      console.log({ P: window.P });
    };
  }, []);

  const totalPrice = products?.reduce((total, p) => total + Math.floor(p.price * p.quantity), 0);

  const handleInitPayment = async () => {
    window.P.init(`https://checkout-test.placetopay.ec/spa/session/${processURL}`);
  };

  return (
    <>
      {loading ? (
        <MotionSpinner />
      ) : (
        <main className='grid-checkout container'>
          <header className={`is-max-widescreen py-5`}>
            <nav
              className='navbar is-justify-content-center'
              role='navigation'
              aria-label='main navigation'
            >
              <div className='navbar-brand msk-logo'>
                <img src={logo} alt='MSK Logo' width='130' height='130' />
              </div>
            </nav>
          </header>
          <section className='container'>
            <div className='columns'>
              <div className='column'>
                <div className='card my-4'>
                  <div id='card' className='card-content has-text invoice-text'>
                    <h1 className='title is-1 title-type'>
                      {checkoutPayment?.type === 'Suscripción con anticipo'
                        ? 'Inscripción con anticipo'
                        : 'Finaliza tu inscripción'}
                    </h1>

                    {checkoutPayment?.type?.includes('Suscripción') ? (
                      <InvoiceDetail invoiceDetail={invoiceDetail} />
                    ) : (
                      <div>
                        <p>
                          {invoiceDetail?.totalMonths}{' '}
                          {checkoutPayment?.type === 'Tradicional' ? 'pago unico de' : 'pagos de'}
                        </p>
                        <h3 className='title is-3'>
                          {checkoutPayment?.type === 'Suscripción con anticipo'
                            ? formattedFirstPay
                            : invoiceDetail?.formattedAmount}
                        </h3>
                      </div>
                    )}
                  </div>
                  <hr className='is-divider-dashed' />
                  <div className='px-5 py-2 invoice-text'>
                    <h4 className='is-4 invoice-text mb-2'>Detalle de tu inscripci&oacute;n</h4>

                    {products?.map((p) => (
                      <div key={p.id} className='is-flex is-justify-content-space-between mb-2'>
                        <span className='item-deail-text'>
                          x{p.quantity} {p.name}
                        </span>
                        <span className='has-text-weight-bold item-deail-text'>
                          {new Intl.NumberFormat('MX', currencyOptions).format(Math.floor(p.price))}
                        </span>
                      </div>
                    ))}
                  </div>
                  <hr className='is-divider-dashed' />

                  <div className='px-5 py-2 invoice-text is-flex is-justify-content-end'>
                    <h4 className='is-4 invoice-text mb-2 mr-2'>Total</h4>
                    <span className='has-text-weight-bold item-deail-text'>
                      {new Intl.NumberFormat('MX', currencyOptions).format(totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
              <div className='column'>
                <div className='is-flex is-justify-content-center is-align-items-center invoice-text'>
                  <span>Pagos procesados con</span>
                  <img
                    src='https://static.placetopay.com/placetopay-logo.svg'
                    width='120px'
                    alt='Gateway'
                    className='ml-2'
                  />
                </div>
                <img
                  src={ptpImages.availableCards}
                  alt='Tarjeta aceptadas'
                  width='200px'
                  className='mt-3 mx-auto is-block'
                />
                {!isExpired ? (
                  <>
                    <div className='notification is-info my-5 mx-3'>
                      El tiempo para pagar la inscripcion fue superada,{' '}
                      <strong>solicite un nuevo link</strong> para continuar con el pago
                    </div>
                  </>
                ) : (
                  <PaymentElement
                    checkoutPayment={checkoutPayment}
                    handleInitPayment={handleInitPayment}
                  />
                )}

                <p className='invoice-text mt-5 mx-3 has-text-centered'>
                  Si tiene dudas o consultas puedes visitar nuestro
                  <a
                    href='https://ayuda.msklatam.com/'
                    target='_blank'
                    rel='noreferrer'
                    className='has-text-info'
                  >
                    {' '}
                    centro de ayuda{' '}
                  </a>
                  o ver las
                  <a
                    href='https://ayuda.msklatam.com/portal/es/kb/articles/placetopay'
                    target='_blank'
                    rel='noreferrer'
                    className='has-text-info'
                  >
                    {' '}
                    preguntas frecuentes{' '}
                  </a>
                </p>
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default CheckoutPTP;
