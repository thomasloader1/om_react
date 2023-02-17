import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import { fireToast } from './useSwal';

export const useProgress = () => {
  const { id } = useParams();
  const { appEnv, setAppEnv } = useContext(AppContext);
  const [fetching, setFetching] = useState(false);
  const progressId = Number(id);
  const navigate = useNavigate();

  const getProgress = async () => {
    setFetching(true);
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

      navigate('/vp/error');
      console.groupEnd();
    } finally {
      setFetching(false);
    }
  };

  return { fetching, progressId, appEnv, getProgress };
};
