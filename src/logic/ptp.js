import axios from "axios"
import { generateURL } from "../components/PasarelaCobros/Helpers/generateURL"

const {
    REACT_APP_OCEANO_UPDATECONTRACT_PTP,
    REACT_APP_API_PTP_SESSION,
    REACT_APP_API_PTP_SU,
    REACT_APP_API_PTP_PU,
} = process.env

const URLS = {
    PAYMENT: generateURL(REACT_APP_API_PTP_PU),
    SUSCRIPTION: generateURL(REACT_APP_API_PTP_SU),
    SESSION: generateURL(REACT_APP_API_PTP_SESSION),
}

export const createSession = async (body) => {
    try {
        const res = await axios.post(URLS.SESSION, { ...body })
        console.log(res)
        return res.data

    } catch (e) {
        console.log(e)
    }
}