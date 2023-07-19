import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import { useSwal } from './useSwal';
import useToken from './useToken';

const { NODE_ENV, REACT_APP_API } = process.env;
const isProduction = NODE_ENV === 'production';

const apiProgress = isProduction
  ? `${REACT_APP_API}/api/progress`
  : '/api/progress';

export const useProgress = () => {
  const { id } = useParams();
  const { appEnv, setAppEnv, user } = useContext(AppContext);
  const { getTokenFromLS } = useToken();

  const [fetching, setFetching] = useState(false);
  const progressId = Number(id);
  const navigate = useNavigate();
  const { fireErrorToast } = useSwal();
  const { validateToken } = useToken();

  //console.log({ progressId, user });

  const createProgress = async () => {
    try {
      const { data } = await axios.post(apiProgress, {
        step_number: 1,
        user_id: user.id,
      });

      navigate(`/ventapresencial/${data.id}`);
      //navigate(`/ventapresencial/${data.id}`);
    } catch (e) {
      console.log({ e });
      fireErrorToast(`${JSON.stringify(e, null, 2)}`);
    } finally {
      setFetching(false);
    }
  };

  const getProgress = async () => {
    const tokenLogin = getTokenFromLS();
    try {
      const response = await axios.get(`${apiProgress}/${progressId}`, {
        headers: { Authorization: `Bearer ${tokenLogin}` },
      });
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
      if (
        (typeof id === 'undefined' && e.response.status !== 401) ||
        e.response.status === 404
      ) {
        createProgress();
      }
      console.groupEnd();
    } finally {
      setFetching(false);
    }
  };

  const updateProgress = async (values, step) => {
    try {
      const { data } = await axios.put(`${apiProgress}/${id}`, {
        ...values,
        step_number: step,
      });
      // console.log({ data });

      setAppEnv((prevState) => ({
        ...prevState,
        ...data,
      }));
    } catch (e) {
      console.log({ e });
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    setFetching(true);

    //console.log('useEffect en useProgress()', { id, progressId });

    const prepareProgress = async () => {
      const isTokenValid = await validateToken();
      console.log({ isTokenValid, progressIdIsNaN: Number.isNaN(progressId) });
      if (!isTokenValid) {
        navigate('/vp/login');
        return;
      }

      if (Number.isNaN(progressId)) {
        navigate('/ventapresencial');
      }

      if (typeof id === 'undefined') {
        await createProgress();
        return;
      }

      getProgress();
    };

    prepareProgress();
  }, [progressId]);

  return { fetching, appEnv, updateProgress, getProgress, createProgress };
};
