const {
    NODE_ENV,
    REACT_APP_OCEANO_GENERATECHECKOUTPRO,
    REACT_APP_OCEANO_GENERATECHECKOUTPRO_TEST,
    REACT_APP_OCEANO_STRIPESUBSCRIPTION,
    REACT_APP_OCEANO_STRIPESUBSCRIPTION_LOCAL,
    REACT_APP_OCEANO_UPDATECONTRACT,
    REACT_APP_OCEANO_UPDATECONTRACT_LOCAL,
    REACT_APP_OCEANO_URL,
    REACT_APP_REBILL_STRIPE_1,
    REACT_APP_REBILL_STRIPE_3,
    REACT_APP_REBILL_STRIPE_6,
    REACT_APP_REBILL_STRIPE_9,
    REACT_APP_REBILL_STRIPE_12
} = process.env

const itsProduction = NODE_ENV === 'production'

export const URLS = {
    MP: itsProduction
        ? `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_GENERATECHECKOUTPRO}`
        : `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_GENERATECHECKOUTPRO_TEST}`,
    STRIPE: itsProduction
        ? `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_STRIPESUBSCRIPTION}`
        : REACT_APP_OCEANO_STRIPESUBSCRIPTION_LOCAL,
    UPDATE_CONTRACT: itsProduction
        ? `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_UPDATECONTRACT}`
        : REACT_APP_OCEANO_UPDATECONTRACT_LOCAL,
};



export const getPlanPrice = (formikValues, sale) => {

    switch (formikValues.quotes) {
        case 3:
            return {
                id: REACT_APP_REBILL_STRIPE_3,
                quantity: (sale.Grand_Total / formikValues.quotes),
            }
        case 6:
            return {
                id: REACT_APP_REBILL_STRIPE_6,
                quantity: (sale.Grand_Total / formikValues.quotes),
            }
        case 9:
            return {
                id: REACT_APP_REBILL_STRIPE_9,
                quantity: (sale.Grand_Total / formikValues.quotes),
            }
        case 12:
            return {
                id: REACT_APP_REBILL_STRIPE_12,
                quantity: (sale.Grand_Total / formikValues.quotes),
            }
        default:
            return {
                id: REACT_APP_REBILL_STRIPE_1,
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
        email: contact.Email,
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


