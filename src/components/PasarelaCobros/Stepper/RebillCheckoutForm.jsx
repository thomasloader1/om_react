/* eslint-disable no-undef */
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AppContext } from '../Provider/StateProvider';
import { useFormikContext } from 'formik';
import InputField from '../InputField';
import { FormStep } from './MultiStep';
import { motion } from 'framer-motion';
import { mappingFields, getPlanPrice, URLS, REBILL_CONF } from '../Hooks/useRebill';
import { parsePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import axios from 'axios';
import { fireToast } from '../Hooks/useSwal';
import { useParams } from 'react-router';
import { fireModalAlert } from '../Hooks/useSwal';
import { handleSuscriptionUpdate } from '../../../logic/rebill';
import { handleSetContractStatus } from '../../../logic/rebill';


const RebillCheckoutForm = () => {
  const { contractData, formikValues, userInfo, setRebillFetching, setOpenBlockLayer } =
    useContext(AppContext);
  const { contact, sale } = contractData;
  const [selectedCountry, setSelectedCountry] = useState('MX');
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [showRebill, setShowRebill] = useState(false);
  const { id } = useParams();
  const { values, handleChange, handleBlur, touched, errors, ...formik } = useFormikContext();

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
        setPhoneNumber(phoneNumber);
        const { country } = phoneNumber;
        const findCountry = country;
        formik.setFieldValue('phone', value);

        if (findCountry) {
          setSelectedCountry(findCountry);
        }
      }
    } catch (error) {
      console.log('Número de teléfono no válido', { error });
    }
  };


  const completedInputs = useMemo(() => Object.values(values).every((v) => typeof v !== 'undefined' && v != null && v !== ''), [values.email, values.dni])

  useEffect(() => {

    return () => {
      console.log("clean");
      setShowRebill(false);
      formik.setFieldValue('cardHolder', false);

    };
  }, [completedInputs]);


  const handleGenerateLink = async (event) => {
    const { GENERATE_LINK } = URLS;
    const requestData = {
      email: values.email,
      phone: values.phone,
      personalId: values.dni,
      address: values.address,
      zip: values.zip,
      fullName: values.fullName,
      gateway: userInfo.stepTwo.value,
      type: userInfo.stepThree.value,
      contract_entity_id: id,
      contract_so: sale.SO_Number,
      country: sale.Pais,
      quotes: values.quotes,
      status: 'pending',
    };

    try {
      const { data } = await axios.post(GENERATE_LINK, requestData);
      setOpenBlockLayer(true);
      setRebillFetching({ loading: false, ...data });

      console.log({ data });
    } catch (e) {
      fireModalAlert('Error al generar link', e);
      console.log({ e });
    }
  };
  const handlePayNow = (event) => {
    setShowRebill(true);

    formik.setFieldValue('cardHolder', true);
    const formAttributes = { ...values, phoneNumber, formikValues };
    initRebill(formAttributes);

  };
  const objectPostUpdateZoho = ({
    formikValues,
    customer,
    sale,
    payment,
    formsValues,
    subscriptionId,
    formAttributes,
    userInfo,
    dni,
  }) => {
    const { advanceSuscription } = formikValues;
    let postUpdateZoho; // Declarar la variable fuera del condicional
    if (!advanceSuscription.isAdvanceSuscription) {
      // console.log("no es anticipo");
      postUpdateZoho = {
        installments: formikValues.quotes,
        email: customer.userEmail,
        amount: sale.Grand_Total,
        contractId: formikValues.contractId,
        subscriptionId,
        installment_amount: payment.amount,
        address: formsValues.address,
        dni,
        phone: formAttributes.phone,
        fullname: customer.firstName + ' ' + customer.lastName,
        is_suscri: !userInfo.stepThree.value.includes('Tradicional'),
        is_advanceSuscription: userInfo.stepThree.value.includes('Suscripción con anticipo'),
      };
    } else {
      // console.log("es anticipo");
      postUpdateZoho = {
        installments: formikValues.quotes, //5 quotesAdvance
        email: customer.userEmail,
        amount: sale.Grand_Total,
        contractId: formikValues.contractId,
        subscriptionId,
        installment_amount: advanceSuscription.firstQuoteDiscount, //
        payPerMonthAdvance: advanceSuscription.payPerMonthAdvance,
        address: formsValues.address,
        dni,
        phone: formAttributes.phone,
        fullname: customer.firstName + ' ' + customer.lastName,
        is_suscri: !userInfo.stepThree.value.includes('Tradicional'),
        is_advanceSuscription: userInfo.stepThree.value.includes('Suscripción con anticipo'),
      };
      //no hace falta mandar el remainingAmountToPay,quotesAdvance
    }
    return postUpdateZoho;
  };

  const handleRequestGateway = (data, gateway) => {
    const { UPDATE_CONTRACT, MP } = URLS;
    console.log('handleRequestGateway', { UPDATE_CONTRACT, MP })
    const URL = gateway.includes('Stripe') ? UPDATE_CONTRACT : MP;
    axios
      .post(URL, data)
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
  };

  function initRebill(formsValues) {
    console.log({ formsValues });
    const { formikValues, ...formAttributes } = formsValues;

    const initialization = {
      organization_id: REBILL_CONF.ORG_ID /* your organization ID */,
      api_key: REBILL_CONF.API_KEY /* your API_KEY */,
      api_url: REBILL_CONF.URL /* Rebill API target */,
    };

    const RebillSDKCheckout = new window.Rebill.PhantomSDK(initialization);

    const customerRebill = mappingFields({ formAttributes, contact, formikValues });
    //console.log({ customerRebill });
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
    const { id, quantity } = getPlanPrice(formikValues, sale);
    RebillSDKCheckout.setTransaction({
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
          const { invoice, failedTransaction, pendingTransaction } = response;
          console.log("Response Pagar aqui: ", response);

          if (failedTransaction != null) {
            const { payment } = failedTransaction.paidBags[0]
            const { errorMessage } = payment;
            console.log("Pago Fallido", { message: errorMessage });
            throw new Error(`${errorMessage}`);
          }

          if (pendingTransaction !== null) {
            console.log({ pendingTransaction })

            fireModalAlert("Pago pendiente", 'El pago se esta aun procesando, aguarde a la notificacion de email', 'warning');

            return
          }

          const { paidBags, buyer } = invoice;
          const { payment, schedules } = paidBags[0];
          const [subscriptionId] = schedules;
          const { customer } = buyer;

          const dni = customer.personalIdNumber !== "" ? customer.personalIdNumber : formAttributes.dni

          const paramsFunction = { formikValues, customer, sale, payment, formsValues, subscriptionId, formAttributes, userInfo, dni }
          const postUpdateZoho = objectPostUpdateZoho(paramsFunction);

          console.log('zohoupdate2', { formikValues, postUpdateZoho });

          const gateway = userInfo.stepTwo.value

          if (formikValues.advanceSuscription.isAdvanceSuscription) {
            handleSuscriptionUpdate(postUpdateZoho.subscriptionId, formikValues.advanceSuscription)
          }

          //handleSetContractStatus(payment, formikValues.contractId);

          handleRequestGateway(postUpdateZoho, gateway);

          //Esto es para stripe, nose si funciona en mp
          fireModalAlert("Pago Realizado", '', 'success');

        } catch (error) {
          console.log("error", error);
          fireModalAlert('Pago Fallido', error)
        }

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
        errored: {},
      },
      inputWrapper: {
        base: {
          maxWidth: 'auto',
        },
      },
      errorText: {
        base: {},
      },
    });

    //Aplicar configuracion al DOM
    RebillSDKCheckout.setElements('rebill_elements');
  }

  return (
    <>
      <FormStep stepNumber={5} stepName='Finaliza la compra'>
        <div id='payment_rebill'>
          <InputField
            type='text'
            id='fullName'
            name='fullName'
            label='Nombre del titular'
            placeholder='Ingresar nombre del titular'
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.fullName && errors.fullName}
          />
          <InputField
            type='phone'
            id='phone'
            name='phone'
            label='Teléfono'
            placeholder='Ingresar número de teléfono'
            value={values.phone}
            onChange={handlePhoneInputChange}
            onBlur={handleBlur}
            error={touched.phone && errors.phone}
            country={selectedCountry}
            defaultCountry='MX'
          />

          <InputField
            type='address'
            id='address'
            name='address'
            label='Dirección de facturación'
            placeholder='Dirección completa'
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.address && errors.address}
          />

          <InputField
            type='text'
            id='zip'
            name='zip'
            label='Codigo postal'
            placeholder='Codigo postal'
            value={values.zip}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.zip && errors.zip}
          />

          <InputField
            type='number'
            id='dni'
            name='dni'
            label='Número de identificación'
            placeholder='Número de identificación'
            value={values.dni}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.dni && errors.dni}
          />
          <InputField
            type='email'
            id='email'
            name='email'
            label='E-mail'
            placeholder='Ingresar e-mail'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email}
          />
          {(completedInputs) && (
            <motion.div className='field mt-2 is-flex is-flex-direction-row is-justify-content-center'>
              <div
                id='rebill_elements'
                style={showRebill ? { display: 'block', margin: '0 auto' } : { display: 'none' }}
              ></div>
              <button
                className={`button is-success mr-2 ${showRebill && 'is-hidden'}`}
                type='button'
                onClick={handlePayNow}
                disabled={!completedInputs}
              >
                Pagar Aqui
              </button>
              <button
                className={`button is-secondary ml-2 ${showRebill && 'is-hidden'}`}
                type='button'
                onClick={handleGenerateLink}
                disabled={!completedInputs}
              >
                Generar Link
              </button>
            </motion.div>
          )}
        </div>
      </FormStep>
    </>
  );
};
export default RebillCheckoutForm;
