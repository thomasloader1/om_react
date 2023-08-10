import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../Provider/StateProvider';
import { fireModalAlert, fireToast } from '../Hooks/useSwal'
import { userFlow } from '../../../config/config';
const {
  REACT_APP_OCEANO_URL,
  REACT_APP_OCEANO_OBTAINDATA,
  REACT_APP_API_PAYMENTS_PREFIX_PRD,
  NODE_ENV,
} = process.env;

export const useContractZoho = (contractId, runEffect = true) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { setContractData, ...ctx } = useContext(AppContext);
  const body = new FormData();
  body.append('key', '9j9fj0Do204==3fja134');
  body.append('id', contractId);

  const URL =
    NODE_ENV === 'production'
      ? `${REACT_APP_OCEANO_URL}${REACT_APP_API_PAYMENTS_PREFIX_PRD}${REACT_APP_OCEANO_OBTAINDATA}`
      : `${REACT_APP_OCEANO_OBTAINDATA}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(URL, body, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        setData(response.data);
        setContractData(response.data);
        fireToast(`Contrato de ${response.data.sale.Pais} cargado`, 'info')
        setLoading(false);

      } catch (e) {
        fireModalAlert(e.response.data.detail)
        setError(e.response.data);
        setLoading(true);
      } finally {
      }
    };
    ////console.log({ runEffect })
    if (runEffect) {
      fetchData();
    } else {
      setLoading(false);

    }

    return () => {
      console.log('useContractZoho')
      if (runEffect) {
        setContractData(null)
        ctx.setFormikValues({});
        ctx.setUserInfo(userFlow);
        ctx.setStripeRequest(null);
        ctx.setCheckoutLink('');
        //ctx.setAppEnv(null);
        ctx.setStepNumber(0);
        ctx.setOpenBlockLayer(false);
        ctx.setRebillFetching(null);
      }
    }
  }, [contractId]);

  return { data, loading, error };
};
