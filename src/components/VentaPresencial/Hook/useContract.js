import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useSwal } from './useSwal';

export const useContract = () => {
    const [fetching, setFetching] = useState(false);
    const { id } = useParams();

    const { modalAlert } = useSwal();

    const createContractSales = async (values) => {
        console.log("createContractSales",{values})
        
        setFetching(true);

        let valuess = {
            "id": 1,
            "installments": "",
            "Fecha_de_Vto": "",
            "lead_source": "",
            "name": "Facundo",
            "address": "Calle falsa 123",
            "payment_type": "",
            "country": "Argentina",
            "is_sub": "",
            "payment_in_advance": "",
            "left_installments": "",
            "left_payment_type": "",
            "currency": "",
            "products": [
                {
                "id": 237618,
                "precio": 46800,
                "quantity": 1,
                "discount": 0,
                "contract_id": 1
                },
                {
                "id": 231314,
                "precio": 31200,
                "quantity": 1,
                "discount": 0,
                "contract_id": 1
                }
            ]
        };

        try {
            const { data } = await axios.post(
                '/api/db/stepConversionContract',
                { idPurchaseProgress: id,...valuess,step_number: 4 }
            );
            // const { contact, contact_id, lead } = data;
             
            // createContractCRM(
            //     contact_id,
            //     contact,
            //     lead
            // );
        } catch (e) {
            console.log(e);
            const { message } = e.response.data;
            modalAlert(message, "error");
            setFetching(false);
        } 
    };
    // const createContactCRM = async (contact_id,contact,lead) => {
    //     console.log({contact,contact_id,lead});
    //     // console.log(responseCreateLeadSales);
    //     try {
    //         const { data } = await axios.post(
    //             '/api/createContactZohoCRM',
    //             {...contact,...contact_id,...lead}
    //         );
    //         const { id, result } = data;
    //         updateEntityIdCRMContactSales(
    //             contact,
    //             id
    //          );
    //     } catch (e) {
    //         const { message } = e.response.data;
    //         modalAlert(message, "error");
    //         setFetching(false);
    //     }
    // };

    //  const updateEntityIdCRMContactSales = async (contact,id) => {
    //      try {
    //         contact.entity_id_crm = id;
    //         const resEntityIdLeadCRM = await axios.post(
    //             '/api/updateEntityIdContactSales',
    //             contact
    //         );
            
    //     } catch (e) {
    //         const { message } = e.data;
    //         modalAlert(message, "error");
    //         setFetching(false);
    //     } finally {
    //         setFetching(false);
    //     }
    // }; 

    return { fetching ,createContractSales };
};
