import { useContext } from 'react';
import { AppContext } from '../Provider/StateProvider';
import axios from 'axios';
import { fireToast } from './useSwal';

const {
  NODE_ENV,
  REACT_APP_OCEANO_GENERATECHECKOUTPRO,
  REACT_APP_OCEANO_GENERATECHECKOUTPRO_TEST,
  REACT_APP_OCEANO_STRIPESUBSCRIPTION,
  REACT_APP_OCEANO_STRIPESUBSCRIPTION_LOCAL,
  REACT_APP_OCEANO_UPDATECONTRACT,
  REACT_APP_OCEANO_UPDATECONTRACT_LOCAL,
  REACT_APP_OCEANO_URL,
  REACT_APP_REBILL_STRIPE_1,
  REACT_APP_REBILL_STRIPE_3,
  REACT_APP_REBILL_STRIPE_6,
  REACT_APP_REBILL_STRIPE_9,
  REACT_APP_REBILL_STRIPE_12,
} = process.env;

const itsProduction = NODE_ENV === 'production';

const URLS = {
  MP: itsProduction
    ? `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_GENERATECHECKOUTPRO}`
    : `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_GENERATECHECKOUTPRO_TEST}`,
  STRIPE: itsProduction
    ? `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_STRIPESUBSCRIPTION}`
    : REACT_APP_OCEANO_STRIPESUBSCRIPTION_LOCAL,
  UPDATE_CONTRACT: itsProduction
    ? `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_UPDATECONTRACT}`
    : REACT_APP_OCEANO_UPDATECONTRACT_LOCAL,
};

const useRebill = () => {
  const { contractData, formikValues, userInfo } = useContext(AppContext);
  const { contact, sale } = contractData;

  const initialization = {
    organization_id: '679d8e12-e0ad-4052-bc9e-eb78f956ce7e' /* your organization ID */,
    api_key: 'bc7d4abf-3a94-4f53-b414-887356b51e0c' /* your API_KEY */,
    api_url: 'https://api.rebill.to/v2' /* Rebill API target */,
  };

  const RebillSDKCheckout = new window.Rebill.PhantomSDK(initialization);

  function initCustomer(customerData) {
    console.log({ customerData });
    const { contact, form } = customerData;
    const [number] = form.address.split(' ').filter((s) => !isNaN(s) && s);
    const [...street] = form.address.split(' ').filter((s) => isNaN(s) && s);
    const { phoneNumber } = form;
    const { countryCallingCode, nationalNumber } = phoneNumber;

    RebillSDKCheckout.setCustomer({
      firstName: contact.First_Name,
      lastName: contact.Last_Name,
      email: contact.Email,
      phone: {
        countryCode: countryCallingCode,
        areaCode: '11',
        phoneNumber: nationalNumber,
      },
      birthday: contact.Date_of_Birth,
      taxId: {
        type: 'CUIT',
        value: '20' + contact.DNI + '9',
      },
      personalId: {
        type: 'DNI',
        value: contact.DNI,
      },
      address: {
        street: street.join(' '),
        number: number,
        floor: '0',
        apt: '0',
        city: formikValues.country,
        state: formikValues.country,
        zipCode: form.zip,
        country: formikValues.country,
        description: '-',
      },
    });

    //Seteo de identidicacion del customer
    RebillSDKCheckout.setCardHolder({
      name: contact.Full_Name,
      identification: {
        type: 'DNI',
        value: contact.DNI,
      },
    });
  }
  function getPlanPrice() {
    switch (formikValues.quotes) {
      case 3:
        return {
          id: REACT_APP_REBILL_STRIPE_3,
          quantity: sale.Grand_Total / formikValues.quotes,
        };
      case 6:
        return {
          id: REACT_APP_REBILL_STRIPE_6,
          quantity: sale.Grand_Total / formikValues.quotes,
        };
      case 9:
        return {
          id: REACT_APP_REBILL_STRIPE_9,
          quantity: sale.Grand_Total / formikValues.quotes,
        };
      case 12:
        return {
          id: REACT_APP_REBILL_STRIPE_12,
          quantity: sale.Grand_Total / formikValues.quotes,
        };
      default:
        return {
          id: REACT_APP_REBILL_STRIPE_1,
          quantity: sale.Grand_Total,
        };
    }
  }

  function initRebill(formAttributes) {
    console.log({ formAttributes });

    //Seteo de customer
    const customerData = { contact, form: formAttributes };
    initCustomer(customerData);

    //Seteo de plan para cobrar
    const { id, quantity } = getPlanPrice();
    RebillSDKCheckout.setTransaction({
      prices: [
        {
          id,
          quantity,
        },
      ],
    }).then((price_setting) => console.log(price_setting));

    //Seteo de callbacks en saco de que el pago este correcto o tengo algun fallo
    const { UPDATE_CONTRACT } = URLS;
    RebillSDKCheckout.setCallbacks({
      onSuccess: ({ invoice, faliedTransaction, pendingTransaction }) => {
        const { paidBags, buyer } = invoice;
        const { payment } = paidBags[0];
        const { customer } = buyer;

        const postUpdateZohoStripe = {
          installments: formikValues.quotes && 1,
          email: customer.userEmail,
          amount: payment.amount,
          contractId: formikValues.contractId,
          subscriptionId: payment.id,
          installment_amount: payment.amount,
          address: '',
          dni: customer.personalIdNumber,
          phone: formAttributes.phone,
          fullname: customer.firstName + ' ' + customer.lastName,
          is_suscri: !userInfo.stepThree.value.includes('Tradicional'),
        };

        axios
          .post(UPDATE_CONTRACT, postUpdateZohoStripe)
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
        console.error(error);
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

  return { initRebill };
};

export default useRebill;
