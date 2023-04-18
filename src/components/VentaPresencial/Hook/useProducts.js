import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import api from '../Services/api';

export const useProducts = (URL, country) => {
  const [fetching, setFetching] = useState(false);
  const { products, setProducts } = useContext(AppContext);

  useEffect(() => {
    setFetching(true);
    const fetchApi = async () => {
      try {
        const apiResponse = await api.getApiResource(URL)
        const { data } = apiResponse;
        setProducts(data);
      } catch (e) {
        console.log({ e });
      } finally {
        setFetching(false);
      }
    };

    fetchApi();
  }, [URL, country]);

  return {
    fetching,
    products,
  };
};
