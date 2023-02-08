import axios from 'axios';
import { useState } from 'react';
import { useSwal } from './useSwal';

export const useContact = () => {
    const [fetching, setFetching] = useState(false);

    const { modalAlert } = useSwal();

    const createContactSales = async (values) => {
        console.log("createContactSales",{values})
        
        setFetching(true);
        try {
           /*  const resCreateContactSales = await axios.post(
                '/api/db/stepConversionContact',
                { idPurchaseProgress: 3,...dataContact,...dataLead }
            );
            createContactCRM(
                dataContact,
                resCreateContactSales.data.contact_id,
                resCreateContactSales.data.newOrUpdatedContact,
                dataLead
            ); */
        } catch (e) {
            console.log(e);
            const { message } = e.response.data;
            modalAlert(message, "error");
            setFetching(false);
        } 
    };
    /* const createContactCRM = async (dataContact,contactId,newOrUpdatedContact,dataLead) => {
        console.log(dataContact);
        // console.log(responseCreateLeadSales);
        try {
            const resCreateContactCRM = await axios.post(
                '/api/createContactZohoCRM',
                {contactId,...dataContact,...dataLead}
            );
            updateEntityIdCRMContactSales(
                { contactId, ...newOrUpdatedContact },
                resCreateContactCRM
            );
        } catch (e) {
            const { message } = e.response.data;
            modalAlert(message, "error");
            setFetching(false);
        }
    };

     const updateEntityIdCRMContactSales = async (dataContact,resCreateContactCRM) => {
         try {
             dataContact.entity_id_crm = resCreateContactCRM.data.id;
            const request = { contactId, ...dataLead };
            const resEntityIdLeadCRM = await axios.post(
                '/api/updateEntityIdContactSales',
                request
            );
            
        } catch (e) {
            const { message } = e.data;
            modalAlert(message, "error");
            setFetching(false);
        } finally {
            setFetching(false);
        }
    }; */

    return { fetching ,createContactSales };
};
