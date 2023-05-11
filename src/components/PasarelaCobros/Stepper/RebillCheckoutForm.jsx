/* eslint-disable no-undef */
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Provider/StateProvider';
import { useFormik } from 'formik';
import InputField from '../InputField';
import { FormStep } from './MultiStep';
import { motion } from 'framer-motion'
import * as Yup from 'yup'
import { mappingFields, getPlanPrice, URLS } from '../Hooks/useRebill'
import { parsePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Campo requerido'),
    phone: Yup.string().required('Campo requerido'),
    address: Yup.string().required('Campo requerido'),
    dni: Yup.number().required('Campo requerido'),
    email: Yup.string().email('Correo electrónico no válido').required('Campo requerido'),
});

const RebillCheckoutForm = () => {
    const { contractData, formikValues } = useContext(AppContext);
    const { contact, sale } = contractData
    const [selectedCountry, setSelectedCountry] = useState('MX');
    const [phoneNumber, setPhoneNumber] = useState(null);
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


    const completedInputs = Object.values(formik.values).every(v => typeof v !== "undefined" && v != null && v !== '')


    useEffect(() => {
        console.log({ completedInputs }, formik.values)
        if (completedInputs) {
            console.log("asdasdasdas")
            const formAttributes = { ...formik.values, phoneNumber, formikValues }
            initRebill(formAttributes)
        }
    }, [completedInputs])

    function initRebill(formsValues) {
        console.log({ formsValues })
        const { formikValues, ...formAttributes } = formsValues

        const initialization = {
            organization_id: '679d8e12-e0ad-4052-bc9e-eb78f956ce7e' /* your organization ID */,
            api_key: 'bc7d4abf-3a94-4f53-b414-887356b51e0c' /* your API_KEY */,
            api_url: 'https://api.rebill.to/v2' /* Rebill API target */,
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
        const { UPDATE_CONTRACT } = URLS
        RebillSDKCheckout.setCallbacks({
            onSuccess: (response) => {
                console.log(response)
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
                    address: data.address,
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

        //Aplicar configuracion al DOM
        RebillSDKCheckout.setElements('rebill_elements');
    }
    return (
        <>
            <FormStep stepNumber={5} stepName='Finaliza la compra'>

                <div id='grid-grid-payment_stripe'>
                    <InputField
                        type='text'
                        id='fullName'
                        name='fullName'
                        label='Nombre del titular'
                        placeholder='Ingresar nombre del titular'
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
                    {completedInputs && (<motion.div className='checkout_stripe field mt-2'>
                        <div id='rebill_elements'></div>
                    </motion.div>)}

                </div>

            </FormStep>
            <pre>{JSON.stringify(formikValues, null, 2)}</pre>
        </>
    )
}

export default RebillCheckoutForm