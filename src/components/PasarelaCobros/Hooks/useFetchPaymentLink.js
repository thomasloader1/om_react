import {useEffect, useState} from "react";
import {ptpCurrencyOptions, URLS} from "../../../logic/ptp";
import axios from "axios";
import {getCurrency} from "../../../logic/rebill";
import {handleCheckoutData} from "../Helpers/handleCheckoutData";
import {fireModalAlert} from "./useSwal";
import {valuesAdvanceSuscription} from "../../../utils/valuesAdvanceSuscription";

export const useFetchPaymentLink = (hasContractData, so,contractData) => {
console.group(`useFetchPayment - run: ${hasContractData}`)
    const [loading, setLoading] = useState(true);
    const [checkoutPayment, setCheckoutPayment] = useState(null);
    const [processURL, setProcessURL] = useState(null);
    const [products, setProducts] = useState(null);
    const [advancePayment, setAdvancePayment] = useState({});
    const [invoiceDetail, setInvoiceDetail] = useState(null);
    const [currencyOptions, setCurrencyOptions] = useState(ptpCurrencyOptions);

    useEffect(() => {
        async function fetchPaymentLink() {
            const { GET_PAYMENT_LINK } = URLS;
            try {
                const { data } = await axios.get(`${GET_PAYMENT_LINK}/${so}`);
                const auxCheckoutPayment = { ...data.checkout, sale: contractData.sale, payment: data.payment };

                console.log({data});

                setCheckoutPayment(auxCheckoutPayment);
                setProducts(contractData.products);
                setProcessURL(
                    `${data.checkout.transaction.requestId}/${data.checkout.transaction.processUrl}`,
                );

                const inscription = valuesAdvanceSuscription({
                    total: Number(data.checkout.transaction.total),
                    checkoutPayment: data.checkout,
                });

                setAdvancePayment(inscription);

                const { currency } = getCurrency(data.checkout.country);
                setCurrencyOptions((prevState) => ({ ...prevState, currency }));


                const { totalMonths, formattedFirstPay, formattedPayPerMonth, formattedAmount } = handleCheckoutData(currencyOptions, auxCheckoutPayment, inscription);

                setInvoiceDetail({
                    advancePayment: inscription,
                    formattedFirstPay,
                    formattedPayPerMonth,
                    checkoutPayment,
                    totalMonths,
                    formattedAmount,
                });

                setLoading(false)
            } catch (error) {
                fireModalAlert('Error', error.message);
            }
        }

        if(hasContractData){
            fetchPaymentLink();

        }

    }, [hasContractData]);
    console.groupEnd("useFetchPayment")

    return {loading, currencyOptions, products, checkoutPayment, processURL, advancePayment, invoiceDetail}
}