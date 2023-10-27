import axios from 'axios';
import { generateURL } from '../components/PasarelaCobros/Helpers/generateURL';
import availableCards from '../img/pasarelaCobros/imgpsh_fullsize_anim.png';
import { generateReferencePTP } from '../components/PasarelaCobros/Helpers/generateReferencePTP';

export const ptpImages = {
  availableCards,
};

export const ptpCurrencyOptions = {
  style: 'currency',
  currency: 'USD',
};

export const ptpStates = {
  OK: 'APPROVED',
  PENDING: 'PENDING',
  REJECT: 'REJECTED',
  FAIL: 'FAILED',
};

const {
  REACT_APP_OCEANO_UPDATECONTRACT_PTP,
  REACT_APP_API_PTP_SESSION_SU_PAYMENT,
  REACT_APP_API_PTP_SESSION,
  REACT_APP_API_PTP_SESSION_SU,
  REACT_APP_API_PTP_RENEW_SESSION_SU,
  REACT_APP_OCEANO_PTP_GENERATELINK,
  REACT_APP_OCEANO_PTP_GETPAYMENTLINK,
  REACT_APP_OCEANO_PTP_UPDATESESSION,
} = process.env;

export const URLS = {
  SUSCRIPTION: generateURL(REACT_APP_API_PTP_SESSION_SU),
  RENEW_SUSCRIPTION: generateURL(REACT_APP_API_PTP_RENEW_SESSION_SU),
  PAYMENT: generateURL(REACT_APP_API_PTP_SESSION),
  DEBIT: generateURL(REACT_APP_API_PTP_SESSION_SU_PAYMENT),
  GENERATE_LINK: generateURL(REACT_APP_OCEANO_PTP_GENERATELINK),
  GET_PAYMENT_LINK: generateURL(REACT_APP_OCEANO_PTP_GETPAYMENTLINK),
  UPDATE_CONTRACT: generateURL(REACT_APP_OCEANO_UPDATECONTRACT_PTP),
  UPDATE_SESSION: generateURL(REACT_APP_OCEANO_PTP_UPDATESESSION),
};

export const createSession = async (body) => {
  const sessionUrl = body.payment.type.includes('Tradicional') ? URLS.PAYMENT : URLS.SUSCRIPTION;

  try {
    const res = await axios.post(sessionUrl, { ...body });
    //console.log({ res });

    if (res.status === 500) {
      throw new Error(res.statusText);
    }

    return res.data;
  } catch (e) {
    console.log(e);
    return e.response.data.message;
  }
};

export const renewSession = async (body) => {
  const sessionUrl = URLS.RENEW_SUSCRIPTION;

  try {
    const res = await axios.post(sessionUrl, { ...body });
    //console.log({ res });

    if (res.status === 500) {
      throw new Error(res.statusText);
    }

    return res.data;
  } catch (e) {
    console.log(e);
    return e.response.data.message;
  }
};

export const makePaymentSession = async (formikValues) => {
  console.log({ formikValues });
  const type = formikValues.mod.includes('anticipo') ? 'Parcialidad' : formikValues.mod;
  const quotes = formikValues.quotes ? formikValues.quotes : 1;
  const rest_quotes = quotes - 1;

  const reference =
    formikValues?.renewSession?.reference ?? generateReferencePTP(formikValues.sale.SO_Number);
  const payer = {
    name: formikValues.contact.First_Name,
    surname: formikValues.contact.Last_Name,
    email: formikValues.email,
    document: formikValues.dni,
    documentType: formikValues.documentType,
    mobile: formikValues.mobile,
    address: {
      street: formikValues.address,
    },
  };

  const payment = {
    total: formikValues?.renewSession?.total ?? formikValues.sale.Grand_Total,
    type,
    rest_quotes,
    quotes,
  };

  if (type === 'Parcialidad') {
    payment.first_installment = formikValues.advanceSuscription.firstQuoteDiscount;
    payment.remaining_installments = formikValues.advanceSuscription.payPerMonthAdvance;
  } else {
    if (formikValues.renewSuscription) {
      let paymentCalculate = Number(formikValues.renewSession.remaining_installments);
      payment.remaining_installments = paymentCalculate.toFixed(2);
    } else {
      let paymentCalculate = payment.total / payment.quotes;
      payment.remaining_installments = paymentCalculate.toFixed(2);
    }
  }

  try {
    if (formikValues.renewSuscription) {
      const data = await renewSession({
        so: reference,
        payer,
        payment,
        contractId: formikValues.contractId,
      });
      return data;
    }

    const data = await createSession({
      so: reference,
      payer,
      payment,
      contractId: formikValues.contractId,
    });

    return data;
  } catch (e) {
    return e;
  }
};

export const updateSessionPTP = async (body) => {
  try {
    const res = await axios.put(`${URLS.UPDATE_SESSION}/${body.reference}`, { ...body });
    console.log({ rejectSession: res });
    return res;
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

export const debitFirstPayment = async (body) => {
  try {
    console.log({ body });
    const res = await axios.post(URLS.DEBIT, { ...body });
    console.log({ debitFirstPayment: res });
    return res;
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

export const generatePaymentLink = async (data) => {
  //console.log({data})
  const { country, mod, quotes, payment_method, contractId, sale, ptpSession } = data;
  const [statusSession, session] = ptpSession;

  const body = {
    requestId: session.requestId,
    gateway: payment_method,
    type: mod,
    contract_entity_id: contractId,
    contract_so: sale.SO_Number,
    status: 'pending',
    quotes: quotes ?? 1,
    country,
  };

  //console.log({body})

  try {
    const res = await axios.post(URLS.GENERATE_LINK, { ...body });

    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateZohoContract = async (values) => {
  const { data } = await axios.post(URLS.UPDATE_CONTRACT, { ...values });
  console.log({ data });
  return data;
};

export const getMessageStatus = (paymentStatus) => {
  let response = {
    message: "",
    className: "",
  }
  switch (paymentStatus) {
    case ptpStates.PENDING:
      response.message = "El pago realizado está en estado pendiente.";
      response.className = "is-warning";
      break;
    case ptpStates.REJECT:
      response.message = "El pago realizado ha sido rechazado. Por favor, vuelva a comenzar.";
      response.className = "is-danger";
      break;
    default:
      response.message = "El pago realizado ha sido aprobado correctamente.";
      response.className = "is-success";
      break;
  }

  return response;
}
