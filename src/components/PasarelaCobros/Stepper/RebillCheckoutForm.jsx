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
const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Campo requerido'),
    phone: Yup.string().required('Campo requerido'),
    address: Yup.string().required('Campo requerido'),
    dni: Yup.number().required('Campo requerido'),
    email: Yup.string().email('Correo electrónico no válido').required('Campo requerido'),
});

const RebillCheckoutForm = () => {
    const { contractData, formikValues, userInfo } = useContext(AppContext);
    const { contact, sale } = contractData
    const [selectedCountry, setSelectedCountry] = useState('MX');
    const [phoneNumber, setPhoneNumber] = useState(null);
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


    const completedInputs = Object.values(formik.values).every(v => typeof v !== "undefined" && v != null && v !== '')


    useEffect(() => {
        console.log({ completedInputs }, formik.values)
        if (completedInputs) {
            const formAttributes = { ...formik.values, phoneNumber, formikValues }
            initRebill(formAttributes)
        }
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

        const response = await axios.post("/api/rebill/generatePaymentLink", requestData);
        console.log({ response })

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
        const { UPDATE_CONTRACT } = URLS
        RebillSDKCheckout.setCallbacks({
            onSuccess: (response) => {
                console.log(response)
                try {
                    const { invoice, faliedTransaction, pendingTransaction } = response
                    const { paidBags, buyer } = invoice
                    const { payment } = paidBags[0]
                    const { customer } = buyer

                    const dni = customer.personalIdNumber !== "" ? customer.personalIdNumber : formAttributes.dni

                    const postUpdateZohoStripe = {
                        installments: formikValues.quotes && 1,
                        email: customer.userEmail,
                        amount: payment.amount,
                        contractId: formikValues.contractId,
                        subscriptionId: payment.id,
                        installment_amount: payment.amount,
                        address: formsValues.address,
                        dni,
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


    const handleSubmitMercadoPago = () => {
        setFetching(true);
        setOpenBlockLayer(true);

        formRef.current.style.filter = 'blur(5px)';

        const body = new FormData();
        const type = formikValues.mod.toLowerCase().substring(0, 4);
        const requestConfig = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };
        const months = formikValues.quotes && formikValues.quotes > 0 ? formikValues.quotes : 0;
        const allIsoCodes = getAllISOCodes();
        const thisCountry = country ? country : appEnv?.country;
        const clearedCountry = removeAccents(thisCountry);
        const filterIso = allIsoCodes.filter((iso) => iso.countryName === clearedCountry);
        //console.log({ allIsoCodes, country, clearedCountry, filterIso });
        const [countryObject] = filterIso;
        const { iso } = countryObject;

        const condicionalCountry = iso === 'MX' ? 'mx_msk' : iso

        body.append('months', months);
        body.append('amount', `${formikValues.amount}`);
        body.append('type', type);
        body.append('so', formikValues.sale.SO_Number);
        body.append('address', formik.values.address);
        body.append('dni', formik.values.dni);
        body.append('phone', formik.values.phone);
        body.append('fullname', formik.values.fullName);
        body.append('sale_id', formikValues.contractId);
        body.append('mail', email);
        body.append('country', condicionalCountry);

        const { MP } = URLS;

        axios
            .post(MP, body, requestConfig)
            .then((res) => {
                if (res.data.status === 0) {
                    formRef.current.style.filter = 'blur(0px)';
                    formRef.current.style.position = 'relative';
                    formRef.current.style.zIndex = '0';
                    setOpenBlockLayer(false);
                    fireAlert(res.data.error);
                    return;
                }

                setCheckoutLink(res.data.url);
            })
            .catch((err) => {
                formRef.current.style.filter = 'blur(0px)';
                formRef.current.style.position = 'relative';
                formRef.current.style.zIndex = '0';
                setOpenBlockLayer(false);
                fireAlert('ERROR');
                console.error({ error: err.response.data });
            })
            .finally(() => {
                setFetching(false);
            });
    };
    return (
        <>
            <FormStep stepNumber={5} stepName='Finaliza la compra'>

                <div id="grid-payment_stripe">

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
                    {completedInputs && (<motion.div className='field mt-2'>
                        <div id='rebill_elements'></div>
                        <button className='button is-secondary' onClick={handleGenerateLink}>Generar Link</button>
                    </motion.div>)}

                </div>

            </FormStep >
        </>
    )
}

export default RebillCheckoutForm