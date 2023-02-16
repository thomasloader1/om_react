import axios from 'axios';
import { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import { useSwal } from './useSwal';

export const useContract = () => {
  const [fetching, setFetching] = useState(false);
  const [completeData, setCompleteData] = useState(null);
  const { id } = useParams();
  const { modalAlert } = useSwal();
  const { setAppEnv, selectedCourses } = useContext(AppContext);

  const createContractSales = async (values) => {
    console.log('createContractSales', { values });

    try {
      const { data } = await axios.post('/api/db/stepConversionContract', {
        idPurchaseProgress: id,
        products: selectedCourses,
        step_number: 5,
      });
      console.log({ data });
      const { contract, progress } = data;
      createContractCRM();

      setAppEnv((prevEnv) => ({
        ...prevEnv,
        contract: { ...contract },
        ...progress,
      }));
    } catch (e) {
      console.log({ e });
      const { message } = e.response.data;
      modalAlert(message, 'error');
      setFetching(false);
    }
  };

  const createContractCRM = async () => {
    // console.log(responseCreateLeadSales);
    try {
      const response = await axios.post('/api/createSaleZohoCRM', {
        idPurchaseProgress: id,
      });
      setCompleteData(response.data);
      console.log({ response });
    } catch (e) {
      console.log({ e });
      const { message } = e.response.data;
      modalAlert(message, 'error');
      setFetching(false);
    } finally {
      setFetching(false);
    }
  };

  return { fetching, completeData, createContractSales };
};
