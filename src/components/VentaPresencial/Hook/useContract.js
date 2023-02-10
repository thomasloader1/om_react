import axios from 'axios';
import { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import { useSwal } from './useSwal';

export const useContract = () => {
  const [fetching, setFetching] = useState(false);
  const { id } = useParams();
  const { modalAlert } = useSwal();
  const { setAppEnv, selectedCourses } = useContext(AppContext);

  const createContractSales = async (values) => {
    console.log('createContractSales', { values });

    try {
      const { data } = await axios.post('/api/db/stepConversionContract', {
        idPurchaseProgress: id,
        products: selectedCourses,
        step_number: 4,
      });
      const { contract, progress } = data;
      setAppEnv((prevEnv) => ({
        ...prevEnv,
        contract: { ...contract },
        ...progress,
      }));

      createContractCRM(contract_id, contract);
    } catch (e) {
      console.log(e);
      const { message } = e.response.data;
      modalAlert(message, 'error');
      setFetching(false);
    }
  };
  const createContractCRM = async (contract_id, contract) => {
    console.log({ contract_id, contract });
    // console.log(responseCreateLeadSales);
    try {
      const { data } = await axios.post('/api/createContractZohoCRM', {
        contract_id,
        ...contract,
      });
      const { id, result } = data;
      console.log({ data });
      // updateEntityIdCRMContactSales(
      //     contact,
      //     id
      //  );
    } catch (e) {
      const { message } = e.response.data;
      modalAlert(message, 'error');
      setFetching(false);
    }
  };

  const updateEntityIdCRMContactSales = async (contact, id) => {
    try {
      contact.entity_id_crm = id;
      const resEntityIdLeadCRM = await axios.post(
        '/api/updateEntityIdContactSales',
        contact
      );
    } catch (e) {
      const { message } = e.data;
      modalAlert(message, 'error');
      setFetching(false);
    } finally {
      setFetching(false);
    }
  };
  return { fetching, createContractSales };
};
