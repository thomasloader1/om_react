import axios from "axios"
import { generateURL } from "../components/PasarelaCobros/Helpers/generateURL"

const {
    REACT_APP_OCEANO_UPDATECONTRACT_PTP,
    REACT_APP_API_PTP_SESSION_SU_PAYMENT,
    REACT_APP_API_PTP_SESSION,
    REACT_APP_API_PTP_SESSION_SU,
} = process.env

const URLS = {
    SUSCRIPTION: generateURL(REACT_APP_API_PTP_SESSION_SU),
    PAYMENT: generateURL(REACT_APP_API_PTP_SESSION),
    DEBIT: generateURL(REACT_APP_API_PTP_SESSION_SU_PAYMENT)
}

export const createSession = async (body) => {

    const sessionUrl = body.payment.type.includes("Parcialidad") ? URLS.PAYMENT : URLS.SUSCRIPTION

    try {
        const res = await axios.post(sessionUrl, { ...body })
        console.log({ res })
        return res.data

    } catch (e) {
        console.log(e)
        return e.response.data.message;
    }
}

export const makePaymentSession = async (formikValues) => {
    const type = formikValues.mod.includes('anticipo') ? 'Parcialidad' : formikValues.mod
    const quotes = formikValues.quotes ? formikValues.quotes : 1
    const rest_quotes = quotes - 1;
    const reference = `TEST_${formikValues.sale.SO_Number}`;
    const payer = {
        name: formikValues.contact.First_Name,
        surname: formikValues.contact.Last_Name,
        email: formikValues.email,
        document: formikValues.dni,
        documentType: formikValues.documentType,
        mobile: "1122011250",
        address: {
            street: formikValues.address
        }
    }

    const payment = {
        total: formikValues.sale.Grand_Total,
        type,
        rest_quotes,
        quotes
    }

    if (type === 'Parcialidad') {
        payment.first_pay = formikValues.advanceSuscription.firstQuoteDiscount;
        payment.remaining_installments = formikValues.advanceSuscription.payPerMonthAdvance;
    } else {
        payment.remaining_installments = payment.total / payment.quotes;
    }

    return await createSession({
        so: reference,
        payer,
        payment
    })
}

export const debitFirstPayment = async (body) => {
    try {
        const res = await axios.post(URLS.DEBIT, { ...body })
        console.log({ res })
        return res.data

    } catch (e) {
        console.log(e)
        return e.response.data.message;
    }

}