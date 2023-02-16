import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import { fireToast } from './useSwal';

export const useProgress = () => {
  const { id } = useParams();
  const { appEnv, setAppEnv } = useContext(AppContext);
  const [fetching, setFetching] = useState(false);
  const progressId = Number(id);

  const getProgress = async () => {
    try {
      const response = await axios.get(`/api/progress/${progressId}`);
      const { data } = response;
      console.log('getProgress', { data });
      const { progress, lead, contact, contract, products } = data;

      setAppEnv((prevState) => ({
        ...prevState,
        ...progress,
        lead,
        contact,
        contract,
        products,
      }));
    } catch (e) {
      console.group('getProgress(): catch', { e });
      fireToast(e.response.data);

      console.groupEnd();
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    setFetching(true);
    getProgress();
  }, [progressId]);

  return { fetching, appEnv, getProgress };
};
