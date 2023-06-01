import axios from 'axios';
import { REBILL_CONF } from '../components/PasarelaCobros/Hooks/useRebill';

export const handleSuscriptionUpdate = async (subscriptionId, advancedSuscription) => {
  const URL = `https://api.rebill.to/v2/subscriptions/${subscriptionId}`;

  const { remainingAmountToPay } = advancedSuscription;
  const headers = {
    Authorization: REBILL_CONF.API_KEY,
    accept: 'application/json',
    'content-type': 'application/json',
  };

  try {
    const response = await axios.put(URL, { amount: remainingAmountToPay }, { headers });

    console.log({ response });
  } catch (e) {
    console.error({ e });
  }
};
