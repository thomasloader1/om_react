import axios from 'axios';
import { useEffect, useState } from 'react';

export const useApi = (URL) => {
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setFetching(true);
    const fetchApi = async () => {
      const apiResponse = await axios.get(URL);
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
