import axios from 'axios';
import { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { useSwal } from './useSwal';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';

export const useContract = () => {
    const [fetching, setFetching] = useState(false);
    const { id } = useParams();

    const { modalAlert } = useSwal();
    const { setAppEnv} = useContext(AppContext);


    const createContractSales = async (values) => {
        console.log("createContractSales",{values})
        
        setFetching(true);

        let valuess = {
            "step_number": 4,
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
                "discount": 14,
                "contract_id": 1,
                "sku": "asd123"
                },
                {
                "id": 231314,
                "precio": 31200,
                "quantity": 1,
                "discount": 18,
                "contract_id": 1,
                "sku": "gfd444"
                }
            ]
        };

        try {
            const { data } = await axios.post(
                '/api/db/stepConversionContract',
                { idPurchaseProgress: id,...valuess,step_number: 4 }
            );
            const { contract, contract_id, progress } = data;
             setAppEnv((prevEnv) => ({
                ...prevEnv,
                contract: { ...contract },
                contract_id,
                ...progress
            }));
            createContractCRM(
                contract_id,
                contract,
            );
        } catch (e) {
            console.log(e);
            const { message } = e.response.data;
            modalAlert(message, "error");
            setFetching(false);
        } 
    };
    const createContractCRM = async (contract_id,contract) => {
        console.log({contract_id,contract});
        // console.log(responseCreateLeadSales);
        try {
            const { data } = await axios.post(
                '/api/createContractZohoCRM',
                {contract_id,...contract}
            );
            const { id, result } = data;
            // updateEntityIdCRMContactSales(
            //     contact,
            //     id
            //  );
        } catch (e) {
            const { message } = e.response.data;
            modalAlert(message, "error");
            setFetching(false);
        }
    };

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
