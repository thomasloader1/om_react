import { parsePhoneNumber } from 'react-phone-number-input';
import { getDocumentType, getIsoCode } from '../../../logic/rebill';
import { generateURL } from '../Helpers/generateURL';

const {
  NODE_ENV,
  REACT_APP_OCEANO_SETCONTRACTSTATUS,
  REACT_APP_OCEANO_STRIPESUBSCRIPTION,
  REACT_APP_OCEANO_UPDATECONTRACT_MP,
  REACT_APP_OCEANO_UPDATECONTRACT_ST,
  REACT_APP_OCEANO_GENERATELINK,
  REACT_APP_OCEANO_GETPAYMENTLINK,
  REACT_APP_OCEANO_PAYMENT_PENDING,
  REACT_APP_REBILL_STRIPE_TEST_1,
  REACT_APP_REBILL_STRIPE_TEST_3,
  REACT_APP_REBILL_STRIPE_TEST_6,
  REACT_APP_REBILL_STRIPE_TEST_9,
  REACT_APP_REBILL_STRIPE_TEST_12,
  REACT_APP_REBILL_STRIPE_CL_TEST_1,
  REACT_APP_REBILL_STRIPE_CL_TEST_3,
  REACT_APP_REBILL_STRIPE_CL_TEST_6,
  REACT_APP_REBILL_STRIPE_CL_TEST_8,
  REACT_APP_REBILL_STRIPE_PRD_1,
  REACT_APP_REBILL_STRIPE_PRD_3,
  REACT_APP_REBILL_STRIPE_PRD_6,
  REACT_APP_REBILL_STRIPE_PRD_9,
  REACT_APP_REBILL_STRIPE_PRD_12,
  REACT_APP_REBILL_STRIPE_CL_PRD_1,
  REACT_APP_REBILL_STRIPE_CL_PRD_3,
  REACT_APP_REBILL_STRIPE_CL_PRD_6,
  REACT_APP_REBILL_STRIPE_CL_PRD_8,
  REACT_APP_REBILL_MP_PRD_1,
  REACT_APP_REBILL_MP_PRD_3,
  REACT_APP_REBILL_MP_PRD_6,
  REACT_APP_REBILL_MP_PRD_9,
  REACT_APP_REBILL_MP_PRD_12,
  REACT_APP_REBILL_MP_TEST_1,
  REACT_APP_REBILL_MP_TEST_3,
  REACT_APP_REBILL_MP_TEST_6,
  REACT_APP_REBILL_MP_TEST_9,
  REACT_APP_REBILL_MP_TEST_12,
  REACT_APP_REBILL_MP_CL_PRD_1,
  REACT_APP_REBILL_MP_CL_PRD_3,
  REACT_APP_REBILL_MP_CL_PRD_6,
  REACT_APP_REBILL_MP_CL_PRD_8,
  REACT_APP_REBILL_MP_CL_TEST_1,
  REACT_APP_REBILL_MP_CL_TEST_3,
  REACT_APP_REBILL_MP_CL_TEST_6,
  REACT_APP_REBILL_MP_CL_TEST_8,
  REACT_APP_REBILL_MP_AR_PRD_1,
  REACT_APP_REBILL_MP_AR_PRD_3,
  REACT_APP_REBILL_MP_AR_PRD_6,
  REACT_APP_REBILL_MP_AR_PRD_9,
  REACT_APP_REBILL_MP_AR_PRD_12,
  REACT_APP_REBILL_MP_AR_PRD_18,
  REACT_APP_REBILL_MP_AR_PRD_24,
  REACT_APP_REBILL_MP_AR_TEST_1,
  REACT_APP_REBILL_MP_AR_TEST_3,
  REACT_APP_REBILL_MP_AR_TEST_6,
  REACT_APP_REBILL_MP_AR_TEST_9,
  REACT_APP_REBILL_MP_AR_TEST_12,
  REACT_APP_REBILL_MP_AR_TEST_18,
  REACT_APP_REBILL_MP_AR_TEST_24,
  REACT_APP_REBILL_TEST_ORG_ID,
  REACT_APP_REBILL_TEST_API_KEY,
  REACT_APP_REBILL_TEST_API_URL,
  REACT_APP_REBILL_TEST_TOKEN,
  REACT_APP_REBILL_PRD_ORG_ID,
  REACT_APP_REBILL_PRD_API_KEY,
  REACT_APP_REBILL_PRD_API_URL,
  REACT_APP_REBILL_PRD_TOKEN,
} = process.env;

const itsProduction = NODE_ENV === 'production';

