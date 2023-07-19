import { useEffect, useState } from 'react';
import api from '../Services/api';

export const useApi = (URL) => {
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setFetching(true);
    const fetchApi = async () => {
      const apiResponse = await api.getApiResource(URL);
      // console.error({ apiResponse })
      const { data } = apiResponse;
      setData(data);
      setFetching(false);
    };

    fetchApi();
  }, [URL]);

  return {
    fetching,
    data,
  };
};
