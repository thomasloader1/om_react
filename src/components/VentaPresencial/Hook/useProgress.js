import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import { useSwal } from './useSwal';

export const useProgress = () => {
  const { id } = useParams();
  const { appEnv, setAppEnv } = useContext(AppContext);

  const [fetching, setFetching] = useState(false);
  const progressId = Number(id);
  const navigate = useNavigate();
  const { fireErrorToast } = useSwal();

  const createProgress = async () => {
    console.log("createProgress")
   
    try {
      const { data } = await axios.post('/api/progress', { step_number: 1 });
      navigate(`/ventapresencial/${data.id}`);
    } catch (e) {
      console.log({ e });
      fireErrorToast(`${JSON.stringify(e, null, 2)}`);
    } finally {
      setFetching(false);
    }
  };

  const getProgress = async () => {

    try{
      const progress = await axios.get(`/api/progress/${progressId}`)
      console.log('getProgress', { progress });
      setAppEnv((prevState) => ({
        ...prevState,
        ...progress,
      }));
    }catch(e){
      console.group("getProgress(): catch",{e})
      if(typeof id === 'undefined'){
        createProgress();
      }
      console.groupEnd()
    }finally{
      setFetching(false)
    }
    
  };

  const updateProgress = async (values, step) => {
    axios
      .put(`/api/progress/${id}`, { ...values, step_number: step })
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
    
    console.log('useEffect en useProgress()',{id, progressId})

    const prepareProgress = async () =>{
      if (typeof id === 'undefined') {
        await createProgress();
        return;
      }
  
      getProgress();
    }
    
    prepareProgress();
  }, [progressId]);

  return { fetching, appEnv, updateProgress, getProgress, createProgress };
};
