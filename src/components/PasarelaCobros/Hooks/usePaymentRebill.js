import axios from 'axios';
import { useState, useEffect } from 'react';
import { fireModalAlert, fireToast } from '../Hooks/useSwal'
import { REBILL_CONF } from './useRebill';

export const usePaymentRebill = (paymentId, runEffect = true) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const URL = `https://api.rebill.to/v2/payments/${paymentId}`;
            const headers = {
                Authorization: `Bearer ${REBILL_CONF.TOKEN}`,
                accept: 'application/json',
                'content-type': 'application/json',
            };

            try {
                const response = await axios.get(URL, { headers });
                setData(response.data);
                fireToast(`Pago cargado`, 'info')
                setLoading(false);

                console.log("usePaymentRebill: ", { response });
            } catch (e) {
                console.error({ e });
                fireModalAlert(e.response.data.detail)
                setError(e.response.data);
                setLoading(false);
            }

        };

        if (runEffect) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [paymentId]);

    return { data, loading, error };
};
