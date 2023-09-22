import axios from "axios"
import { generateURL } from "../components/PasarelaCobros/Helpers/generateURL";

const {
    REACT_APP_OCEANO_UPDATECONTRACT_CTC,
    REACT_APP_API_EXPORT_EXCEL,
    REACT_APP_API_EXPORT_EXCEL_SUSCRIPTION,
    REACT_APP_OCEANO_SAVECARD_CTC
    } = process.env

const URLS = {
    PAYMENT: generateURL(REACT_APP_API_EXPORT_EXCEL),
    SUSCRIPTION: generateURL(REACT_APP_API_EXPORT_EXCEL_SUSCRIPTION),
    UPDATE_CONTRACT: generateURL(REACT_APP_OCEANO_UPDATECONTRACT_CTC),
    SAVE_CARD: generateURL(REACT_APP_OCEANO_SAVECARD_CTC),
}

export const makeCTCPaymentFile = async (values) => {
    try {
        console.log('makeCTCPaymentFile: ' + URLS.PAYMENT);
        const { data } = await axios.post(URLS.PAYMENT, { ...values })
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const sendCardZoho = async (body) => {
    try {
        const res = await axios.post(URLS.SAVE_CARD, body)
        console.log({sendZoho: res})
        
    } catch (error) {
        console.error({sendZoho: error})
    }
}

export const makeCTCSuscriptionFile = async (values) => {
    const { data } = await axios.post(URLS.SUSCRIPTION, { ...values })
    return data;
}

export const updateZohoContract = async (values) => {
    const { data } = await axios.post(URLS.UPDATE_CONTRACT, { ...values })
    return data;
}

export const downloadResource = async (url) => {
    console.log({ url })
    const link = document.createElement('a');
    //todo: Setear el switcheo de local a production
    // link.href = url; // https://oceanomedicina.net/api-payments/public/api/.....
    link.href = `https://oceanomedicina.net/api-payments/public${url}`;
    link.setAttribute('download', 'archivo.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

}