import React, { useEffect, useState } from 'react'
import IMAGES from '../../../img/pasarelaCobros/share';
import { useLocation, useParams } from 'react-router';
import axios from 'axios';
import { fireToast, fireAlert } from '../Hooks/useSwal';
import { URLS, getPlanPrice, mappingCheckoutFields } from '../Hooks/useRebill';
import { useContractZoho } from '../Hooks/useContractZoho';
import MotionSpinner from '../Spinner/MotionSpinner';
import mpImg from '../../../img/pasarelaCobros/metPago/mp.svg'
import stripeImg from '../../../img/pasarelaCobros/metPago/stripe.svg'
const { logo } = IMAGES

const Checkout = () => {
    const [checkoutPayment, setCheckoutPayment] = useState(null)
    const [products, setProducts] = useState(null)
    const [customer, setCustomer] = useState(null)
    const [sale, setSale] = useState(null)
    const [contact, setContact] = useState(null)
    const [ticketData, setTicketData] = useState({})

    const { so } = useParams();
    const { pathname } = useLocation();

    const needRunEffect = !pathname.includes('vp');
    const { loading, data: contractData } = useContractZoho(so, needRunEffect);

    const currencyOptions = {
        style: 'currency',
        currency: 'MXN',
    };
    const objectPostUpdateZoho = ({ isAdvanceSuscription,advanceSuscription,QUOTES,customer,payment, paymentLinkCustomer,checkout }) => {
        // console.log('zohoupdate', {isAdvanceSuscription,advanceSuscription,QUOTES,customer,payment, paymentLinkCustomer,checkout});

        let postUpdateZoho; // Declarar la variable fuera del condicional
        // console.log("step", { valor: userInfo.stepThree.value });
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
                is_suscri: checkout.type.includes('Tradicional'),
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
                is_suscri: checkout.type.includes('Tradicional'),
                is_advanceSuscription: checkout.type.includes('Suscripción con anticipo'),//
            }
            //no hace falta mandar el remainingAmountToPay,quotesAdvance
        }

        return postUpdateZoho;
    };
    const valuesAdvanceSuscription = ({total,quotes}) => {

        const quoteForMonth = Math.round(total / quotes);
        const remainingQuotes = quotes === 1 ? 1 : quotes-1;
        
        const firstQuoteDiscount = Math.round(quoteForMonth / 2);
        const remainingAmountToPay = total - firstQuoteDiscount;
        const payPerMonthAdvance = Math.round(remainingAmountToPay / remainingQuotes);

        return {
            quoteForMonth,remainingQuotes,firstQuoteDiscount,remainingAmountToPay,payPerMonthAdvance 
        }
    };

    const isAdvanceSuscription = checkoutPayment?.type.includes('Suscripción con anticipo');
    const isTraditional = checkoutPayment?.type?.includes('Tradicional');
    
    const advanceSuscription = valuesAdvanceSuscription({total: sale?.Grand_Total,quotes: checkoutPayment?.quotes});
    // console.log("datos de suscription con anticipo", advanceSuscription);

    const totalMonths = isTraditional ? 1 : Number(checkoutPayment?.quotes);
    const payPerMonth = isTraditional ?
        sale?.Grand_Total : Math.round(sale?.Grand_Total / totalMonths);
    const formattedAmount = new Intl.NumberFormat('MX', currencyOptions).format(payPerMonth);

    const isStripe = checkoutPayment?.gateway?.includes('Stripe')
    useEffect(() => {

        if (!loading) {
            async function fetchPaymentLink() {
                const { data } = await axios.get(`/api/rebill/getPaymentLink/${so}`);
                // console.log("useEffect-> rebill get paymentlink", { data, contractData });
                setCheckoutPayment(data.checkout)
                setCustomer(data.customer)
                setSale(contractData.sale)
                setContact(contractData.contact)
                setProducts(contractData.products)
                const mergedData = { paymentLinkData: { ...data }, ZohoData: { ...contractData } }
                setTicketData(mergedData)

                initRebill(mergedData,isAdvanceSuscription)
            }
            fetchPaymentLink()
        }
        // console.log({ checkoutPayment, sale, contact, customer })

    }, [contractData])

    function initRebill(paymentLink) {
        const { paymentLinkData, ZohoData } = paymentLink;
        const { checkout, customer: paymentLinkCustomer } = paymentLinkData;
        const { contact, sale } = ZohoData
        console.log("Aca te dice si es anticipo: ", checkoutPayment?.type.includes('Suscripción con anticipo'));
        const initialization = {
            organization_id: '679d8e12-e0ad-4052-bc9e-eb78f956ce7e' /* your organization ID */,
            api_key: 'bc7d4abf-3a94-4f53-b414-887356b51e0c' /* your API_KEY */,
            api_url: 'https://api.rebill.to/v2' /* Rebill API target */,
        };

        const RebillSDKCheckout = new window.Rebill.PhantomSDK(initialization);
        // console.log("Estamos con RebillSDKCheckout: ",RebillSDKCheckout);
        // console.log({ paymentLinkCustomer })
        const customerRebill = mappingCheckoutFields({ paymentLinkCustomer, contact, checkout });
        // console.log({ customerRebill })
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
        const formValues = { payment_method: checkout.gateway, advanceSuscription: {}, quotes: checkout.quotes }
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

        const handleSuccessRebillSDKCheckout = (response, isAdvanceSuscription) => {
            console.log("Response Generar Link: ", response);

            const { invoice, faliedTransaction, pendingTransaction } = response
             
            if (faliedTransaction != null) {
                const { errorMessage } = faliedTransaction.paidBags[0].payment;
                throw new Error(`${errorMessage}`);
            } else {
                // setRebillFetching({ loading: false, ...response });
                // setOpenBlockLayer(true);
            }
            
            const { paidBags, buyer } = invoice
            const { payment } = paidBags[0]
            const { customer } = buyer
            // console.log('response contacto 2:',{ response2: customer });

            const QUOTES = checkout.quotes ? Number(checkout.quotes) : 1
            console.log("sale: ", sale);
            const advanceSuscription = valuesAdvanceSuscription({total: sale?.Grand_Total,quotes: checkoutPayment?.quotes});
            const postUpdateZohoStripe = objectPostUpdateZoho({isAdvanceSuscription,advanceSuscription,QUOTES,customer,payment, paymentLinkCustomer,checkout });

            // const postUpdateZohoStripe = {
            //     installments: QUOTES,
            //     email: customer.userEmail,
            //     amount: payment.amount,
            //     contractId: checkout.contract_entity_id,
            //     subscriptionId: payment.id,
            //     installment_amount: payment.amount,
            //     address: paymentLinkCustomer.address,
            //     dni: paymentLinkCustomer.personalId,
            //     phone: paymentLinkCustomer.phone,
            //     fullname: customer.firstName + " " + customer.lastName,
            //     is_suscri: checkout.type.includes('Tradicional'),
            // }

            const URL = checkout.type.includes('Stripe') ? UPDATE_CONTRACT : MP
            
            console.log(`${URL}`, postUpdateZohoStripe)
            axios.post(URL, postUpdateZohoStripe).then((res) => {
                console.log({ res });
                fireToast('Contrato actualizado', 'success', 5000);
            }).catch((err) => {
                console.log({ err });
                fireToast('Contrato no actualizado', 'error', 5000);
            }).finally((res) => {
                console.log({ res });
            });
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
                                    <p>{isAdvanceSuscription? 1 : totalMonths} pagos de:</p>
                                    <h3 className='title is-3'>{ isAdvanceSuscription? advanceSuscription.firstQuoteDiscount : formattedAmount}</h3>
                                    {checkoutPayment?.type === "Suscripción con anticipo" && (
                                        <div>
                                            <p>{advanceSuscription.remainingQuotes} pagos restantes de:</p>
                                            <h3 className='title is-3'> {advanceSuscription.payPerMonthAdvance}</h3>
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