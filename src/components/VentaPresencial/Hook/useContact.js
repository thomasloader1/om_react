import axios from 'axios';
import { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import { useSwal } from './useSwal';

export const useContact = () => {
    const [fetching, setFetching] = useState(false);
    const { id } = useParams();
    const { modalAlert } = useSwal();

    const { setAppEnv} = useContext(AppContext);

    const createContactSales = async (values) => {
        console.log("createContactSales",{values})
        
        setFetching(true);
        try {
            const { data } = await axios.post(
                '/api/db/stepConversionContact',
                { idPurchaseProgress: id,...values,step_number: 4 }
            );
            const { contact, contact_id, lead, progress } = data;
             setAppEnv(prevState => ({
                ...prevState,
                ...progress,
                lead: {...lead},
                contact:{...contact}
             }))
            createContactCRM(
                contact_id,
                contact,
                lead
            );
        } catch (e) {
            console.log(e);
            const { message } = e.response.data;
            modalAlert(message, "error");
            setFetching(false);
        } 
    };
    const createContactCRM = async (contact_id,contact,lead) => {
        console.log({contact,contact_id,lead});
        // console.log(responseCreateLeadSales);
        try {
            const { data } = await axios.post(
                '/api/createContactZohoCRM',
                {...contact,...contact_id,...lead}
            );
            const { id, result } = data;
            updateEntityIdCRMContactSales(
                contact,
                id
             );
        } catch (e) {
            const { message } = e.response.data;
            modalAlert(message, "error");
            setFetching(false);
        }
    };

     const updateEntityIdCRMContactSales = async (contact,id) => {
         try {
            contact.entity_id_crm = id;
            const resEntityIdLeadCRM = await axios.post(
                '/api/updateEntityIdContactSales',
                contact
            );
            
        } catch (e) {
            const { message } = e.data;
            modalAlert(message, "error");
            setFetching(false);
        } finally {
            setFetching(false);
        }
    }; 

    return { fetching ,createContactSales };
};
