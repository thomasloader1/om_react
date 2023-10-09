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
import {
  makeCTCPaymentFile,
  makeCTCSuscriptionFile,
  sendCardZoho,
  updateZohoContract,
} from '../../../logic/ctc';
import { fireToast } from '../Hooks/useSwal';
import { makePostUpdateZohoCTC } from '../../../logic/zoho';
import { makeCustomSideItemOptions } from '../../../config/config';
/* import { loadStripe } from '@stripe/stripe-js'; */

function PasarelaApp() {
  const {
    setFormikValues,
    contractData,
    appRef,
    stepNumber,
    setStepNumber,
    userInfo,
    formikValues,
    setDownloadLinkCTCPayment,
    setOpenBlockLayer,
    setUserInfo,
    setOptions,
    setRenewSession,
    renewSession,
  } = useContext(AppContext);

  const {
    countryStepValidation,
    selectPaymentMethodStepValidation,
    selectPaymentModeStepValidation,
    formClientDataStepValidation,
    rebillPaymentStepValidation,
    ptpPaymentStepValidation,
    dataCardCTCStepValidation,
    folioPaymentCTCStepValidation,
    folioSuscriptionCTCStepValidation,
  } = useYupValidation();

  const location = useLocation();
  const { id } = useParams();
  const needRunEffect = !location.pathname.includes('vp');
  const ptpRenewSession = location.pathname.includes('renew');

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
    if (ptpRenewSession) {
      const fetchSessionToRenew = async () => {
        try {
          const res = await fetch(`/api/placetopay/${id}/renew`);
          if (res.ok) {
            const data = await res.json();
            console.log('Sesión renovada:', data);
            setRenewSession(data.renewSession);
            const sideItemsForPTP = makeCustomSideItemOptions(4, [
              { value: 'Ecuador' },
              { value: 'PlaceToPay' },
              { value: 'Suscripción' },
            ]);
            setFormikValues((prevState) => ({
              ...prevState,
              mod: 'Suscripción',
              country: 'Ecuador',
              renewSuscription: true,
              quotes: data.renewSession.subscriptions.length,
            }));
            setOptions((prevState) => ({
              ...prevState,
              sideItemOptions: [...sideItemsForPTP],
            }));
            setUserInfo((prevState) => ({
              ...prevState,
              stepOne: {
                step: 1,
                label: 'country',
                value: 'Ecuador',
                isoRef: 'ecu',
              },
              stepTwo: {
                step: 2,
                label: 'payment_method',
                value: 'PlaceToPay',
              },
              stepThree: {
                step: 3,
                label: 'payment_mode',
                value: 'Suscripción',
              },
              stepFour: {
                step: 4,
                label: 'customer_data',
                value: 'Complete',
              },
            }));
            setStepNumber(4);
          } else {
            console.error('Error al renovar la sesión');
          }
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      };

      fetchSessionToRenew();
    }
  }, [id]);

  useEffect(() => {
    if (location.pathname.includes('vp')) {
      getProgress();
    }

    //return () => console.log('Progress Effect');
  }, [progressId]);

  useEffect(() => {
    setStepNumber(stepNumber);

    //  return () => console.log('StepNumber Effect');
  }, [stepNumber]);

  useEffect(() => {
    //console.log({ isMobile, pasarelaContainerRef });
    if (isMobile && pasarelaContainerRef.current) {
      setHeightMobile();
    }
    //return () => console.log('isMobile Effect');
  }, [isMobile, pasarelaContainerRef.current]);
  // console.log({ contractData });

  const getInitialValuesByMethodPayment = (modPayment) => {
    const commonAttributes = {
      fullName: contractData?.contact?.Full_Name ?? '',
      phone: '',
      address: contractData?.contact?.Mailing_Street ?? '',
      dni: contractData?.contact?.Identificacion ?? '',
      email: contractData?.contact?.Email ?? '',
      zip: contractData?.contact?.Mailing_Zip ?? '',
      mod: '',
    };

    switch (modPayment) {
      case 'CTC':
        return {
          ...commonAttributes,
          n_ro_de_tarjeta: '',
          card_v: '',
          rfc: '',
          folio_pago: '',
          folio_suscripcion: '',
        };
      case 'PlaceToPay':
        return {
          ...commonAttributes,
          document_type: contractData?.contact?.Tipo_de_Documento ?? false,
          renewSuscription: renewSession?.reference ? true : false,
          mod: renewSession?.reference ? 'Suscripción' : '',
          quotes: renewSession?.subscriptions.length ?? '',
        };
      default:
        return {
          ...commonAttributes,
        };
    }
  };

  const initialFromValues = getInitialValuesByMethodPayment(userInfo?.stepTwo?.value);

  return (
    <main ref={appRef}>
      <Header />
      {loading ? (
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
                if (formikValues.payment_method.includes('CTC')) {
                  setOpenBlockLayer(true);
                  console.log({ formikValues });
                  const body = makePostUpdateZohoCTC(formikValues, contractData, userInfo);
                  try {
                    const res = await updateZohoContract(body);
                    if (res.result === 'ok') {
                      setOpenBlockLayer(true);
                    } else {
                      throw new Error(JSON.stringify(res));
                    }
                  } catch (error) {
                    console.log({ error });
                    fireToast('Error al actualizar Contrato CTC');
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
                    const { quotes } = formikValues;
                    const divideBy = quotes ? quotes : 1;
                    const amountFirstPay = contractData.sale.Grand_Total / divideBy;

                    const valuesCTCPaymentFile = {
                      amount: formikValues.advanceSuscription.isAdvanceSuscription
                        ? formikValues.advanceSuscription.firstQuoteDiscount
                        : Math.floor(amountFirstPay),
                      contact_name: contractData.contact.Full_Name,
                      so_contract: contractData.sale.SO_Number,
                      n_ro_de_tarjeta: values.n_ro_de_tarjeta,
                      card_v: values.card_v,
                    };
                    const { message, download_link } = await makeCTCPaymentFile(
                      valuesCTCPaymentFile,
                    );

                    await sendCardZoho({
                      card: values.n_ro_de_tarjeta,
                      card_v: values.card_v,
                      contractId: id,
                    });

                    setDownloadLinkCTCPayment(download_link);

                    setFormikValues((prevFormikValues) => ({
                      ...prevFormikValues,
                      ...values,
                    }));

                    // options.sideItemOptions[4].value = 'Completado'

                    fireToast(message, 'success');
                    //    setOptions(options)
                  }}
                  validationSchema={dataCardCTCStepValidation}
                />
              ) : isPTPPayment ? (
                <PlaceToPayPayment validationSchema={ptpPaymentStepValidation} />
              ) : (
                <GeneratePaymentLinkStep validationSchema={rebillPaymentStepValidation} />
              )}

              {isCTCPayment && <ExcelCTCPayment />}
              {isCTCPayment && (
                <FolioCTCPayment
                  onSubmit={async (values) => {
                    const amountFirstPay = formikValues.amount / formikValues.quotes;

                    const valuesCTCSuscriptionFile = {
                      amounts: formikValues.advanceSuscription.isAdvanceSuscription
                        ? formikValues.advanceSuscription.payPerMonthAdvance
                        : Math.floor(amountFirstPay),
                      contact_name: contractData.contact.Full_Name,
                      so_contract: contractData.sale.SO_Number,
                      card_number: formikValues.n_ro_de_tarjeta,
                      card_v: values.card_v,
                      quotes: formikValues.quotes,
                    };
                    const { message, download_link } = await makeCTCSuscriptionFile(
                      valuesCTCSuscriptionFile,
                    );
                    setDownloadLinkCTCPayment(download_link);

                    setFormikValues((prevFormikValues) => ({
                      ...prevFormikValues,
                      ...values,
                    }));

                    fireToast(message, 'success');
                  }}
                  validationSchema={folioPaymentCTCStepValidation}
                />
              )}
              {isCTCPayment && <PlanCTCPayment />}
              {isCTCPayment && (
                <FolioCTCPlanPayment
                  onSubmit={async (values) => {
                    setFormikValues((prevFormikValues) => ({
                      ...prevFormikValues,
                      ...values,
                    }));
                  }}
                  validationSchema={folioSuscriptionCTCStepValidation}
                />
              )}
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
