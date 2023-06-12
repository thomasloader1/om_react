import React, { useEffect, useState } from 'react'
import IMAGES from '../../../img/pasarelaCobros/share';
import { useLocation, useParams } from 'react-router';
import axios from 'axios';
import { fireToast, fireAlert, fireModalAlert, fireModalAlertRedirect } from '../Hooks/useSwal';
import { REBILL_CONF, URLS, getPlanPrice, mappingCheckoutFields } from '../Hooks/useRebill';
import { useContractZoho } from '../Hooks/useContractZoho';
import MotionSpinner from '../Spinner/MotionSpinner';
import mpImg from '../../../img/pasarelaCobros/metPago/mp.svg'
import stripeImg from '../../../img/pasarelaCobros/metPago/stripe.svg'
import { handleSetContractStatus, handleSuscriptionUpdate } from '../../../logic/rebill'

const { logo } = IMAGES

const Checkout = () => {
    const [checkoutPayment, setCheckoutPayment] = useState(null)
    const [products, setProducts] = useState(null)
    const [customer, setCustomer] = useState(null)
    const [sale, setSale] = useState(null)
    const [contact, setContact] = useState(null)
    const [ticketData, setTicketData] = useState({})
    const [advancePayment, setAdvancePayment] = useState({});

    const { so } = useParams();
    const { pathname } = useLocation();

    const needRunEffect = !pathname.includes('vp');
    const { loading, data: contractData } = useContractZoho(so, needRunEffect);

    const currencyOptions = {
        style: 'currency',
        currency: 'MXN',
    };

    const objectPostUpdateZoho = ({ isAdvanceSuscription, advanceSuscription, QUOTES, customer, payment, paymentLinkCustomer, checkout, sale, subscriptionId }) => {
        // //console.log('zohoupdate', {isAdvanceSuscription,advanceSuscription,QUOTES,customer,payment, paymentLinkCustomer,checkout});

        let postUpdateZoho; // Declarar la variable fuera del condicional
        // //console.log("step", { valor: userInfo.stepThree.value });
        //console.log("objectPostUpdateZoho: ", isAdvanceSuscription);
        if (isAdvanceSuscription) {
            // //console.log("no es anticipo");
            postUpdateZoho = {
                installments: QUOTES,
                email: customer.userEmail,
                amount: payment.amount,
                contractId: checkout.contract_entity_id,
                subscriptionId,
                installment_amount: payment.amount,
                address: paymentLinkCustomer.address,
                dni: paymentLinkCustomer.personalId,
                phone: paymentLinkCustomer.phone,
                fullname: customer.firstName + " " + customer.lastName,
                is_suscri: !checkout.type.includes('Tradicional'),
                is_advanceSuscription: checkout.type.includes('Suscripción con anticipo'),
            }
        } else {
            //console.log("es anticipo");
            postUpdateZoho = {
                installments: QUOTES,
                email: customer.userEmail,
                amount: sale.Grand_Total,
                contractId: checkout.contract_entity_id,
                subscriptionId,
                installment_amount: advanceSuscription.firstQuoteDiscount,//
                payPerMonthAdvance: advanceSuscription.payPerMonthAdvance,//
                address: paymentLinkCustomer.address,
                dni: paymentLinkCustomer.personalId,
                phone: paymentLinkCustomer.phone,
                fullname: customer.firstName + " " + customer.lastName,
                is_suscri: !checkout.type.includes('Tradicional'),
                is_advanceSuscription: checkout.type.includes('Suscripción con anticipo'),//
            }
            //no hace falta mandar el remainingAmountToPay,quotesAdvance
        }

        return postUpdateZoho;
    };

    const valuesAdvanceSuscription = ({ total, checkoutPayment }) => {
        const { quotes, type } = checkoutPayment;

        const isAdvanceSuscription = type.includes('Suscripción con anticipo');
        const quoteForMonth = Math.round(total / quotes);
        const remainingQuotes = quotes === 1 ? 1 : quotes - 1;

        const firstQuoteDiscount = Math.round(quoteForMonth / 2);
        const remainingAmountToPay = total - firstQuoteDiscount;
        const payPerMonthAdvance = Math.round(remainingAmountToPay / remainingQuotes);

        return {
            quoteForMonth,
            remainingQuotes,
            firstQuoteDiscount,
            remainingAmountToPay,
            payPerMonthAdvance,
            isAdvanceSuscription
        }
    };

    const handleCheckoutData = (checkoutPayment, advanceSuscription) => {

        const auxResume = {
            totalMonths: 0,
            firstPay: 0,
            payPerMonth: 0,
            formattedFirstPay: 0,
            formattedPayPerMonth: 0,
            isTraditional: checkoutPayment?.type?.includes('Tradicional')
        };

        console.log({ advanceSuscription, checkoutPayment })
        if (advanceSuscription.isAdvanceSuscription) {

            auxResume.totalMonths = Number(checkoutPayment?.quotes);
            auxResume.firstPay = advanceSuscription.firstQuoteDiscount;
            auxResume.payPerMonth = advanceSuscription.payPerMonthAdvance;
            auxResume.formattedFirstPay = new Intl.NumberFormat('MX', currencyOptions).format(auxResume.firstPay);
            auxResume.formattedPayPerMonth = new Intl.NumberFormat('MX', currencyOptions).format(auxResume.payPerMonth);
        } else {
            auxResume.totalMonths = auxResume.isTraditional ? 1 : Number(checkoutPayment?.quotes);
            auxResume.firstPay = auxResume.isTraditional ? sale?.Grand_Total : Math.round(sale?.Grand_Total / auxResume.totalMonths);
            auxResume.formattedAmount = new Intl.NumberFormat('MX', currencyOptions).format(auxResume.firstPay);
        }

        return auxResume;
    };

    //const advanceSuscription = valuesAdvanceSuscription({ total: sale?.Grand_Total, checkoutPayment });
    const { totalMonths, formattedFirstPay, formattedPayPerMonth } = handleCheckoutData(checkoutPayment, advancePayment);

    const isStripe = checkoutPayment?.gateway?.includes('Stripe')
    useEffect(() => {

        if (!loading) {
            async function fetchPaymentLink() {
                const { GET_PAYMENT_LINK } = URLS
                const { data } = await axios.get(`${GET_PAYMENT_LINK}/${so}`);
                setCheckoutPayment(data.checkout);
                setCustomer(data.customer);
                setSale(contractData.sale);
                setContact(contractData.contact);
                setProducts(contractData.products);

                const advanceSuscription = valuesAdvanceSuscription({ total: contractData.sale?.Grand_Total, checkoutPayment: data.checkout });
                //console.log("advanceSuscriptionData", advanceSuscription);
                setAdvancePayment(advanceSuscription);

                const mergedData = { paymentLinkData: { ...data }, ZohoData: { ...contractData }, advanceSuscription, isAdvanceSuscription: data.checkout.type.includes('Suscripción con anticipo') };
                setTicketData(mergedData);
                const regex = /(Rechazado|pending)/i;
                if (data.checkout.status.match(regex))
                    initRebill(mergedData);
            }
            fetchPaymentLink();
        }
        // //console.log({ checkoutPayment, sale, contact, customer })

    }, [contractData])

    function initRebill(paymentLink) {
        const { paymentLinkData, ZohoData, advanceSuscription } = paymentLink;
        const { checkout, customer: paymentLinkCustomer } = paymentLinkData;
        const { contact, sale } = ZohoData

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
        const formValues = { payment_method: checkout.gateway, advanceSuscription, quotes: checkout.quotes }

        const { id, quantity } = getPlanPrice(formValues, sale)
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
        // //console.log({checkout,UPDATE_CONTRACT,MP});


        const handleSuccessRebillSDKCheckout = (response) => {
            // //console.log("Response Generar Link: ", response);

            const { invoice, failedTransaction, pendingTransaction } = response

            if (failedTransaction != null) {
                const { payment } = failedTransaction.paidBags[0];
                const { errorMessage } = payment;
                handleSetContractStatus(payment, checkout.contract_entity_id);
                fireModalAlert("Error de pago", errorMessage, 'error')
                return
            }

            if (pendingTransaction !== null) {
                const { payment } = pendingTransaction.paidBags[0]
                const { customer } = pendingTransaction.buyer
                const dni = customer.personalIdNumber !== "" ? customer.personalIdNumber : contact.DNI

                const paymentData = { checkout, customer, sale, payment, dni }

                axios.post(URLS.PENDING_PAYMENT, { ...payment, type: checkout.type, contract_id: so, paymentData: JSON.stringify(paymentData) }).then(res => console.log({ res })).catch(err => console.log({ err }));
                handleSetContractStatus(payment, checkout.contract_entity_id);

                fireModalAlertRedirect("Pago pendiente", 'El pago se esta aun procesando, aguarde a la notificacion de email', payment);
                return
            }

            const { paidBags, buyer } = invoice
            const { payment, schedules } = paidBags[0]
            const { customer } = buyer
            const [subscriptionId] = schedules;
            //console.log("subscriptionId: ",subscriptionId);
            const QUOTES = checkout.quotes ? Number(checkout.quotes) : 1

            const isAdvanceSuscription = checkout.type.includes('Suscripción con anticipo')
            const advanceSuscription = valuesAdvanceSuscription({ total: contractData.sale?.Grand_Total, checkoutPayment: checkout });

            const dataForZoho = { isAdvanceSuscription, advanceSuscription, QUOTES, customer, payment, paymentLinkCustomer, checkout, sale, subscriptionId }

            const postUpdateZoho = objectPostUpdateZoho(dataForZoho);

            //console.log("advanceSuscription",advanceSuscription);
            if (advanceSuscription.isAdvanceSuscription) {
                handleSuscriptionUpdate(postUpdateZoho.subscriptionId, advanceSuscription)
            }

            const URL = checkout.gateway.includes('Stripe') ? UPDATE_CONTRACT : MP

            //console.log(`${URL}`, postUpdateZoho)
            axios.post(URL, postUpdateZoho).then((res) => {
                //console.log({ res });

                handleSetContractStatus(payment, checkout.contract_entity_id);
                //console.log("Pago Realizado");
                fireModalAlert("Pago Realizado", '', 'success');
                fireToast('Contrato actualizado', 'success', 5000);

            }).catch((err) => {
                //console.log({ err });
                //console.log("Pago Fallido");
                fireModalAlert('Pago Fallido', err);
                fireToast('Contrato no actualizado', 'error', 5000);

            })
        };

        RebillSDKCheckout.setCallbacks({
            onSuccess: (response) => {
                handleSuccessRebillSDKCheckout(response);
            },
            onError: (error) => {
                console.error(error)
            },
        });

        //Seteo metadata de la suscripcio
        RebillSDKCheckout.setMetadata({
            so_number: "x" + sale.SO_Number
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
                errored: {}
            },
            inputWrapper: {
                base: {
                    maxWidth: 'auto',
                    fontFamily: '"Inter"'
                }
            },
            errorText: {
                base: {
                }
            },
            button: {
                backgroundColor: "#E5E7EB;",
                borderRadius: "4px",
                color: "#374161",
            }
        });

        //Aplicar configuracion al DOM
        RebillSDKCheckout.setElements('rebill_elements');
    }

    //console.log(checkoutPayment)

    return (
        <>
            {loading ? <MotionSpinner /> : <main className='grid-checkout container'>
                <header className={`is-max-widescreen py-5`}>
                    <nav className="navbar is-justify-content-center" role="navigation" aria-label="main navigation">
                        <div className="navbar-brand msk-logo">

                            <img src={logo} alt="MSK Logo" width="130" height="130" />

                        </div>
                    </nav>
                </header>
                <section className="container">
                    <div className="columns">
                        <div className="column">
                            <div className="card my-4">
                                <div id='card' className="card-content has-text invoice-text">

                                    <h1 className="title is-1 title-type">{checkoutPayment?.type === "Suscripción con anticipo" ? "Inscripción con anticipo" : checkoutPayment?.type}</h1>

                                    {checkoutPayment?.type === "Suscripción con anticipo" ? (
                                        <div>
                                            <p className='mb-4'>Realiza el primer pago y, en los meses siguientes, completarás los pagos restantes.</p>

                                            <p className='item-deail-text mb-2'>{1} pago de:</p>
                                            <h3 className='title is-3 item-deail-text has-text-weight-bold'>{formattedFirstPay}</h3>
                                            <p className='invoice-text'>{advancePayment.remainingQuotes} pagos restantes de <span className='has-text-weight-bold'>{formattedPayPerMonth}</span></p>
                                        </div>
                                    ) : (
                                        <div>
                                            <p>{totalMonths} pagos de:</p>
                                            <h3 className='title is-3'>{formattedFirstPay}</h3>
                                        </div>
                                    )}

                                </div>
                                <hr className='is-divider-dashed' />
                                <div className="card-content invoice-text">
                                    <div className="is-flex is-justify-content-space-between mb-2">
                                        <div>
                                            <h4 className='is-4 invoice-text'>Detalle de la suscripcion</h4>
                                            {products?.map(p => <span key={p.id} className='item-deail-text'>x{p.quantity} {p.name}</span>)}
                                        </div>
                                        <div>
                                            <h4 className='is-4 invoice-text'>Total</h4>
                                            {products?.map(p => <p key={p.id} className='has-text-weight-bold item-deail-text'>{new Intl.NumberFormat('MX', currencyOptions).format(p.price)}</p>)}
                                        </div>

                                    </div>
                                    <div className="item-deail-text">

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="mx-auto is-fullheight">
                                {(checkoutPayment?.status === "Contrato Pendiente" || checkoutPayment?.status === "Contrato Efectivo") ?
                                    (
                                        <div className="mt-5 is-flex is-justify-content-center is-align-items-center">
                                            El estado de su pago es: <span className='price-one'>{checkoutPayment?.status}</span>
                                        </div>
                                    ) : (
                                        <div id="rebill_elements" class="mt-5 is-flex is-justify-content-center is-align-items-center"></div>
                                    )}
                            </div>

                            <div className='is-flex is-justify-content-center is-align-items-center invoice-text'>
                                <span >Pagos procesados con</span>
                                <img src={isStripe ? stripeImg : mpImg} alt="Gateway" className='ml-2' />
                            </div>


                        </div>
                    </div>
                    {/* <pre>{JSON.stringify(ticketData, null, 2)}</pre> */}
                </section>

            </main>}
        </>

    )
}

export default Checkout