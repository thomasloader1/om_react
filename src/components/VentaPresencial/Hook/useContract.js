import axios from 'axios';
import { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import { useSwal } from './useSwal';

export const useContract = () => {
  const [fetching, setFetching] = useState(false);
  const { id } = useParams();
  const { selectedCourses } = useContext(AppContext);

  const { modalAlert } = useSwal();

  const createContractSales = async (values) => {
    console.log('createContractSales', { values });

    setFetching(true);

    try {
      const { data } = await axios.post('/api/db/stepConversionContract', {
        idPurchaseProgress: id,
        products: selectedCourses,
        step_number: 4,
      });
      console.log({ data });
      const { contact, contact_id, lead } = data;

      createContractCRM(contact_id, contact, lead);
    } catch (e) {
      console.log(e);
      const { message } = e.response.data;
      modalAlert(message, 'error');
      setFetching(false);
    }

    const createContractCRM = async (contact_id, contact, lead) => {
      console.log({ contact, contact_id, lead });
      // console.log(responseCreateLeadSales);
      try {
        const { data } = await axios.post('/api/createContactZohoCRM', {
          ...contact,
          ...contact_id,
          ...lead,
        });
        const { id, result } = data;
        updateEntityIdCRMContactSales(contact, id);
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
  };
  return { fetching, createContractSales };
};
