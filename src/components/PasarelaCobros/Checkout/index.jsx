import React, { useContext, useEffect, useState } from 'react'
import IMAGES from '../../../img/pasarelaCobros/share';
import { useLocation, useParams } from 'react-router';
import axios from 'axios';
import { fireToast } from '../Hooks/useSwal';
import { URLS, getPlanPrice, mappingCheckoutFields } from '../Hooks/useRebill';
import { parsePhoneNumber } from "react-phone-number-input";
import { AppContext } from '../Provider/StateProvider';
import { useContractZoho } from '../Hooks/useContractZoho';
import { useFormik } from 'formik';
import * as Yup from 'yup'
const { logo } = IMAGES

const Checkout = () => {
    const { contractData, userInfo } = useContext(AppContext);
    const [checkoutPayment, setCheckoutPayment] = useState(null)
    const [customer, setCustomer] = useState(null)
    const { contact, sale } = contractData;
    const { so } = useParams();
    const { pathname } = useLocation();
    //const [loading, setLoading] = useState(false);
    const needRunEffect = !pathname.includes('vp');

    const { loading, data } = useContractZoho(so, needRunEffect);
    const handleSubmit = () => {

    }

    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required('Campo requerido'),
        phone: Yup.string().required('Campo requerido'),
        address: Yup.string().required('Campo requerido'),
        dni: Yup.number().required('Campo requerido'),
        email: Yup.string().email('Correo electrónico no válido').required('Campo requerido'),
    });


    const formik = useFormik({
        initialValues: {
            fullName: contact?.Full_Name || '',
            phone: '',
            address: '',
            dni: contact?.DNI || '',
            email: contact?.Email || '',
            zip: '',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            return false
        },
    });

    const [fullName, setFullName] = useState(formik.values.fullName);
    const [dni, setDni] = useState(formik.values.dni);
    const [address, setAddress] = useState(formik.values.address);
    const [zipCode, setZipCode] = useState(formik.values.zip);
    const [phoneNumber, setPhoneNumber] = useState(formik.values.phoneNumber);

    useEffect(() => {

        if (loading) {
            async function fetchPaymentLink() {
                const { data } = await axios.get(`/api/rebill/getPaymentLink/${so}`);
                initRebill(data)
                setCheckoutPayment(data.checkout)
                setCustomer(data.customer)
                //   console.log({ response })
            }
            fetchPaymentLink()
        }
        console.log(contractData)
    }, [loading])



    function initRebill(paymentLink) {
        console.log({ paymentLink })
        const { checkout, customer } = paymentLink

        const initialization = {
            organization_id: '679d8e12-e0ad-4052-bc9e-eb78f956ce7e' /* your organization ID */,
            api_key: 'bc7d4abf-3a94-4f53-b414-887356b51e0c' /* your API_KEY */,
            api_url: 'https://api.rebill.to/v2' /* Rebill API target */,
        };

        const RebillSDKCheckout = new window.Rebill.PhantomSDK(initialization);

        const customerRebill = mappingCheckoutFields({ customer, contact, checkout });
        console.log({ customerRebill })
        //Seteo de customer
        RebillSDKCheckout.setCustomer(customerRebill);

        //Seteo de identidicacion del customer
        RebillSDKCheckout.setCardHolder({
            name: contact.Full_Name,
            /*  identification: {
                 type: 'DNI',
                 value: contact.DNI,
             }, */
        });

        //Seteo de plan para cobrar
        const { id, quantity } = getPlanPrice(formikValues, sale)
        RebillSDKCheckout
            .setTransaction({
                prices: [
                    {
                        id,
                        quantity,
                    },
                ],
            }).then((price_setting) => console.log(price_setting));

        //Seteo de callbacks en saco de que el pago este correcto o tengo algun fallo
        const { UPDATE_CONTRACT } = URLS
        RebillSDKCheckout.setCallbacks({
            onSuccess: (response) => {
                console.log(response)
                try {
                    const { invoice, faliedTransaction, pendingTransaction } = response
                    const { paidBags, buyer } = invoice
                    const { payment } = paidBags[0]
                    const { customer } = buyer

                    const postUpdateZohoStripe = {
                        installments: formikValues.quotes && 1,
                        email: customer.userEmail,
                        amount: payment.amount,
                        contractId: formikValues.contractId,
                        subscriptionId: payment.id,
                        installment_amount: payment.amount,
                        address: formsValues.address,
                        dni: customer.personalIdNumber,
                        phone: formAttributes.phone,
                        fullname: customer.firstName + " " + customer.lastName,
                        is_suscri: !userInfo.stepThree.value.includes('Tradicional'),
                    }

                    axios.post(UPDATE_CONTRACT, postUpdateZohoStripe)
                        .then((res) => {
                            console.log({ res });
                            fireToast('Contrato actualizado', 'success', 5000);
                        })
                        .catch((err) => {
                            console.log({ err });
                            fireToast('Contrato no actualizado', 'error', 5000);
                        })
                        .finally((res) => {
                            console.log({ res });
                        });
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
        <main className='grid-checkout container'>
            <header className={`is-max-widescreen py-5`}>
                <nav class="navbar" role="navigation" aria-label="main navigation">
                    <div class="navbar-brand">
                        <a class="navbar-item" href="https://bulma.io">
                            <img src={logo} alt="MSK Logo" width="130" height="80" />
                        </a>

                    </div>
                </nav>
            </header>
            <section >

                <form id="cardCheckout" className="card_checkout" onSubmit={handleSubmit}>

                    <div className="card_checkout__body">
                        <div className="field">
                            <label htmlFor="fullName" className="label">Nombre completo:</label>
                            <div className="control">
                                <input
                                    id="fullName"
                                    type="text"
                                    className="input"
                                    value={fullName}
                                    onChange={(event) => setFullName(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="dni" className="label">DNI:</label>
                            <div className="control">
                                <input
                                    id="dni"
                                    type="text"
                                    className="input"
                                    value={dni}
                                    onChange={(event) => setDni(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="address" className="label">Dirección:</label>
                            <div className="control">
                                <input
                                    id="address"
                                    type="text"
                                    className="input"
                                    value={address}
                                    onChange={(event) => setAddress(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="zipCode" className="label">Código postal:</label>
                            <div className="control">
                                <input
                                    id="zipCode"
                                    type="text"
                                    className="input"
                                    value={zipCode}
                                    onChange={(event) => setZipCode(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="phoneNumber" className="label">Número de teléfono:</label>
                            <div className="control">
                                <input
                                    id="phoneNumber"
                                    type="text"
                                    className="input"
                                    value={phoneNumber}
                                    onChange={(event) => setPhoneNumber(event.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="card_checkout__footer">
                        <div className='field mt-2'>
                            <div id='rebill_elements'></div>
                        </div>

                    </div>
                </form>


            </section>
        </main>
    )
}

export default Checkout