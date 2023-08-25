import React, { useContext, useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { AppContext } from '../Provider/StateProvider';
/* import { Elements } from '@stripe/react-stripe-js'; */
import Header from '../Header';
import MultiStep from '../Stepper/MultiStep';
import SelectCountryStep from '../Stepper/SelectCountryStep';
import SelectPaymentMethodStep from '../Stepper/SelectPaymentMethodStep';
import SelectPaymentModeStep from '../Stepper/SelectPaymentModeStep';
import FormClientDataStep from '../Stepper/FormClientDataStep';
import GeneratePaymentLinkStep from '../Stepper/GeneratePaymentLinkStep';
import { useMediaQSmall } from '../Hooks/useMediaQuery';

import useStripeEnv from '../Hooks/useStripeEnv';

import { useProgress } from '../Hooks/useProgress';
import { useLocation, useParams } from 'react-router';
import { useContractZoho } from '../Hooks/useContractZoho';
import MotionSpinner from '../Spinner/MotionSpinner';
import ExcelCTCPayment from '../Stepper/ExcelCTCPayment';
import FolioCTCPayment from '../Stepper/FolioCTCPayment';
import PlanCTCPayment from '../Stepper/PlanCTCPayment';
import FolioCTCPlanPayment from '../Stepper/FolioCTCPlanPayment';
import { useYupValidation } from '../Hooks/useYupValidation';
import DataCardCTC from '../Stepper/DataCardCTC';
import PlaceToPayPayment from '../Stepper/PlaceToPayPayment';
import { makeCTCPaymentFile, makeCTCSuscriptionFile, updateZohoContract } from '../../../logic/ctc';
import { fireToast } from '../Hooks/useSwal';
import { makePostUpdateZohoCTC } from '../../../logic/zoho';
/* import { loadStripe } from '@stripe/stripe-js'; */

function PasarelaApp() {
  const { setFormikValues,
    contractData,
    appRef,
    stepNumber,
    setStepNumber,
    userInfo,
    formikValues,
    setDownloadLinkCTCPayment, setOpenBlockLayer } = useContext(AppContext);

  const { countryStepValidation,
    selectPaymentMethodStepValidation,
    selectPaymentModeStepValidation,
    formClientDataStepValidation,
    rebillPaymentStepValidation,
    dataCardCTCStepValidation,
    folioPaymentCTCStepValidation,
    folioSuscriptionCTCStepValidation } = useYupValidation();

  const location = useLocation();
  const { id } = useParams();
  const needRunEffect = !location.pathname.includes('vp');

  const { loading } = useContractZoho(id, needRunEffect);
  const pasarelaContainerRef = useRef(null);
  const isMobile = useMediaQSmall();

  const setHeightMobile = () => {
    pasarelaContainerRef.current.style.height = `90vh`;
  };

  // const { fetching: stripeFetch, pk } = useStripeEnv(data?.sale?.Pais);
  //const stripePromise = loadStripe(pk)

  const { progressId, getProgress } = useProgress();

  const isCTCPayment = userInfo.stepTwo.value.includes('CTC');
  const isPTPPayment = userInfo.stepTwo.value.includes('PlaceToPay');

  useEffect(() => {
    if (location.pathname.includes('vp')) {
      getProgress();
    }

    return () => console.log('Progress Effect')
  }, [progressId]);

  useEffect(() => {
    setStepNumber(stepNumber);

    return () => console.log('StepNumber Effect');
  }, [stepNumber]);

  useEffect(() => {
    //console.log({ isMobile, pasarelaContainerRef });
    if (isMobile && pasarelaContainerRef.current) {
      setHeightMobile();
    }
    return () => console.log('isMobile Effect')

  }, [isMobile, pasarelaContainerRef.current]);

  const initialFromValues = userInfo?.stepTwo?.value && userInfo?.stepTwo?.value.includes('CTC') ? {
    fullName: '',
    phone: '',
    address: '',
    dni: '',
    email: '',
    zip: '',
    mod: '',
    n_ro_de_tarjeta: '',
    card_v: '',
    rfc: '',
    folio_pago: '',
    folio_suscripcion: '',
  } : {
    fullName: '',
    phone: '',
    address: '',
    dni: '',
    email: '',
    zip: '',
    mod: '',
  }


  return (
    <main ref={appRef}>
      <Header />
      {(loading) ? (
        <MotionSpinner text='Recuperando datos del Contrato' />
      ) : (
        /*  <Elements stripe={stripePromise}> */
        <section className={'container is-max-widescreen'}>
          <div
            id='pasarela-container'
            ref={pasarelaContainerRef}
            className='pasarela columns mx-auto'
          >
            <MultiStep
              stepStateNumber={{ stepNumber, setStepNumber }}
              className='pasarela-1 column seleccion-pais'
              initialValues={initialFromValues}
              onSubmit={async () => {

                if (formikValues.payment_method.includes("CTC")) {
                  setOpenBlockLayer(true);
                  console.log({ formikValues })
                  const body = makePostUpdateZohoCTC(formikValues, contractData, userInfo);
                  try {
                    const res = await updateZohoContract(body)
                    if (res.result === 'ok') {
                      setOpenBlockLayer(true);
                    } else {
                      throw new Error(JSON.stringify(res));
                    }

                  } catch (error) {
                    console.log({ error })
                    fireToast('Error al actualizar Contrato CTC')
                  }

                  //console.log({ body, res })
                }

              }}
            >
              <SelectCountryStep
                onSubmit={(values) => {
                  setFormikValues((prevFormikValues) => ({
                    ...prevFormikValues,
                    ...values,
                  }));
                }}
                validationSchema={countryStepValidation}
              />
              <SelectPaymentMethodStep
                onSubmit={(values) => {
                  setFormikValues((prevFormikValues) => ({
                    ...prevFormikValues,
                    ...values,
                  }));
                }}
                validationSchema={selectPaymentMethodStepValidation}
              />
              <SelectPaymentModeStep
                onSubmit={(values) => {
                  setFormikValues((prevFormikValues) => ({
                    ...prevFormikValues,
                    ...values,
                  }));
                }}
                validationSchema={selectPaymentModeStepValidation}
              />
              <FormClientDataStep
                onSubmit={(values) => {
                  setFormikValues((prevFormikValues) => ({
                    ...prevFormikValues,
                    ...values,
                  }));
                }}
                validationSchema={formClientDataStepValidation}
              />


              {isCTCPayment ? (
                <DataCardCTC
                  onSubmit={async (values) => {
                    //console.log({ values })
                    const { quotes } = formikValues
                    const divideBy = quotes ? quotes : 1
                    const amountFirstPay = contractData.sale.Grand_Total / divideBy;

                    const valuesCTCPaymentFile = {
                      amount: formikValues.advanceSuscription.isAdvanceSuscription ? formikValues.advanceSuscription.firstQuoteDiscount : Math.floor(amountFirstPay),
                      contact_name: contractData.contact.Full_Name,
                      so_contract: contractData.sale.SO_Number,
                      n_ro_de_tarjeta: values.n_ro_de_tarjeta,
                      card_v: values.card_v
                    }
                    const { message, download_link } = await makeCTCPaymentFile(valuesCTCPaymentFile)

                    setDownloadLinkCTCPayment(download_link);

                    setFormikValues((prevFormikValues) => ({
                      ...prevFormikValues,
                      ...values
                    }));

                    // options.sideItemOptions[4].value = 'Completado'

                    fireToast(message, 'success');
                    //    setOptions(options)
                  }}
                  validationSchema={dataCardCTCStepValidation} />
              ) :
                isPTPPayment ? <PlaceToPayPayment /> : <GeneratePaymentLinkStep
                  validationSchema={rebillPaymentStepValidation}
                />
              }

              {isCTCPayment && <ExcelCTCPayment />}
              {isCTCPayment && <FolioCTCPayment
                onSubmit={async (values) => {
                  const amountFirstPay = formikValues.amount / formikValues.quotes;

                  const valuesCTCSuscriptionFile = {
                    amounts: formikValues.advanceSuscription.isAdvanceSuscription ? formikValues.advanceSuscription.payPerMonthAdvance : Math.floor(amountFirstPay),
                    contact_name: contractData.contact.Full_Name,
                    so_contract: contractData.sale.SO_Number,
                    card_number: formikValues.n_ro_de_tarjeta,
                    card_v: values.card_v,
                    quotes: formikValues.quotes
                  }
                  const { message, download_link } = await makeCTCSuscriptionFile(valuesCTCSuscriptionFile)
                  setDownloadLinkCTCPayment(download_link);

                  setFormikValues((prevFormikValues) => ({
                    ...prevFormikValues,
                    ...values
                  }));

                  fireToast(message, 'success');
                }}
                validationSchema={folioPaymentCTCStepValidation}

              />}
              {isCTCPayment && <PlanCTCPayment />}
              {isCTCPayment && <FolioCTCPlanPayment
                onSubmit={async (values) => {
                  setFormikValues((prevFormikValues) => ({
                    ...prevFormikValues,
                    ...values
                  }));
                }}
                validationSchema={folioSuscriptionCTCStepValidation}
              />}

            </MultiStep>
          </div>
          {/* <pre>{JSON.stringify(contractData, null, 2)}</pre> */}
        </section>
        /* </Elements> */
      )}
    </main>

  );
}

export default PasarelaApp;
