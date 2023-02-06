import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useSwal } from './useSwal';

export const useLead = () => {

    const [fetching, setFetching] = useState(false);
    const [lastStateLead, setastStateLead] = useState(false);

    const { modalAlert } = useSwal();

    const createLeadSales = async (dataLead) => {
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
        try {
            const resCreateLeadCRM = await axios.post(
                '/api/createLeadZohoCRM',
                {leadId,...dataLead}
            );
            updateEntityIdCRMLeadSales({leadId,...newOrUpdatedLead},resCreateLeadCRM);
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
