import React, { useEffect, useState } from 'react'
import IMAGES from '../../../img/pasarelaCobros/share';
import { useLocation, useParams } from 'react-router';
import axios from 'axios';
import { fireToast, fireAlert, fireModalAlert } from '../Hooks/useSwal';
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

    const objectPostUpdateZoho = ({ isAdvanceSuscription, advanceSuscription, QUOTES, customer, payment, paymentLinkCustomer, checkout, sale }) => {
        // console.log('zohoupdate', {isAdvanceSuscription,advanceSuscription,QUOTES,customer,payment, paymentLinkCustomer,checkout});

        let postUpdateZoho; // Declarar la variable fuera del condicional
        // console.log("step", { valor: userInfo.stepThree.value });
        console.log("objectPostUpdateZoho: ", isAdvanceSuscription);
        if (isAdvanceSuscription) {
            // console.log("no es anticipo");
            postUpdateZoho = {
                installments: QUOTES,
                email: customer.userEmail,
                amount: payment.amount,
                contractId: checkout.contract_entity_id,
                subscriptionId: payment.id,
                installment_amount: payment.amount,
                address: paymentLinkCustomer.address,
                dni: paymentLinkCustomer.personalId,
                phone: paymentLinkCustomer.phone,
                fullname: customer.firstName + " " + customer.lastName,
                is_suscri: !checkout.type.includes('Tradicional'),
                is_advanceSuscription: checkout.type.includes('Suscripción con anticipo'),
            }
        } else {
            console.log("es anticipo");
            postUpdateZoho = {
                installments: QUOTES,
                email: customer.userEmail,
                amount: sale.Grand_Total,
                contractId: checkout.contract_entity_id,
                subscriptionId: payment.id,
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
            payPerMonth: 0,
            formattedAmount: 0,
            isTraditional: checkoutPayment?.type?.includes('Tradicional')
        };

        if (advanceSuscription.isAdvanceSuscription) {

            auxResume.totalMonths = Number(checkoutPayment?.quotes);
            auxResume.payPerMonth = advanceSuscription.firstQuoteDiscount;
            auxResume.formattedAmount = new Intl.NumberFormat('MX', currencyOptions).format(auxResume.payPerMonth);
        } else {
            auxResume.totalMonths = auxResume.isTraditional ? 1 : Number(checkoutPayment?.quotes);
            auxResume.payPerMonth = auxResume.isTraditional ? sale?.Grand_Total : Math.round(sale?.Grand_Total / auxResume.totalMonths);
            auxResume.formattedAmount = new Intl.NumberFormat('MX', currencyOptions).format(auxResume.payPerMonth);
        }

        return auxResume;
    };

    //const advanceSuscription = valuesAdvanceSuscription({ total: sale?.Grand_Total, checkoutPayment });
    const { totalMonths, payPerMonth, formattedAmount, isTraditional } = handleCheckoutData(checkoutPayment, advancePayment);

    const isStripe = checkoutPayment?.gateway?.includes('Stripe')
    useEffect(() => {

        if (!loading) {
            async function fetchPaymentLink() {
                const { GET_PAYMENT_LINK } = URLS
                const { data } = await axios.get(`${GET_PAYMENT_LINK}/${so}`);
                //console.log("useEffect-> rebill get paymentlink", { data, contractData });
                setCheckoutPayment(data.checkout);
                setCustomer(data.customer);
                setSale(contractData.sale);
                setContact(contractData.contact);
                setProducts(contractData.products);

                const advanceSuscription = valuesAdvanceSuscription({ total: contractData.sale?.Grand_Total, checkoutPayment: data.checkout });
                console.log("advanceSuscriptionData", advanceSuscription);
                setAdvancePayment(advanceSuscription);

                const mergedData = { paymentLinkData: { ...data }, ZohoData: { ...contractData }, advanceSuscription, isAdvanceSuscription: data.checkout.type.includes('Suscripción con anticipo') };
                setTicketData(mergedData);

                initRebill(mergedData);
            }
            fetchPaymentLink();
        }
        // console.log({ checkoutPayment, sale, contact, customer })

    }, [contractData])

    function initRebill(paymentLink) {
        const { paymentLinkData, ZohoData, advanceSuscription } = paymentLink;
        const { checkout, customer: paymentLinkCustomer } = paymentLinkData;
        const { contact, sale } = ZohoData
        console.log("Aca te dice si es anticipo: ", checkoutPayment?.type.includes('Suscripción con anticipo'));
        const initialization = {
            organization_id: REBILL_CONF.ORG_ID,
            api_key: REBILL_CONF.API_KEY,
            api_url: REBILL_CONF.URL,
        };

        const RebillSDKCheckout = new window.Rebill.PhantomSDK(initialization);

        const customerRebill = mappingCheckoutFields({ paymentLinkCustomer, contact, checkout });
        console.log({ customerRebill })
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
        // console.log({checkout,UPDATE_CONTRACT,MP});


        const handleSuccessRebillSDKCheckout = (response) => {
            // console.log("Response Generar Link: ", response);

            const { invoice, failedTransaction, pendingTransaction } = response

            if (failedTransaction != null) {
                const { payment } = failedTransaction.paidBags[0];
                const { errorMessage } = payment;
                handleSetContractStatus(payment, checkout.contract_entity_id);
                throw new Error(`${errorMessage}`);
            }

            if (pendingTransaction !== null) {
                console.log({ pendingTransaction })
                const { payment } = pendingTransaction.paidBags[0];
                handleSetContractStatus(payment, checkout.contract_entity_id);
                throw new Error(`El pago quedo en un estado pendiente`);
            }

            const { paidBags, buyer } = invoice
            const { payment } = paidBags[0]
            const { customer } = buyer

            const QUOTES = checkout.quotes ? Number(checkout.quotes) : 1

            // const advanceSuscription = valuesAdvanceSuscription({ total: sale?.Grand_Total, quotes: checkoutPayment?.quotes });
            const isAdvanceSuscription = checkout.type.includes('Suscripción con anticipo')
            const dataForZoho = { isAdvanceSuscription, advanceSuscription: null, QUOTES, customer, payment, paymentLinkCustomer, checkout, sale }

            const postUpdateZoho = objectPostUpdateZoho(dataForZoho);

            if (advancePayment.isAdvanceSuscription) {
                handleSuscriptionUpdate(postUpdateZoho.subscriptionId, { advanceSuscription: advancePayment })
            }

            const URL = checkout.gateway.includes('Stripe') ? UPDATE_CONTRACT : MP

            console.log(`${URL}`, postUpdateZoho)
            axios.post(URL, postUpdateZoho).then((res) => {
                console.log({ res });

                handleSetContractStatus(payment, checkout.contract_entity_id);
                console.log("Pago Realizado");
                fireModalAlert("Pago Realizado", '', 'success');
                fireToast('Contrato actualizado', 'success', 5000);

            }).catch((err) => {
                console.log({ err });
                console.log("Pago Fallido");
                fireModalAlert('Pago Fallido', err);
                fireToast('Contrato no actualizado', 'error', 5000);

            })
        };

        RebillSDKCheckout.setCallbacks({
            onSuccess: (response) => {
                try {
                    handleSuccessRebillSDKCheckout(response);
                } catch (error) {
                    console.error({ error })
                }
            },
            onError: (error) => {
                console.error(error)
            },
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
                    height: 'auto'
                },
                errored: {}
            },
            inputWrapper: {
                base: {
                    maxWidth: 'auto'
                }
            },
            errorText: {
                base: {}
            }
        });

        //Aplicar configuracion al DOM
        RebillSDKCheckout.setElements('rebill_elements');
    }


    return (
        <>
            {loading ? <MotionSpinner /> : <main className='grid-checkout container'>
                <header className={`is-max-widescreen py-5`}>
                    <nav className="navbar is-justify-content-space-between" role="navigation" aria-label="main navigation">
                        <div className="navbar-brand">
                            <a className="navbar-item">
                                <img src={logo} alt="MSK Logo" width="130" height="80" />
                            </a>
                        </div>
                        <div className="nav-item">
                            <p className='my-auto ml-auto pr-4'>Pagos procesados con <img src={isStripe ? stripeImg : mpImg} alt="" className='is-block mt-2 mx-auto' /></p>
                        </div>
                    </nav>
                </header>
                <section className="container">
                    <div className="columns">
                        <div className="column">
                            <div className="card my-4">
                                <div className="card-content has-text-centered">

                                    <h1 className="title is-1  has-text-weight-bold">{checkoutPayment?.type}</h1>

                                    {checkoutPayment?.type === "Suscripción con anticipo" ? (
                                        <div>
                                            <p>{1} pago de:</p>
                                            <h3 className='title is-3'>{formattedAmount}</h3>
                                            <p>{advancePayment.remainingQuotes} pagos restantes de:</p>
                                            <h3 className='title is-3'> {advancePayment.payPerMonthAdvance}</h3>
                                        </div>
                                    ) : (
                                        <div>
                                            <p>{totalMonths} pagos de:</p>
                                            <h3 className='title is-3'>{formattedAmount}</h3>
                                        </div>
                                    )}

                                </div>
                                <hr className='is-divider' />
                                <div className="card-content">
                                    <h3 className='is-4 has-text-weight-bold'>Detalle de la suscripcion</h3>
                                    <ul>
                                        {products?.map(p => <li key={p.id}>x{p.quantity} {p.name} {p.price}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="mx-auto p-4 is-fullheight">
                                <div id="rebill_elements" class="mt-5 is-flex is-justify-content-center is-align-items-center"></div>
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