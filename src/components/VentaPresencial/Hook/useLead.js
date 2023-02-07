import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useSwal } from './useSwal';
<<<<<<< HEAD

export const useLead = () => {
=======
import { useProgress } from './useProgress';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';

export const useLead = () => {
  const { fetching: creatingProgress, appEnv, updateProgress } = useProgress();
  const { setAppEnv } = useContext(AppContext);
>>>>>>> d53a84a14a26225b207e14276a1c07b0a272ad23

    const [fetching, setFetching] = useState(false);
    const [lastStateLead, setastStateLead] = useState(false);

    const { modalAlert } = useSwal();

    const createLeadSales = async (dataLead) => {
<<<<<<< HEAD
        setFetching(true)
        try {
            const responseCreateLeadSales = await axios.post(
                '/api/db/stepCreateLead',
                { ...dataLead }
            );
            createLeadCRM(
                dataLead,
                responseCreateLeadSales.data.id,
                responseCreateLeadSales.data.newOrUpdatedLead,
            );
=======

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
>>>>>>> d53a84a14a26225b207e14276a1c07b0a272ad23
        } catch (e) {
            console.log(e);
            const { message } = e.response.data;
            modalAlert(message, "error");
            setFetching(false);
<<<<<<< HEAD
        } 
=======
        }
>>>>>>> d53a84a14a26225b207e14276a1c07b0a272ad23
    };
    const createLeadCRM = async (dataLead,leadId,newOrUpdatedLead) => {
         console.log(dataLead);
            // console.log(responseCreateLeadSales);
<<<<<<< HEAD
        try {
            const resCreateLeadCRM = await axios.post(
                '/api/createLeadZohoCRM',
                {leadId,...dataLead}
            );
            updateEntityIdCRMLeadSales({leadId,...newOrUpdatedLead},resCreateLeadCRM);
=======
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
>>>>>>> d53a84a14a26225b207e14276a1c07b0a272ad23
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
