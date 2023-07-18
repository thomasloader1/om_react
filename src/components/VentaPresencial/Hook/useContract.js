import axios from 'axios';
import { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import { useSwal } from './useSwal';
import api from '../Services/api';

const { NODE_ENV, REACT_APP_API } = process.env;
const isProduction = NODE_ENV === 'production';

const apiStepConversionContract = isProduction
  ? `${REACT_APP_API}/api/db/stepConversionContract`
  : '/api/db/stepConversionContract';
const apiCreateSaleZohoCRM = isProduction
  ? `${REACT_APP_API}/api/createSaleZohoCRM`
  : '/api/createSaleZohoCRM';

export const useContract = () => {
  const [fetching, setFetching] = useState(false);
  const [completeData, setCompleteData] = useState(null);
  const { id } = useParams();
  const { modalAlert } = useSwal();
  const ctx = useContext(AppContext);

  const createContractSales = async (values) => {
    console.log('createContractSales', { values });
    setFetching(true);
    try {

      const body = {
        idPurchaseProgress: id,
        products: ctx.selectedCourses,
        step_number: 5,
      }

      const data = api.createContractCRM(apiStepConversionContract, body)
      console.log({ data });
      const { contract, progress, products } = data;
      createContractCRM();

      ctx.setAppEnv((prevEnv) => ({
        ...prevEnv,
        contract: { ...contract },
        ...progress,
        products,
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
      const response = await axios.post(
        apiCreateSaleZohoCRM,
        {
          idPurchaseProgress: id,
        },
        { headers: { Authorization: ctx.tokenLogin } }
      );
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
