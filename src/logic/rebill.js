import axios from 'axios';
import { REBILL_CONF } from '../components/PasarelaCobros/Hooks/useRebill';

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