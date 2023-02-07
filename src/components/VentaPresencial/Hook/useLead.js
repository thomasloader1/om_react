import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useSwal } from './useSwal';
import { useProgress } from './useProgress';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';

export const useLead = () => {
  const { fetching: creatingProgress, appEnv, updateProgress } = useProgress();
  const { setAppEnv } = useContext(AppContext);

    const [fetching, setFetching] = useState(false);
    const [lastStateLead, setastStateLead] = useState(false);

    const { modalAlert } = useSwal();

    const createLeadSales = async (dataLead) => {

        setFetching(true);
        let request = { idPurchaseProgress: 2,...dataLead };
        try {
            const {data} = await axios.post(
                '/api/db/stepCreateLead',
                request
                // idPurchaseProgress
            );

            const { message, newOrUpdatedLead, lead_id } = data
            setAppEnv((prevEnv) => ({
                ...prevEnv,
                lead: { ...newOrUpdatedLead },
                lead_id

            }));
             createLeadCRM(
                 dataLead,
                 lead_id,
                 newOrUpdatedLead,
             );
        } catch (e) {
            console.log(e);
            const { message } = e.response.data;
            modalAlert(message, "error");
            setFetching(false);
        }
    };
    const createLeadCRM = async (dataLead,leadId,newOrUpdatedLead) => {
         console.log(dataLead);
            // console.log(responseCreateLeadSales);
        let request = { leadId, ...dataLead };
        try {
            const resCreateLeadCRM = await axios.post(
                '/api/createLeadZohoCRM',
                request
            );
            
            updateEntityIdCRMLeadSales(
                {leadId,...newOrUpdatedLead},
                resCreateLeadCRM
            );
        } catch (e) {
            const { message } = e.response.data;
            modalAlert(message, "error");
            setFetching(false);
        } 
    };

     const updateEntityIdCRMLeadSales = async (dataLead,resCreateLeadCRM) => {
         try {
             dataLead.entity_id_crm = resCreateLeadCRM.data.id;
            const resEntityIdLeadCRM = await axios.post(
                '/api/updateEntityIdLeadVentas',
                {
                    ...dataLead
                }
            );
            
        } catch (e) {
            const { message } = e.response.data;
            modalAlert(message, "error");
            setFetching(false);
        } finally {
            setFetching(false);
        }
    };

    return { fetching,createLeadSales };
};
