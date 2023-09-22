import React, { useEffect, useState } from 'react';
import IMAGES from '../../../img/pasarelaCobros/share';
import { useLocation, useParams } from 'react-router';
import axios from 'axios';
import { fireToast, fireModalAlert, fireModalAlertRedirect } from '../Hooks/useSwal';
import { URLS, debitFirstPayment, updateZohoContract } from '../../../logic/ptp';
import { useContractZoho } from '../Hooks/useContractZoho';
import MotionSpinner from '../Spinner/MotionSpinner';
import { getCurrency } from '../../../logic/rebill';
import InvoiceDetail from './InvoiceDetail';
import { makePostUpdateZohoCheckout, makePostUpdateZohoPTP } from '../../../logic/zoho';

const { logo } = IMAGES;

const CheckoutPTP = () => {
  const [checkoutPayment, setCheckoutPayment] = useState(null);
  const [processURL, setProcessURL] = useState(null);

  const [products, setProducts] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [sale, setSale] = useState(null);
  const [contact, setContact] = useState(null);
  const [ticketData, setTicketData] = useState({});
  const [advancePayment, setAdvancePayment] = useState({});
  const [paymentAction, setPaymentAction] = useState(false);
  const [fetchContent, setFetchContent] = useState(true);
  const [currencyOptions, setCurrencyOptions] = useState({
    style: 'currency',
    currency: 'USD',
  });
  const [statusRequestPayment, setStatusRequestPayment] = useState('');
  const [ptpEffect, setPtpEffect] = useState(true);

  const { so } = useParams();
  const { pathname } = useLocation();

  const needRunEffect = !pathname.includes('vp');
  const { loading, data: contractData } = useContractZoho(so, needRunEffect);

  const formatPrice = (iso, currencyOptions, price) =>
    new Intl.NumberFormat(iso, currencyOptions).format(Math.floor(price));

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

  const handleCheckoutData = (checkoutPayment, advanceSuscription) => {
    const { isAdvanceSuscription, isSuscription, isTraditional, info } = advanceSuscription;

    const auxResume = {
      totalMonths: 0,
      firstPay: 0,
      payPerMonth: 0,
      formattedFirstPay: 0,
      formattedPayPerMonth: 0,
      isTraditional,
      isAdvanceSuscription,
      isSuscription,
    };

    console.group('handleCheckoutData');
    console.log({ advanceSuscription, checkoutPayment, auxResume });
    console.groupEnd();

    if (auxResume.isAdvanceSuscription) {
      auxResume.totalMonths = Number(checkoutPayment?.quotes);
      auxResume.firstPay = info.firstQuoteDiscount;
      auxResume.payPerMonth = info.payPerMonthAdvance;

      auxResume.formattedFirstPay = formatPrice('US', currencyOptions, auxResume.firstPay);
      auxResume.formattedPayPerMonth = formatPrice('US', currencyOptions, auxResume.payPerMonth);
    } else if (auxResume.isSuscription) {
      auxResume.totalMonths = Number(checkoutPayment?.quotes);
      auxResume.firstPay = Math.floor(sale?.Grand_Total / auxResume.totalMonths);

      auxResume.formattedAmount = formatPrice('US', currencyOptions, auxResume.firstPay);
      auxResume.formattedFirstPay = formatPrice('US', currencyOptions, auxResume.firstPay);
      auxResume.formattedPayPerMonth = formatPrice('US', currencyOptions, auxResume.firstPay);
    } else {
      auxResume.totalMonths = 1;
      auxResume.firstPay = sale?.Grand_Total;

      auxResume.formattedAmount = formatPrice('US', currencyOptions, auxResume.firstPay);
      auxResume.formattedFirstPay = formatPrice('US', currencyOptions, auxResume.firstPay);
      auxResume.formattedPayPerMonth = formatPrice('US', currencyOptions, auxResume.firstPay);
    }

    return auxResume;
  };

  const { totalMonths, formattedFirstPay, formattedPayPerMonth, formattedAmount } =
    handleCheckoutData(checkoutPayment, advancePayment);

  useEffect(() => {
    if (!loading && !paymentAction) {
      fetchPaymentLink();
    }

    if (paymentAction) {
      fetchPaymentLink();
    }

    async function fetchPaymentLink() {
      const { GET_PAYMENT_LINK } = URLS;
      const { data } = await axios.get(`${GET_PAYMENT_LINK}/${so}`);

      setCheckoutPayment(data.checkout);
      setCustomer(data.payer);
      setSale(contractData.sale);
      setContact(contractData.contact);
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

      const regex = /(Rechazado|pending)/i;
    }
  }, [contractData, paymentAction]);

  useEffect(() => {
    const makeFirstPayment = async (requestId) => {
      try {
        const res = await debitFirstPayment({ requestId });
        console.log({ res });
        fireToast('Cobro existoso', 'success');
        const data = {
          requestId,
          adjustment: 0,
          contractId: so,
          //street: values.address,
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
            street: '-',
          };

          try {
            makeFirstPayment(body);
          } catch (error) {}

          return;
        }

        fireToast(`El estado de la sesion cambio a ${status}`, 'info');
      });
    }

    return () => {
      console.log({ P: window.P });
    };
  }, []);

  const invoiceDetail = {
    advancePayment,
    formattedFirstPay,
    formattedPayPerMonth,
    checkoutPayment,
  };

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

                    {checkoutPayment?.type.includes('Suscripción') ? (
                      <InvoiceDetail invoiceDetail={invoiceDetail} />
                    ) : (
                      <div>
                        <p>
                          {totalMonths}{' '}
                          {checkoutPayment?.type === 'Tradicional' ? 'pago unico de' : 'pagos de'}
                        </p>
                        <h3 className='title is-3'>
                          {checkoutPayment?.type === 'Suscripción con anticipo'
                            ? formattedFirstPay
                            : formattedAmount}
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
                <div className='mx-auto is-fullheight'>
                  {checkoutPayment?.status.includes('Pendiente') ||
                  checkoutPayment?.status.includes('Efectivo') ? (
                    <div className='mt-5 is-flex is-justify-content-center is-align-items-center'>
                      El estado de su pago es:{' '}
                      <span className='price-one'>{checkoutPayment?.status}</span>
                    </div>
                  ) : (
                    <div className='my-5 is-flex is-justify-content-center is-align-items-center'>
                      <button
                        id='ptpPayNow'
                        className='button is-success'
                        onClick={handleInitPayment}
                      >
                        Iniciar Pago
                      </button>
                    </div>
                  )}
                </div>

                <div className='is-flex is-justify-content-center is-align-items-center invoice-text'>
                  <span>Pagos procesados con</span>
                  <img
                    src='https://static.placetopay.com/placetopay-logo.svg'
                    width='120px'
                    alt='Gateway'
                    className='ml-2'
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default CheckoutPTP;
