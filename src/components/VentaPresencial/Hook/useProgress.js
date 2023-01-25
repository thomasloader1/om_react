import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';

export const useProgress = () => {
  const { id } = useParams();
  const { appEnv, setAppEnv, stepNumberGlobal } = useContext(AppContext);
  const [fetching, setFetching] = useState(false);
  const progressId = Number(id);
  const navigate = useNavigate();

  const createProgress = async () => {
    const { data } = await axios.post('/api/progress', { step: 1 });
    setFetching(false);
    navigate(`/ventapresencial/${data.id}`);
  };

  const getProgress = async () => {
    axios
      .get(`/api/progress/${progressId}`)
      .then(({ data }) => {
        setAppEnv((prevState) => ({
          ...prevState,
          ...data,
        }));
      })
      .catch(() => {
        createProgress();
      })
      .finally(() => setFetching(false));
  };

  const updateProgress = async (values) => {
    axios
      .put(`/api/progress/${id}`, { ...values })
      .then((data) => {
        console.log({ responseOfPut: data });

        setAppEnv((prevState) => ({
          ...prevState,
          ...values,
        }));
      })
      .catch((err) => {
        console.log({ err });
      })
      .finally(() => setFetching(false));
  };

  useEffect(() => {
    setFetching(true);

    if (id === undefined) {
      createProgress();
      return;
    }

    getProgress();
  }, []);

  return { fetching, appEnv, updateProgress, getProgress };
};
