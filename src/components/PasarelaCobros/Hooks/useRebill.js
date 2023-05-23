import { parsePhoneNumber } from "react-phone-number-input";

const {
    NODE_ENV,
    REACT_APP_OCEANO_STRIPESUBSCRIPTION,
    REACT_APP_OCEANO_STRIPESUBSCRIPTION_LOCAL,
    REACT_APP_OCEANO_UPDATECONTRACT_MP_LOCAL,
    REACT_APP_OCEANO_UPDATECONTRACT_MP,
    REACT_APP_OCEANO_UPDATECONTRACT_ST,
    REACT_APP_OCEANO_UPDATECONTRACT_ST_LOCAL,
    REACT_APP_OCEANO_URL,
    REACT_APP_REBILL_STRIPE_1,
    REACT_APP_REBILL_STRIPE_3,
    REACT_APP_REBILL_STRIPE_6,
    REACT_APP_REBILL_STRIPE_9,
    REACT_APP_REBILL_STRIPE_12,
    REACT_APP_REBILL_MP_1,
    REACT_APP_REBILL_MP_3,
    REACT_APP_REBILL_MP_6,
    REACT_APP_REBILL_MP_9,
    REACT_APP_REBILL_MP_12,
    REACT_APP_REBILL_MP_TEST_1,
    REACT_APP_REBILL_MP_TEST_3,
    REACT_APP_REBILL_MP_TEST_6,
    REACT_APP_REBILL_MP_TEST_9,
    REACT_APP_REBILL_MP_TEST_12,
    REACT_APP_REBILL_ORG_ID,
    REACT_APP_REBILL_API_KEY,
    REACT_APP_REBILL_API_URL
} = process.env

const itsProduction = NODE_ENV === 'production'

export const URLS = {
    MP: itsProduction
        ? `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_UPDATECONTRACT_MP}`
        : REACT_APP_OCEANO_UPDATECONTRACT_MP_LOCAL,
    STRIPE: itsProduction
        ? `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_STRIPESUBSCRIPTION}`
        : REACT_APP_OCEANO_STRIPESUBSCRIPTION_LOCAL,
    UPDATE_CONTRACT: itsProduction
        ? `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_UPDATECONTRACT_ST}`
        : REACT_APP_OCEANO_UPDATECONTRACT_ST_LOCAL,
};

export const REBILL_CONF = { ORG_ID: REACT_APP_REBILL_ORG_ID, API_KEY: REACT_APP_REBILL_API_KEY, URL: REACT_APP_REBILL_API_URL }




export const getPlanPrice = (formikValues, sale) => {
    const gateway = formikValues.payment_method;
    const isStripe = gateway.includes('Stripe');
    const quotes = Number(formikValues.quotes);

    console.log(Number(Math.round(sale.Grand_Total / formikValues.quotes)), { quotes, total: sale.Grand_Total, formikValues })

    switch (quotes) {
        case 3:
            return {
                id: isStripe ? REACT_APP_REBILL_STRIPE_3 : REACT_APP_REBILL_MP_TEST_3,
                quantity: Number(Math.round(sale.Grand_Total / quotes)),
            }
        case 6:
            return {
                id: isStripe ? REACT_APP_REBILL_STRIPE_6 : REACT_APP_REBILL_MP_TEST_6,
                quantity: Number(Math.round(sale.Grand_Total / quotes)),
            }
        case 9:
            return {
                id: isStripe ? REACT_APP_REBILL_STRIPE_9 : REACT_APP_REBILL_MP_TEST_9,
                quantity: Number(Math.round(sale.Grand_Total / quotes)),
            }
        case 12:
            return {
                id: isStripe ? REACT_APP_REBILL_STRIPE_12 : REACT_APP_REBILL_MP_TEST_12,
                quantity: Number(Math.round(sale.Grand_Total / quotes)),
            }
        default:
            return {
                id: isStripe ? REACT_APP_REBILL_STRIPE_1 : REACT_APP_REBILL_MP_TEST_1,
                quantity: sale.Grand_Total,
            }
    }
}
export const mappingFields = ({ formAttributes, contact, formikValues }) => {
    const [number] = formAttributes.address.split(" ").filter(s => (!isNaN(s) && s))
    const [...street] = formAttributes.address.split(" ").filter(s => (isNaN(s) && s))
    const { phoneNumber } = formAttributes
    const { countryCallingCode, nationalNumber } = phoneNumber

    return {
        firstName: contact.First_Name,
        lastName: contact.Last_Name,
        email: formAttributes.email,
        phone: {
            countryCode: countryCallingCode,
            areaCode: '11',
            phoneNumber: nationalNumber,
        },
        birthday: contact.Date_of_Birth,
        taxId: {
            type: 'CUIT',
            value: '20' + contact.DNI + '9',
        },
        personalId: {
            type: 'DNI',
            value: contact.DNI,
        },
        address: {
            street: street.join(" "),
            number: number,
            floor: '0',
            apt: '0',
            city: formikValues.country,
            state: formikValues.country,
            zipCode: formAttributes.zip,
            country: formikValues.country,
            description: '-',
        },
    }
}

export const mappingCheckoutFields = ({ paymentLinkCustomer, contact, checkout }) => {
    const [number] = paymentLinkCustomer.address.split(" ").filter(s => (!isNaN(s) && s))
    const [...street] = paymentLinkCustomer.address.split(" ").filter(s => (isNaN(s) && s))
    const { countryCallingCode, nationalNumber } = parsePhoneNumber(paymentLinkCustomer.phone)

    //console.log({ countryCallingCode, nationalNumber })
    return {
        firstName: contact.First_Name,
        lastName: contact.Last_Name,
        email: paymentLinkCustomer.email,
        phone: {
            countryCode: countryCallingCode,
            areaCode: '11',
            phoneNumber: nationalNumber,
        },
        birthday: contact.Date_of_Birth,
        taxId: {
            type: 'CUIT',
            value: '20' + contact.DNI + '9',
        },
        personalId: {
            type: 'DNI',
            value: contact.DNI,
        },
        address: {
            street: street.join(" "),
            number: number,
            floor: '0',
            apt: '0',
            city: checkout.country,
            state: checkout.country,
            zipCode: paymentLinkCustomer.zip,
            country: checkout.country,
            description: '-',
        },
    }
}


