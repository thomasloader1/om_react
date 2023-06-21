import axios from 'axios';
import { REBILL_CONF } from '../components/PasarelaCobros/Hooks/useRebill';
import { URLS } from '../components/PasarelaCobros/Hooks/useRebill';

export const handleSuscriptionUpdate = async (subscriptionId, advancedSuscription) => {
  const URL = `https://api.rebill.to/v2/subscriptions/${subscriptionId}`;
  console.log('handleSuscriptionUpdate', { subscriptionId, advancedSuscription });
  const { payPerMonthAdvance } = advancedSuscription;
  const headers = {
    Authorization: `Bearer ${REBILL_CONF.TOKEN}`,
    accept: 'application/json',
    'content-type': 'application/json',
  };

  try {
    const response = await axios.put(URL, { quantity: payPerMonthAdvance }, { headers });
    console.log('rebill.js: ', { response });
  } catch (e) {
    console.error({ e });
  }
};

export const handleSuscriptionUpdateCheckout = async (subscriptionId, advancedSuscription) => {
  const URL = `https://api.rebill.to/v2/subscriptions/${subscriptionId}`;
  console.log('handleSuscriptionUpdate', { subscriptionId, advancedSuscription });
  const { info } = advancedSuscription;
  const headers = {
    Authorization: `Bearer ${REBILL_CONF.TOKEN}`,
    accept: 'application/json',
    'content-type': 'application/json',
  };

  try {
    const response = await axios.put(URL, { quantity: info.payPerMonthAdvance }, { headers });
    console.log('rebill.js: ', { response });
  } catch (e) {
    console.error({ e });
  }
};

export const handlePendingPayment = async (paymentId) => {
  const URL = `https://api.rebill.to/v2/payments/${paymentId}`;
  const headers = {
    Authorization: `Bearer ${REBILL_CONF.TOKEN}`,
    accept: 'application/json',
    'content-type': 'application/json',
  };

  try {
    const response = await axios.get(URL, { headers });
    console.log('handlePendingPayment: ', { response });
  } catch (e) {
    console.error({ e });
  }
};

export const handleSetContractStatus = (payment, contractId) => {
  const { SET_CONTRACT_STATUS } = URLS;
  const { status } = payment;
  //console.log(`${SET_CONTRACT_STATUS}`, {statusPay: status ,contractId});
  const postSetContractStatus = {
    status:
      status === 'SUCCEEDED'
        ? 'Contrato Efectivo'
        : status === 'FAILED'
        ? 'Pago Rechazado'
        : 'Contrato Pendiente',
    // status === 'REJECTED' || status === 'DENIED'? "Contrato Rechazado": "",
    contractId,
  };

  axios
    .post(SET_CONTRACT_STATUS, postSetContractStatus)
    .then((res) => {
      console.log({ updateContractStatus: res });
    })
    .catch((err) => {
      console.log({ updateContractStatus: err });
    });
};

export const getIsoCode = (country) => {
  const countriesISO = {
    Chile: 'CL',
    México: 'MX',
    Argentina: 'AR',
    Ecuador: 'EC',
  };

  if (country in countriesISO) {
    return countriesISO[country];
  }

  return null;
};

export const getDocumentType = (country) => {
  const countries = {
    Chile: {
      type: 'RUT',
    },
    México: {
      type: 'RFC',
    },
    Argentina: {
      type: 'DNI',
    },
    Ecuador: {
      type: 'NUI',
    },
  };

  console.group('getDocumentType');
  console.log({ country }, countries[country]);
  console.groupEnd();

  if (country in countries) {
    return countries[country];
  }

  return null;
};

export const getCurrency = (country) => {
  const countries = {
    Chile: {
      currency: 'CLP',
    },
    México: {
      currency: 'MXN',
    },
    Argentina: {
      currency: 'ARS',
    },
    Ecuador: {
      currency: 'USD',
    },
  };

  console.group('getCurrency');
  console.log({ country }, countries[country]);
  console.groupEnd();

  if (country in countries) {
    return countries[country];
  }

  return null;
};
