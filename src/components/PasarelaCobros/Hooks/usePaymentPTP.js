import axios from 'axios';
import { useState, useEffect } from 'react';
import { fireModalAlert, fireToast } from '../Hooks/useSwal';
import { generateURL } from '../Helpers/generateURL';

const { REACT_APP_PTP_STATUS_PAYMENT } = process.env;
const URLS = {
  PTP_STATUS: generateURL(REACT_APP_PTP_STATUS_PAYMENT),
};

export const usePaymentPTP = (requestId, runEffect = true) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const URL = `${URLS.PTP_STATUS}/${requestId}`;

      try {
        const response = await axios.get(URL);
        setData(response.data);
        fireToast(`Pago cargado`, 'info');
        setLoading(false);

        console.log('usePaymentPTP: ', { response });
      } catch (e) {
        console.error({ e });
        fireModalAlert(e.response.data.detail);
        setError(e.response.data);
        setLoading(false);
      }
    };

    if (runEffect) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [requestId]);

  return { data, loading, error };
};
