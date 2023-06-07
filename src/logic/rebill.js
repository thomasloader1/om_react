import axios from 'axios';
import { REBILL_CONF } from '../components/PasarelaCobros/Hooks/useRebill';
import { URLS } from '../components/PasarelaCobros/Hooks/useRebill';

export const handleSuscriptionUpdate = async (subscriptionId, advancedSuscription) => {
  const URL = `https://api.rebill.to/v2/subscriptions/${subscriptionId}`;

  const { payPerMonthAdvance } = advancedSuscription;
  const headers = {
    Authorization: `Bearer ${REBILL_CONF.TOKEN}`,
    accept: 'application/json',
    'content-type': 'application/json',
  };

  try {
    const response = await axios.put(URL, { quantity: payPerMonthAdvance }, { headers });
    console.log("rebill.js: ", { response });
  } catch (e) {
    console.error({ e });
  }
};

export const handleSetContractStatus = (payment,contractId) => {
    const { SET_CONTRACT_STATUS } = URLS;
    const {status} = payment;
    console.log(`${SET_CONTRACT_STATUS}`, {statusPay: status ,contractId});
    const postSetContractStatus = {
      status: status === 'SUCCEEDED'? "Contrato Efectivo": 
              status === 'FAILED'? "Pago Rechazado": 
              "Contrato Pendiente",
          // status === 'REJECTED' || status === 'DENIED'? "Contrato Rechazado": "",
      contractId
    };
    axios.post(SET_CONTRACT_STATUS, postSetContractStatus).then((res) => {
        console.log({ res });
        console.log('Actualizacion del estado de pago en apipayments', 'success', 5000);
    }).catch((err) => {
        console.log("Actualizacion del estado de pago en apipayments", { err });
        console.log('Contrato no actualizado', 'error', 5000);
    });
  };