export const URLS = {
  MP: generateURL(REACT_APP_OCEANO_UPDATECONTRACT_MP),
  STRIPE: generateURL(REACT_APP_OCEANO_STRIPESUBSCRIPTION),
  UPDATE_CONTRACT: generateURL(REACT_APP_OCEANO_UPDATECONTRACT_ST),
  SET_CONTRACT_STATUS: generateURL(REACT_APP_OCEANO_SETCONTRACTSTATUS),
  GENERATE_LINK: generateURL(REACT_APP_OCEANO_GENERATELINK),
  GET_PAYMENT_LINK: generateURL(REACT_APP_OCEANO_GETPAYMENTLINK),
  PENDING_PAYMENT: generateURL(REACT_APP_OCEANO_PAYMENT_PENDING),
};



export const REBILL_CONF = {
  ORG_ID: itsProduction ? REACT_APP_REBILL_PRD_ORG_ID : REACT_APP_REBILL_TEST_ORG_ID,
  API_KEY: itsProduction ? REACT_APP_REBILL_PRD_API_KEY : REACT_APP_REBILL_TEST_API_KEY,
  URL: itsProduction ? REACT_APP_REBILL_PRD_API_URL : REACT_APP_REBILL_TEST_API_URL,
  TOKEN: itsProduction ? REACT_APP_REBILL_PRD_TOKEN : REACT_APP_REBILL_TEST_TOKEN,
};

const PRICES = {
  STRIPE: {
    MX: {
      1: itsProduction ? REACT_APP_REBILL_STRIPE_PRD_1 : REACT_APP_REBILL_STRIPE_TEST_1,
      3: itsProduction ? REACT_APP_REBILL_STRIPE_PRD_3 : REACT_APP_REBILL_STRIPE_TEST_3,
      6: itsProduction ? REACT_APP_REBILL_STRIPE_PRD_6 : REACT_APP_REBILL_STRIPE_TEST_6,
      9: itsProduction ? REACT_APP_REBILL_STRIPE_PRD_9 : REACT_APP_REBILL_STRIPE_TEST_9,
      12: itsProduction ? REACT_APP_REBILL_STRIPE_PRD_12 : REACT_APP_REBILL_STRIPE_TEST_12,
    },
    CL: {
      1: itsProduction ? REACT_APP_REBILL_STRIPE_CL_PRD_1 : REACT_APP_REBILL_STRIPE_CL_TEST_1,
      3: itsProduction ? REACT_APP_REBILL_STRIPE_CL_PRD_3 : REACT_APP_REBILL_STRIPE_CL_TEST_3,
      6: itsProduction ? REACT_APP_REBILL_STRIPE_CL_PRD_6 : REACT_APP_REBILL_STRIPE_CL_TEST_6,
      8: itsProduction ? REACT_APP_REBILL_STRIPE_CL_PRD_8 : REACT_APP_REBILL_STRIPE_CL_TEST_8,
    },
  },
  MP: {
    MX: {
      1: itsProduction ? REACT_APP_REBILL_MP_PRD_1 : REACT_APP_REBILL_MP_TEST_1,
      3: itsProduction ? REACT_APP_REBILL_MP_PRD_3 : REACT_APP_REBILL_MP_TEST_3,
      6: itsProduction ? REACT_APP_REBILL_MP_PRD_6 : REACT_APP_REBILL_MP_TEST_6,
      9: itsProduction ? REACT_APP_REBILL_MP_PRD_9 : REACT_APP_REBILL_MP_TEST_9,
      12: itsProduction ? REACT_APP_REBILL_MP_PRD_12 : REACT_APP_REBILL_MP_TEST_12,
    },
    CL: {
      1: itsProduction ? REACT_APP_REBILL_MP_CL_PRD_1 : REACT_APP_REBILL_MP_CL_TEST_1,
      3: itsProduction ? REACT_APP_REBILL_MP_CL_PRD_3 : REACT_APP_REBILL_MP_CL_TEST_3,
      6: itsProduction ? REACT_APP_REBILL_MP_CL_PRD_6 : REACT_APP_REBILL_MP_CL_TEST_6,
      8: itsProduction ? REACT_APP_REBILL_MP_CL_PRD_8 : REACT_APP_REBILL_MP_CL_TEST_8,
    },
    AR: {
      1: itsProduction ? REACT_APP_REBILL_MP_AR_PRD_1 : REACT_APP_REBILL_MP_AR_TEST_1,
      3: itsProduction ? REACT_APP_REBILL_MP_AR_PRD_3 : REACT_APP_REBILL_MP_AR_TEST_3,
      6: itsProduction ? REACT_APP_REBILL_MP_AR_PRD_6 : REACT_APP_REBILL_MP_AR_TEST_6,
      9: itsProduction ? REACT_APP_REBILL_MP_AR_PRD_9 : REACT_APP_REBILL_MP_AR_TEST_9,
      12: itsProduction ? REACT_APP_REBILL_MP_AR_PRD_12 : REACT_APP_REBILL_MP_AR_TEST_12,
      18: itsProduction ? REACT_APP_REBILL_MP_AR_PRD_18 : REACT_APP_REBILL_MP_AR_TEST_18,
      24: itsProduction ? REACT_APP_REBILL_MP_AR_PRD_24 : REACT_APP_REBILL_MP_AR_TEST_24,
    },
  },
};

