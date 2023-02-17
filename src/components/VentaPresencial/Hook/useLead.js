import axios from 'axios';
import { useContext, useState } from 'react';
import { useSwal } from './useSwal';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import { useParams } from 'react-router';

const { NODE_ENV, REACT_APP_API } = process.env;
const isProduction = NODE_ENV === 'production';

const apiStepCreateLead = isProduction
  ? `${REACT_APP_API}/api/db/stepCreateLead`
  : '/api/db/stepCreateLead';
const apiCreateLeadZohoCRM = isProduction
  ? `${REACT_APP_API}/api/createLeadZohoCRM`
  : '/api/createLeadZohoCRM';
const apiUpdateEntityIdLeadVentas = isProduction
  ? `${REACT_APP_API}/api/updateEntityIdLeadVentas`
  : '/api/updateEntityIdLeadVentas';

export const useLead = () => {
  const { setAppEnv } = useContext(AppContext);
  const [fetching, setFetching] = useState(false);
  const { modalAlert } = useSwal();
  const { id } = useParams();

  const createLeadSales = async (dataLead) => {
    setFetching(true);

    try {
      const { data } = await axios.post(apiStepCreateLead, {
        idPurchaseProgress: id,
        ...dataLead,
        step_number: 3,
      });

      const { progress, newOrUpdatedLead, lead_id } = data;

      setAppEnv((prevEnv) => ({
        ...prevEnv,
        lead: { ...newOrUpdatedLead },
        lead_id,
        ...progress,
      }));
      createLeadCRM(dataLead, lead_id, newOrUpdatedLead);
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
      const resCreateLeadCRM = await axios.post(apiCreateLeadZohoCRM, request);

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
      const resEntityIdLeadCRM = await axios.post(apiUpdateEntityIdLeadVentas, {
        ...dataLead,
      });
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
