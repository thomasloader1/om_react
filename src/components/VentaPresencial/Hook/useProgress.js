import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import { useSwal } from './useSwal';
import { useLogin } from './useLogin';

const { NODE_ENV, REACT_APP_API } = process.env;
const isProduction = NODE_ENV === 'production';

const apiProgress = isProduction
  ? `${REACT_APP_API}/api/progress`
  : '/api/progress';

export const useProgress = () => {
  const { id } = useParams();
  const { appEnv, setAppEnv } = useContext(AppContext);
  const { tokenLogin, } = useContext(AppContext);

  const [fetching, setFetching] = useState(false);
  const progressId = Number(id);
  const navigate = useNavigate();
  const { fireErrorToast } = useSwal();


  const createProgress = async () => {
    //console.log('createProgress');

    try {
      const { data } = await axios.post(apiProgress, { step_number: 1 });
      navigate(`/ventapresencial/${data.id}`);
    } catch (e) {
      console.log({ e });
      fireErrorToast(`${JSON.stringify(e, null, 2)}`);
    } finally {
      setFetching(false);
    }
  };

  const getProgress = async () => {
    try {
      const response = await axios.get(
        `${apiProgress}/${progressId}`,
        { headers: { Authorization: tokenLogin } }
      );
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
      if (typeof id === 'undefined' || e.response.status === 404) {
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

  const validateToken = async () => {
    try {
      const tokenLoginFromLS = localStorage.getItem('tokenLogin');

      if (typeof tokenLoginFromLS !== 'undefined' && tokenLoginFromLS !== null) {
        const apiResponse = await axios.get(
          "/api/tokenIsValid", { headers: { Authorization: tokenLoginFromLS } }
        );
        const { data } = apiResponse;
        console.log('isLogedIn', data);
        return true
        // ctx.setIsAuthenticated(true);
      }

    } catch (e) {
      console.log('error isLogedIn', { e });
      // ctx.setIsAuthenticated(false);
      return false
    }
  }




  useEffect(() => {
    setFetching(true);

    //console.log('useEffect en useProgress()', { id, progressId });

    const prepareProgress = async () => {
      const isTokenValid = await validateToken();

      if (typeof id === 'undefined' && isTokenValid) {
        await createProgress();
        return;
      } else {
        navigate("/ventapresencial/login")
      }

      getProgress();
    };

    prepareProgress();
  }, [progressId]);

  return { fetching, appEnv, updateProgress, getProgress, createProgress };
};