export const getPlanPrice = (formikValues, sale) => {
  const { payment_method, advanceSuscription } = formikValues;
  const countryPayment = getIsoCode(formikValues.country);
  const gateway = payment_method;
  const isStripe = gateway.includes('Stripe');
  const quotes = Number(formikValues.quotes);

  const priceQuantity = advanceSuscription.isAdvanceSuscription
    ? advanceSuscription.firstQuoteDiscount
    : Number(Math.floor(sale.Grand_Total / quotes));

  console.log('getPlanPrice', formikValues, { countryPayment, priceQuantity });

  return {
    id: isStripe ? PRICES.STRIPE[countryPayment][quotes] : PRICES.MP[countryPayment][quotes],
    quantity: priceQuantity,
  };
};

export const getPlanPriceCheckout = (formikValues, sale) => {
  const { payment_method, advanceSuscription } = formikValues;
  console.log({ formikValues });
  const countryPayment = getIsoCode(formikValues.country);

  const gateway = payment_method;
  const isStripe = gateway.includes('Stripe');
  const quotes = Number(formikValues.quotes);

  const priceQuantity = advanceSuscription.isAdvanceSuscription
    ? advanceSuscription.info.firstQuoteDiscount
    : Number(Math.floor(sale.Grand_Total / quotes));

  console.group('getPlanPriceCheckout');
  console.log({ formikValues });
  console.log({ priceQuantity });
  console.groupEnd();

  return {
    id: isStripe ? PRICES.STRIPE[countryPayment][quotes] : PRICES.MP[countryPayment][quotes],
    quantity: priceQuantity,
  };
};

export const mappingFields = ({ formAttributes, contact, formikValues }) => {
  console.log({ formAttributes, contact, formikValues });
  const [number] = formAttributes.address.split(' ').filter((s) => !isNaN(s) && s);
  const [...street] = formAttributes.address.split(' ').filter((s) => isNaN(s) && s);
  const { phoneNumber } = formAttributes;
  const { countryCallingCode, nationalNumber } = phoneNumber;
  const { type } = getDocumentType(formAttributes.country);

  return {
    firstName: contact.First_Name,
    lastName: contact.Last_Name,
    email: formAttributes.email,
    phone: {
      countryCode: countryCallingCode,
      areaCode: '11',
      phoneNumber: nationalNumber,
    },
    birthday: contact.Date_of_Birth,
    taxId: {
      type: 'CUIT',
      value: '20' + formAttributes.dni.replace("-", "") + '9',
    },
    personalId: {
      type,
      value: `${formAttributes.dni.replace("-", "")}`,
    },
    address: {
      street: street.join(' '),
      number: number,
      floor: '0',
      apt: '0',
      city: formikValues.country,
      state: formikValues.country,
      zipCode: formAttributes.zip,
      country: formikValues.country,
      description: 'Pago en la plataforma de SPP MSK',
    },
  };
};

export const mappingCheckoutFields = ({ paymentLinkCustomer, contact, checkout }) => {
  const [number] = paymentLinkCustomer.address.split(' ').filter((s) => !isNaN(s) && s);
  const [...street] = paymentLinkCustomer.address.split(' ').filter((s) => isNaN(s) && s);
  const { countryCallingCode, nationalNumber } = parsePhoneNumber(paymentLinkCustomer.phone);
  const { type } = getDocumentType(checkout.country);

  //console.log({ countryCallingCode, nationalNumber })
  /*
  contact.First_Name 
  contact.Last_Name
  */
  return {
    firstName: contact.First_Name,
    lastName: contact.Last_Name,
    email: paymentLinkCustomer.email,
    phone: {
      countryCode: countryCallingCode,
      areaCode: '11',
      phoneNumber: nationalNumber,
    },
    birthday: contact.Date_of_Birth,
    taxId: {
      type: 'CUIT',
      value: '20' + paymentLinkCustomer.personalId + '9',
    },
    personalId: {
      type,
      value: paymentLinkCustomer.personalId,
    },
    address: {
      street: street.join(' '),
      number: number,
      floor: '0',
      apt: '0',
      city: checkout.country,
      state: checkout.country,
      zipCode: paymentLinkCustomer.zip,
      country: checkout.country,
      description: 'Pago en la plataforma de CHECKOUT LINK SPP MSK ',
    },
  };
};
