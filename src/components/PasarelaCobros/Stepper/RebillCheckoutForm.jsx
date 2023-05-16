/* eslint-disable no-undef */
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Provider/StateProvider';
import { useFormik } from 'formik';
import InputField from '../InputField';
import { FormStep } from './MultiStep';
import { motion } from 'framer-motion'
import * as Yup from 'yup'
import { mappingFields, getPlanPrice, URLS, REBILL_CONF } from '../Hooks/useRebill'
import { parsePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import axios from 'axios';
import { fireToast } from '../Hooks/useSwal';
import { useParams } from 'react-router'
import { fireModalAlert } from '../Hooks/useSwal';

const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Campo requerido'),
    phone: Yup.string().required('Campo requerido'),
    address: Yup.string().required('Campo requerido'),
    dni: Yup.number().required('Campo requerido'),
    email: Yup.string().email('Correo electrónico no válido').required('Campo requerido'),
});

const RebillCheckoutForm = () => {
    const { contractData, formikValues, userInfo, setRebillFetching, setOpenBlockLayer } = useContext(AppContext);
    const { contact, sale } = contractData
    const [selectedCountry, setSelectedCountry] = useState('MX');
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [showRebill, setShowRebill] = useState(false);
    const { id } = useParams();

    console.log({ contact, sale })
    const handlePhoneInputChange = (value) => {
        /* console.log(value, typeof value)
        if (typeof value !== 'undefined') {
            const parsedPhoneNumber = parsePhoneNumber(value);
            if (parsedPhoneNumber?.country) {
                setSelectedCountry(parsedPhoneNumber.country);
            }
        } */
        try {
            const phoneNumber = parsePhoneNumber(value);
            if (phoneNumber) {
                setPhoneNumber(phoneNumber)
                const { country } = phoneNumber;
                const findCountry = country;
                formik.setFieldValue('phone', value);

                if (findCountry) {
                    setSelectedCountry(findCountry);
                }
            }
        } catch (error) {
            console.log("Número de teléfono no válido");
        }
    };

    const formik = useFormik({
        initialValues: {
            fullName: contact.Full_Name || '',
            phone: '',
            address: '',
            dni: contact.DNI || '',
            email: contact.Email || '',
            zip: '',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            return false
        },
    });


    const completedInputs = Object.values(formik.values).every(v => typeof v !== "undefined" && v != null && v !== '' && v.length >= 4)


    useEffect(() => {
        console.log({ completedInputs }, formik.values)
        if (completedInputs) {
            const formAttributes = { ...formik.values, phoneNumber, formikValues }
            initRebill(formAttributes)
        }

        return () => setShowRebill(false)
    }, [completedInputs])

    const handleGenerateLink = async (event) => {

        const requestData = {
            email: formik.values.email,
            phone: formik.values.phone,
            personalId: formik.values.dni,
            address: formik.values.address,
            zip: formik.values.zip,
            fullName: formik.values.fullName,
            gateway: userInfo.stepTwo.value,
            type: userInfo.stepThree.value,
            contract_entity_id: id,
            contract_so: sale.SO_Number,
            country: sale.Pais,
            quotes: formikValues.quotes,
            status: 'pending',
        }

        try {
            const response = await axios.post("/api/rebill/generatePaymentLink", requestData);

        } catch (e) { }

        console.log({ response })

    }
    const handlePayNow = (event) => {
        setShowRebill(true)
    }

    const handleRequestGateway = (data, gateway) => {
        const { UPDATE_CONTRACT, MP } = URLS

        const URL = gateway.includes('Stripe') ? UPDATE_CONTRACT : MP

        axios.post(URL, data)
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
    }

    function initRebill(formsValues) {
        console.log({ formsValues })
        const { formikValues, ...formAttributes } = formsValues

        const initialization = {
            organization_id: REBILL_CONF.ORG_ID /* your organization ID */,
            api_key: REBILL_CONF.API_KEY /* your API_KEY */,
            api_url: REBILL_CONF.URL /* Rebill API target */,
        };

        const RebillSDKCheckout = new window.Rebill.PhantomSDK(initialization);

        const customerRebill = mappingFields({ formAttributes, contact, formikValues });
        console.log({ customerRebill })
        //Seteo de customer
        RebillSDKCheckout.setCustomer(customerRebill);

        //Seteo de identidicacion del customer
        RebillSDKCheckout.setCardHolder({
            name: contact.Full_Name,
            identification: {
                type: 'DNI',
                value: contact.DNI,
            },
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
        RebillSDKCheckout.setCallbacks({
            onSuccess: (response) => {

                try {
                    setRebillFetching({ loading: false, ...response })
                    setOpenBlockLayer(true)
                    const { invoice, faliedTransaction, pendingTransaction } = response

                    if (faliedTransaction != null) {
                        const { errorMessage } = faliedTransaction.paidBags[0].payment
                        throw new Error(`${errorMessage}`);
                    }

                    const { paidBags, buyer } = invoice
                    const { payment, schedules } = paidBags[0]
                    const [subscriptionId] = schedules
                    const { customer } = buyer

                    const dni = customer.personalIdNumber !== "" ? customer.personalIdNumber : formAttributes.dni

                    const postUpdateZoho = {
                        installments: formikValues.quotes,
                        email: customer.userEmail,
                        amount: sale.Grand_Total,
                        contractId: formikValues.contractId,
                        subscriptionId,
                        installment_amount: payment.amount,
                        address: formsValues.address,
                        dni,
                        phone: formAttributes.phone,
                        fullname: customer.firstName + " " + customer.lastName,
                        is_suscri: !userInfo.stepThree.value.includes('Tradicional'),
                    }
                    const gateway = userInfo.stepTwo.value
                    handleRequestGateway(postUpdateZoho, gateway)
                    fireModalAlert("Pago Realizado", '', 'success')

                } catch (error) {
                    fireModalAlert('Pago Fallido', error)
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
            <FormStep stepNumber={5} stepName='Finaliza la compra'>
                <div id="payment_rebill">
                    <InputField
                        type="text"
                        id="fullName"
                        name="fullName"
                        label="Nombre del titular"
                        placeholder="Ingresar nombre del titular"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.fullName && formik.errors.fullName}
                    />
                    <InputField
                        type='phone'
                        id='phone'
                        name='phone'
                        label='Teléfono'
                        placeholder='Ingresar número de teléfono'
                        value={formik.values.phone}
                        onChange={handlePhoneInputChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.phone && formik.errors.phone}
                        country={selectedCountry}
                        defaultCountry="MX"
                    />

                    <InputField
                        type='address'
                        id='address'
                        name='address'
                        label='Dirección de facturación'
                        placeholder='Dirección completa'
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.address && formik.errors.address}
                    />

                    <InputField
                        type='text'
                        id='zip'
                        name='zip'
                        label='Codigo postal'
                        placeholder='Codigo postal'
                        value={formik.values.zip}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.zip && formik.errors.zip}
                    />

                    <InputField
                        type='number'
                        id='dni'
                        name='dni'
                        label='Número de identificación'
                        placeholder='Número de identificación'
                        value={formik.values.dni}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.dni && formik.errors.dni}
                    />
                    <InputField
                        type='email'
                        id='email'
                        name='email'
                        label='E-mail'
                        placeholder='Ingresar e-mail'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && formik.errors.email}
                    />
                    {completedInputs && (
                        <motion.div className='field mt-2 is-flex is-flex-direction-row is-justify-content-center'>
                            <div id='rebill_elements' style={showRebill ? { display: 'block', margin: '0 auto' } : { display: 'none' }}></div>
                            <button className={`button is-success mr-2 ${showRebill && "is-hidden"}`} type='button' onClick={handlePayNow}>Pagar Aqui</button>
                            <button className={`button is-secondary ml-2 ${showRebill && "is-hidden"}`} type='button' onClick={handleGenerateLink}>Generar Link</button>
                        </motion.div>)}

                </div>

            </FormStep >
        </>
    )
}

export default RebillCheckoutForm