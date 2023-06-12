import { parsePhoneNumber } from 'react-phone-number-input';

const {
  NODE_ENV,
  REACT_APP_OCEANO_SETCONTRACTSTATUS,
  REACT_APP_OCEANO_SETCONTRACTSTATUS_LOCAL,
  REACT_APP_OCEANO_STRIPESUBSCRIPTION,
  REACT_APP_OCEANO_STRIPESUBSCRIPTION_LOCAL,
  REACT_APP_OCEANO_UPDATECONTRACT_MP_LOCAL,
  REACT_APP_OCEANO_UPDATECONTRACT_MP,
  REACT_APP_OCEANO_UPDATECONTRACT_ST,
  REACT_APP_OCEANO_UPDATECONTRACT_ST_LOCAL,
  REACT_APP_OCEANO_GENERATELINK,
  REACT_APP_OCEANO_GENERATELINK_LOCAL,
  REACT_APP_OCEANO_GETPAYMENTLINK,
  REACT_APP_OCEANO_GETPAYMENTLINK_LOCAL,
  REACT_APP_OCEANO_PAYMENT_PENDING,
  REACT_APP_OCEANO_PAYMENT_PENDING_LOCAL,
  REACT_APP_OCEANO_URL,
  REACT_APP_REBILL_STRIPE_TEST_1,
  REACT_APP_REBILL_STRIPE_TEST_3,
  REACT_APP_REBILL_STRIPE_TEST_6,
  REACT_APP_REBILL_STRIPE_TEST_9,
  REACT_APP_REBILL_STRIPE_TEST_12,
  REACT_APP_REBILL_STRIPE_PRD_1,
  REACT_APP_REBILL_STRIPE_PRD_3,
  REACT_APP_REBILL_STRIPE_PRD_6,
  REACT_APP_REBILL_STRIPE_PRD_9,
  REACT_APP_REBILL_STRIPE_PRD_12,
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
  MP: itsProduction
    ? `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_UPDATECONTRACT_MP}`
    : REACT_APP_OCEANO_UPDATECONTRACT_MP_LOCAL,
  STRIPE: itsProduction
    ? `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_STRIPESUBSCRIPTION}`
    : REACT_APP_OCEANO_STRIPESUBSCRIPTION_LOCAL,
  UPDATE_CONTRACT: itsProduction
    ? `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_UPDATECONTRACT_ST}`
    : REACT_APP_OCEANO_UPDATECONTRACT_ST_LOCAL,
  SET_CONTRACT_STATUS: itsProduction
    ? `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_SETCONTRACTSTATUS}`
    : REACT_APP_OCEANO_SETCONTRACTSTATUS_LOCAL,
  GENERATE_LINK: itsProduction
    ? `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_GENERATELINK}`
    : REACT_APP_OCEANO_GENERATELINK_LOCAL,
  GET_PAYMENT_LINK: itsProduction
    ? `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_GETPAYMENTLINK}`
    : REACT_APP_OCEANO_GETPAYMENTLINK_LOCAL,
  PENDING_PAYMENT: itsProduction
    ? `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_PAYMENT_PENDING}`
    : REACT_APP_OCEANO_PAYMENT_PENDING_LOCAL,
};

export const REBILL_CONF = {
  ORG_ID: itsProduction ? REACT_APP_REBILL_PRD_ORG_ID : REACT_APP_REBILL_TEST_ORG_ID,
  API_KEY: itsProduction ? REACT_APP_REBILL_PRD_API_KEY : REACT_APP_REBILL_TEST_API_KEY,
  URL: itsProduction ? REACT_APP_REBILL_PRD_API_URL : REACT_APP_REBILL_TEST_API_URL,
  TOKEN: itsProduction ? REACT_APP_REBILL_PRD_TOKEN : REACT_APP_REBILL_TEST_TOKEN
};

const PRICES = {
  STRIPE: {
    1: itsProduction ? REACT_APP_REBILL_STRIPE_PRD_1 : REACT_APP_REBILL_STRIPE_TEST_1,
    3: itsProduction ? REACT_APP_REBILL_STRIPE_PRD_3 : REACT_APP_REBILL_STRIPE_TEST_3,
    6: itsProduction ? REACT_APP_REBILL_STRIPE_PRD_6 : REACT_APP_REBILL_STRIPE_TEST_6,
    9: itsProduction ? REACT_APP_REBILL_STRIPE_PRD_9 : REACT_APP_REBILL_STRIPE_TEST_9,
    12: itsProduction ? REACT_APP_REBILL_STRIPE_PRD_12 : REACT_APP_REBILL_STRIPE_TEST_12,
  },
  MP: {
    1: itsProduction ? REACT_APP_REBILL_MP_PRD_1 : REACT_APP_REBILL_MP_TEST_1,
    3: itsProduction ? REACT_APP_REBILL_MP_PRD_3 : REACT_APP_REBILL_MP_TEST_3,
    6: itsProduction ? REACT_APP_REBILL_MP_PRD_6 : REACT_APP_REBILL_MP_TEST_6,
    9: itsProduction ? REACT_APP_REBILL_MP_PRD_9 : REACT_APP_REBILL_MP_TEST_9,
    12: itsProduction ? REACT_APP_REBILL_MP_PRD_12 : REACT_APP_REBILL_MP_TEST_12,
  }
}

export const getPlanPrice = (formikValues, sale) => {
  const { payment_method, advanceSuscription } = formikValues;
  console.log("getPlanPrice", formikValues);
  const gateway = payment_method;
  const isStripe = gateway.includes('Stripe');
  const quotes = Number(formikValues.quotes);

  const priceQuantity = advanceSuscription.isAdvanceSuscription
    ? advanceSuscription.firstQuoteDiscount
    : Number(Math.round(sale.Grand_Total / quotes));

  console.log("getPlanPrice, priceQuantity:", priceQuantity);

  switch (quotes) {
    case 3:
      return {
        id: isStripe ? PRICES.STRIPE['3'] : PRICES.MP['3'],
        quantity: priceQuantity,
      };
    case 6:
      return {
        id: isStripe ? PRICES.STRIPE['6'] : PRICES.MP['6'],
        quantity: priceQuantity,
      };
    case 9:
      return {
        id: isStripe ? PRICES.STRIPE['9'] : PRICES.MP['9'],
        quantity: priceQuantity,
      };
    case 12:
      return {
        id: isStripe ? PRICES.STRIPE['12'] : PRICES.MP['12'],
        quantity: priceQuantity,
      };
    default:
      return {
        id: isStripe ? PRICES.STRIPE['1'] : PRICES.MP['1'],
        quantity: sale.Grand_Total,
      };
  }
};
export const mappingFields = ({ formAttributes, contact, formikValues }) => {
  console.log({ formAttributes, contact, formikValues })
  const [number] = formAttributes.address.split(' ').filter((s) => !isNaN(s) && s);
  const [...street] = formAttributes.address.split(' ').filter((s) => isNaN(s) && s);
  const { phoneNumber } = formAttributes;
  const { countryCallingCode, nationalNumber } = phoneNumber;

  /* contact.First_Name
contact.Last_Name */

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
      type: 'DNI',
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
