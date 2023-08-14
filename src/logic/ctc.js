import axios from "axios"
import { generateURL } from "../components/PasarelaCobros/Helpers/generateURL";

const {
    REACT_APP_OCEANO_UPDATECONTRACT_CTC,
    REACT_APP_API_EXPORT_EXCEL,
    REACT_APP_API_EXPORT_EXCEL_SUSCRIPTION } = process.env

const URLS = {
    PAYMENT: generateURL(REACT_APP_API_EXPORT_EXCEL),
    SUSCRIPTION: generateURL(REACT_APP_API_EXPORT_EXCEL_SUSCRIPTION),
    UPDATE_CONTRACT: generateURL(REACT_APP_OCEANO_UPDATECONTRACT_CTC),
}

export const makeCTCPaymentFile = async (values) => {
    const { data } = await axios.post(URLS.PAYMENT, { ...values })
    return data;
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
    link.href = url; // https://oceanomedicina.net/api-payments/public/api/.....
    link.setAttribute('download', 'archivo.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

}