import axios from 'axios';
import { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import { useSwal } from './useSwal';

const { NODE_ENV, REACT_APP_API } = process.env;
const isProduction = NODE_ENV === 'production';

const apiStepConversionContact = isProduction
  ? `${REACT_APP_API}/api/db/stepConversionContact`
  : '/api/db/stepConversionContact';
const apiConvertLeadZohoCRM = isProduction
  ? `${REACT_APP_API}/api/convertLeadZohoCRM`
  : '/api/convertLeadZohoCRM';
const apiUpdateEntityIdContactSales = isProduction
  ? `${REACT_APP_API}/api/updateEntityIdContactSales`
  : '/api/updateEntityIdContactSales';

export const useContact = () => {
  // const { updateProgress } = useProgress();
  const [fetching, setFetching] = useState(false);
  const { id } = useParams();
  const { modalAlert } = useSwal();

  const ctx = useContext(AppContext);

  const createContactSales = async (values) => {
    console.log('createContactSales', { values });

    setFetching(true);
    try {
      const { data } = await axios.post(
        apiStepConversionContact,
        {
          idPurchaseProgress: id,
          ...values,
          step_number: 4,
        },
        { headers: { Authorization: ctx.tokenLogin } }
      );
      const { contact, lead, progress } = data;

      ctx.setAppEnv((prevState) => ({
        ...prevState,
        ...progress,
        lead: { ...lead },
        contact: { ...contact },
      }));

      createContactCRM(contact, lead.entity_id_crm, progress);
    } catch (e) {
      console.log({ e });
      const { message } = e.response.data;
      modalAlert(message, 'error');
      setFetching(false);
    }
  };
  const createContactCRM = async (contact, leadId, progress) => {
    console.log({ contact, leadId });
    // console.log(responseCreateLeadSales);

    try {
      const { data } = await axios.post(
        apiConvertLeadZohoCRM,
        {
          idPurchaseProgress: id,
          contact,
          lead_id: leadId,
        },
        { headers: { Authorization: ctx.tokenLogin } }
      );

      const { contact: contactResponse } = data;
      updateEntityIdCRMContactSales(contact, contactResponse.id, progress);
    } catch (e) {
      console.log({ e });

      const { message } = e.response.data;
      modalAlert(message, 'error');
      setFetching(false);
    }
  };

  const updateEntityIdCRMContactSales = async (contact, id, progress) => {
    try {
      contact.entity_id_crm = id;
      const resEntityIdLeadCRM = await axios.post(
        apiUpdateEntityIdContactSales,
        { ...contact, progress },
        { headers: { Authorization: ctx.tokenLogin } }
      );
    } catch (e) {
      console.log({ e });

      const { message } = e.data;
      modalAlert(message, 'error');
    } finally {
      setFetching(false);
    }
  };

  return { fetching, createContactSales };
};
