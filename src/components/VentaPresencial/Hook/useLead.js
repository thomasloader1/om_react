import axios from 'axios';
import { useContext, useState } from 'react';
import { useSwal } from './useSwal';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import { useParams } from 'react-router';

export const useLead = () => {
  const { setAppEnv } = useContext(AppContext);
  const [fetching, setFetching] = useState(false);
  const { modalAlert } = useSwal();
  const { id } = useParams();

  const createLeadSales = async (dataLead) => {
    setFetching(true);

    try {
      const { data } = await axios.post(
        '/api/db/stepCreateLead',
        { idPurchaseProgress: id,...dataLead, step_number: 3}
      );

      const { progress,newOrUpdatedLead, lead_id } = data;
      
      setAppEnv((prevEnv) => ({
        ...prevEnv,
        lead: { ...newOrUpdatedLead },
        lead_id,
        ...progress
      }));
        createLeadCRM(
            dataLead,
            lead_id,
            newOrUpdatedLead
        );
    } catch (e) {
      console.log(e);
      const { message } = e.response.data;
      modalAlert(message, 'error');
      setFetching(false);
    }
  };
 
  const createLeadCRM = async (dataLead, leadId, newOrUpdatedLead) => {
    console.log(dataLead);
    // console.log(responseCreateLeadSales);
    let request = { leadId, ...dataLead };
    try {
      const resCreateLeadCRM = await axios.post(
        '/api/createLeadZohoCRM',
        request
      );

      updateEntityIdCRMLeadSales(
        { leadId, ...newOrUpdatedLead },
        resCreateLeadCRM
      );
    } catch (e) {
      const { message } = e.response.data;
      modalAlert(message, 'error');
      setFetching(false);
    }
  };

  const updateEntityIdCRMLeadSales = async (dataLead, resCreateLeadCRM) => {
    try {
      dataLead.entity_id_crm = resCreateLeadCRM.data.id;
      const resEntityIdLeadCRM = await axios.post(
        '/api/updateEntityIdLeadVentas',
        {
          ...dataLead,
        }
      );
    } catch (e) {
      const { message } = e.response.data;
      modalAlert(message, 'error');
      setFetching(false);
    } finally {
      setFetching(false);
    }
  };

  return { fetching, createLeadSales };
};
