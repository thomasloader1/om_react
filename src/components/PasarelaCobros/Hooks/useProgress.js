import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import { fireToast } from './useSwal';
const {
  NODE_ENV,
  REACT_APP_OCEANO_URL,
  REACT_APP_OCEANO_PROGRESS,
  REACT_APP_OCEANO_PROGRESS_LOCAL,
} = process.env;

const PROGRESS =
  NODE_ENV === 'production'
    ? `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_PROGRESS}`
    : `${REACT_APP_OCEANO_PROGRESS_LOCAL}`;

export const useProgress = () => {
  const {
    userInfo,
    setUserInfo,
    setOptions,
    options: optionsGlobal,
    stepNumber,
    setStepNumber,
  } = useContext(AppContext);
  const { id } = useParams();
  const { appEnv, setAppEnv, setContractData } = useContext(AppContext);
  const [fetching, setFetching] = useState(false);

  // updateSideItemStep
  const progressId = Number(id);
  const navigate = useNavigate();

  const getProgress = async () => {
    setFetching(true);
    try {
      const response = await axios.get(`${PROGRESS}/${progressId}`);
      const { data } = response;
      console.log('getProgress', { data });
      const { progress, lead, contact, contract, products } = data;

      if (Number(progress.step_number) === 5) {
        setAppEnv((prevState) => ({
          ...prevState,
          ...progress,
          lead,
          contact,
          contract,
          products,
        }));

        const [countryMatched] = optionsGlobal.countryOptions.filter(
          (cp) => progress.country === cp.value,
        );
        const [_, iso] = countryMatched.idElement.split('_');

        optionsGlobal.sideItemOptions[0].value = progress.country;
        optionsGlobal.sideItemOptions[0].status = 'completed';
        optionsGlobal.sideItemOptions[1].status = 'current';

        setOptions({ ...optionsGlobal });
        setUserInfo({
          ...userInfo,
          stepOne: {
            ...userInfo.stepOne,
            value: progress.country,
            isoRef: iso,
          },
        });

        setStepNumber(1);
      } else {
        throw new Error('El progreso no tiene datos suficientes para seguir con el pago.');
      }
    } catch (e) {
      console.group('getProgress(): catch', { e });
      navigate('/vp/error');
      fireToast(e.response.data);
      console.groupEnd();
    } finally {
      setFetching(false);
    }
  };

  return { fetching, progressId, appEnv, getProgress };
};
