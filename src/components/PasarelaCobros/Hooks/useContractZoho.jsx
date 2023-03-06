import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../Provider/StateProvider';

const {
  REACT_APP_OCEANO_URL,
  REACT_APP_OCEANO_OBTAINDATA,
  REACT_APP_OCEANO_OBTAINDATA_TEST,
  NODE_ENV,
} = process.env;

export const useContractZoho = (contractId, runEffect = true) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { setContractData } = useContext(AppContext)
  const body = new FormData();
  body.append('key', '9j9fj0Do204==3fja134');
  body.append('id', contractId);

  const URL =
    NODE_ENV === 'production'
      ? `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_OBTAINDATA}`
      : `${REACT_APP_OCEANO_OBTAINDATA_TEST}`;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(URL, body, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        setData(response.data);
        setContractData(response.data)

      } catch (e) {
        setError(e.response.data)
      } finally {
        setLoading(false);
      }


    };

    if (runEffect) {
      fetchData();
    }
  }, [contractId]);



  return { data, loading, error };
};