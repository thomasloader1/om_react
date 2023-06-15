import React, { useEffect, useState } from 'react';
import IMAGES from '../../../img/pasarelaCobros/share';
import { useLocation, useParams } from 'react-router';
import axios from 'axios';
import { fireToast, fireAlert, fireModalAlert, fireModalAlertRedirect } from '../Hooks/useSwal';
import { REBILL_CONF, URLS, getPlanPrice, mappingCheckoutFields } from '../Hooks/useRebill';
import { useContractZoho } from '../Hooks/useContractZoho';
import MotionSpinner from '../Spinner/MotionSpinner';
import mpImg from '../../../img/pasarelaCobros/metPago/mp.svg';
import stripeImg from '../../../img/pasarelaCobros/metPago/stripe.svg';
import { handleSetContractStatus, handleSuscriptionUpdate } from '../../../logic/rebill';
import InvoiceDetail from './InvoiceDetail';
import { makePostUpdateZohoCheckout } from '../../../logic/zoho';

const { logo } = IMAGES;

const Checkout = () => {
  const [checkoutPayment, setCheckoutPayment] = useState(null);
  const [products, setProducts] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [sale, setSale] = useState(null);
  const [contact, setContact] = useState(null);
  const [ticketData, setTicketData] = useState({});
  const [advancePayment, setAdvancePayment] = useState({});

  const { so } = useParams();
  const { pathname } = useLocation();

  const needRunEffect = !pathname.includes('vp');
  const { loading, data: contractData } = useContractZoho(so, needRunEffect);

  const currencyOptions = {
    style: 'currency',
    currency: 'MXN',
  };

  const valuesAdvanceSuscription = ({ total, checkoutPayment }) => {
    const { quotes, type } = checkoutPayment;

    const isAdvanceSuscription = type.includes('Suscripción con anticipo');
    const quoteForMonth = Math.floor(total / quotes);
    const remainingQuotes = quotes === 1 ? 1 : quotes - 1;

    const firstQuoteDiscount = Math.floor(quoteForMonth / 2);
    const remainingAmountToPay = total - firstQuoteDiscount;
    const payPerMonthAdvance = Math.floor(remainingAmountToPay / remainingQuotes);
    const adjustmentPayment =
      total - (payPerMonthAdvance * remainingAmountToPay + firstQuoteDiscount);

    return {
      quoteForMonth,
      remainingQuotes,
      firstQuoteDiscount,
      remainingAmountToPay,
      payPerMonthAdvance,
      isAdvanceSuscription,
      adjustmentPayment,
    };
  };

  const handleCheckoutData = (checkoutPayment, advanceSuscription) => {
    const auxResume = {
      totalMonths: 0,
      firstPay: 0,
      payPerMonth: 0,
      formattedFirstPay: 0,
      formattedPayPerMonth: 0,
      isTraditional: checkoutPayment?.type?.includes('Tradicional'),
    };

    console.log({ advanceSuscription, checkoutPayment });
    if (advanceSuscription.isAdvanceSuscription) {
      auxResume.totalMonths = Number(checkoutPayment?.quotes);
      auxResume.firstPay = advanceSuscription.firstQuoteDiscount;
      auxResume.payPerMonth = advanceSuscription.payPerMonthAdvance;
      auxResume.formattedFirstPay = new Intl.NumberFormat('MX', currencyOptions).format(
        auxResume.firstPay,
      );
      auxResume.formattedPayPerMonth = new Intl.NumberFormat('MX', currencyOptions).format(
        auxResume.payPerMonth,
      );
    } else {
      auxResume.totalMonths = auxResume.isTraditional ? 1 : Number(checkoutPayment?.quotes);
      auxResume.firstPay = auxResume.isTraditional
        ? sale?.Grand_Total
        : Math.floor(sale?.Grand_Total / auxResume.totalMonths);
      auxResume.formattedAmount = new Intl.NumberFormat('MX', currencyOptions).format(
        Math.floor(auxResume.firstPay),
      );

      auxResume.formattedFirstPay = new Intl.NumberFormat('MX', currencyOptions).format(
        Math.floor(auxResume.firstPay),
      );
      auxResume.formattedPayPerMonth = new Intl.NumberFormat('MX', currencyOptions).format(
        Math.floor(auxResume.firstPay),
      );
    }

    return auxResume;
  };

  const { totalMonths, formattedFirstPay, formattedPayPerMonth, formattedAmount } =
    handleCheckoutData(checkoutPayment, advancePayment);

  const isStripe = checkoutPayment?.gateway?.includes('Stripe');

  useEffect(() => {
    if (!loading) {
      async function fetchPaymentLink() {
        const { GET_PAYMENT_LINK } = URLS;
        const { data } = await axios.get(`${GET_PAYMENT_LINK}/${so}`);

        setCheckoutPayment(data.checkout);
        setCustomer(data.customer);
        setSale(contractData.sale);
        setContact(contractData.contact);
        setProducts(contractData.products);

        const advanceSuscription = valuesAdvanceSuscription({
          total: contractData.sale?.Grand_Total,
          checkoutPayment: data.checkout,
        });

        setAdvancePayment(advanceSuscription);

        const mergedData = {
          paymentLinkData: { ...data },
          ZohoData: { ...contractData },
          advanceSuscription,
          isAdvanceSuscription: data.checkout.type.includes('Suscripción con anticipo'),
        };

        setTicketData(mergedData);

        const regex = /(Rechazado|pending)/i;
        if (data.checkout.status.match(regex)) initRebill(mergedData);
      }
      fetchPaymentLink();
    }
  }, [contractData]);

  function initRebill(paymentLink) {
    const { paymentLinkData, ZohoData, advanceSuscription } = paymentLink;
    const { checkout, customer: paymentLinkCustomer } = paymentLinkData;
    const { contact, sale } = ZohoData;

    const initialization = {
      organization_id: REBILL_CONF.ORG_ID,
      api_key: REBILL_CONF.API_KEY,
      api_url: REBILL_CONF.URL,
    };

    const RebillSDKCheckout = new window.Rebill.PhantomSDK(initialization);

    const customerRebill = mappingCheckoutFields({ paymentLinkCustomer, contact, checkout });
    //console.log({ customerRebill })
    //Seteo de customer
    RebillSDKCheckout.setCustomer(customerRebill);

    //Seteo de identidicacion del customer
    RebillSDKCheckout.setCardHolder({
      name: contact.Full_Name,
      identification: {
        type: 'DNI',
        value: paymentLinkCustomer.personalId,
      },
    });

    //Seteo de plan para cobrar
    const formValues = {
      payment_method: checkout.gateway,
      advanceSuscription,
      quotes: checkout.quotes,
    };

    const { id, quantity } = getPlanPrice(formValues, sale);
    RebillSDKCheckout.setTransaction({
      prices: [
        {
          id,
          quantity,
        },
      ],
    }).then((price_setting) => console.log(price_setting));

    //Seteo de callbacks en saco de que el pago este correcto o tengo algun fallo
    const { UPDATE_CONTRACT, MP } = URLS;

    RebillSDKCheckout.setCallbacks({
      onSuccess: (response) => {
        const { invoice, failedTransaction, pendingTransaction } = response;

        if (failedTransaction != null) {
          const { payment } = failedTransaction.paidBags[0];
          const { errorMessage } = payment;
          handleSetContractStatus(payment, checkout.contract_entity_id);
          fireModalAlert('Error de pago', errorMessage, 'error');
          return;
        }

        if (pendingTransaction !== null) {
          const { payment } = pendingTransaction.paidBags[0];
          const { customer } = pendingTransaction.buyer;
          const dni = customer.personalIdNumber !== '' ? customer.personalIdNumber : contact.DNI;

          const paymentData = { checkout, customer, sale, payment, dni };

          axios
            .post(URLS.PENDING_PAYMENT, {
              ...payment,
              type: checkout.type,
              contract_id: so,
              paymentData: JSON.stringify(paymentData),
            })
            .then((res) => console.log({ res }))
            .catch((err) => console.log({ err }));
          handleSetContractStatus(payment, checkout.contract_entity_id);

          fireModalAlertRedirect(
            'Pago pendiente',
            'El pago se esta aun procesando, aguarde a la notificacion de email',
            payment,
          );
          return;
        }

        fireModalAlert('Pago Realizado', '', 'success', 5000);
        //fireAlert('Pago Realizado', 'asdasd', 'success', 5000);

        const { paidBags, buyer } = invoice;
        const { payment, schedules } = paidBags[0];
        const { customer } = buyer;
        const [subscriptionId] = schedules;
        //console.log("subscriptionId: ",subscriptionId);
        const QUOTES = checkout.quotes ? Number(checkout.quotes) : 1;

        const isAdvanceSuscription = checkout.type.includes('Suscripción con anticipo');
        const advanceSuscription = valuesAdvanceSuscription({
          total: contractData.sale?.Grand_Total,
          checkoutPayment: checkout,
        });

        const dataForZoho = {
          isAdvanceSuscription,
          advanceSuscription,
          QUOTES,
          customer,
          payment,
          paymentLinkCustomer,
          checkout,
          sale,
          subscriptionId,
        };

        const postUpdateZoho = makePostUpdateZohoCheckout(dataForZoho);

        //console.log("advanceSuscription",advanceSuscription);
        if (advanceSuscription.isAdvanceSuscription) {
          handleSuscriptionUpdate(postUpdateZoho.subscriptionId, advanceSuscription);
        }

        const URL = checkout.gateway.includes('Stripe') ? UPDATE_CONTRACT : MP;

        axios
          .post(URL, postUpdateZoho)
          .then((res) => {
            console.log({ res });

            handleSetContractStatus(payment, checkout.contract_entity_id);
            //console.log("Pago Realizado");
            fireToast('Inscripción actualizada', 'success', 5000);
          })
          .catch((err) => {
            console.log({ err });
            fireToast('Inscripción no actualizado', 'error', 5000);
          });
      },
      onError: (error) => {
        console.error(error);
        fireModalAlert('Pago Fallido', error);
      },
    });

    //Seteo metadata de la suscripcio
    RebillSDKCheckout.setMetadata({
      so_number: 'x' + sale.SO_Number,
    });

    //Textos de validaciones con el elemento de la tarjeta
    RebillSDKCheckout.setText({
      card_number: 'Numero de tarjeta',
      pay_button: 'Pagar',
      error_messages: {
        emptyCardNumber: 'Ingresa el numero de la tarjeta',
        invalidCardNumber: 'El numero de la tarjeta es invalido',
        emptyExpiryDate: 'Enter an expiry date',
        monthOutOfRange: 'Expiry month must be between 01 and 12',
        yearOutOfRange: 'Expiry year cannot be in the past',
        dateOutOfRange: 'Expiry date cannot be in the past',
        invalidExpiryDate: 'Expiry date is invalid',
        emptyCVC: 'Enter a CVC',
        invalidCVC: 'CVC is invalid',
      },
    });

    RebillSDKCheckout.setStyles({
      fieldWrapper: {
        base: {
          maxWidth: 'auto',
          height: 'auto',
        },
        errored: {},
      },
      inputWrapper: {
        base: {
          maxWidth: 'auto',
          fontFamily: '"Inter"',
        },
      },
      errorText: {
        base: {},
      },
      button: {
        backgroundColor: '#E5E7EB;',
        borderRadius: '4px',
        color: '#374161',
      },
    });

    //Aplicar configuracion al DOM
    RebillSDKCheckout.setElements('rebill_elements');
  }

  const invoiceDetail = {
    advancePayment,
    formattedFirstPay,
    formattedPayPerMonth,
    checkoutPayment,
  };

  const totalPrice = products?.reduce((total, p) => total + Math.floor(p.price * p.quantity), 0);

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
                    <div
                      id='rebill_elements'
                      className={`mt-5 is-flex is-justify-content-center is-align-items-center ${
                        checkoutPayment?.status.includes('Pendiente') ||
                        (checkoutPayment?.status.includes('Efectivo') && 'is-hidden')
                      }`}
                    ></div>
                  )}
                </div>

                <div className='is-flex is-justify-content-center is-align-items-center invoice-text'>
                  <span>Pagos procesados con</span>
                  <img src={isStripe ? stripeImg : mpImg} alt='Gateway' className='ml-2' />
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default Checkout;
