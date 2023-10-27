export const valuesAdvanceSuscription = ({ total, checkoutPayment }) => {
    //console.group('valuesAdvanceSuscription');
    //console.log({total, checkoutPayment})
    const { quotes, type } = checkoutPayment;

    const isAdvanceSuscription = type.includes('Suscripción con anticipo');
    const isSuscription = type.includes('Suscripción') && !type.includes('anticipo');
    const isTraditional = type.includes('Tradicional');

    const detailValues = {
        isAdvanceSuscription,
        isSuscription,
        isTraditional,
        info: {},
    };

    if (isAdvanceSuscription) {
        const quoteForMonth = Math.floor(total / quotes);
        const remainingQuotes = quotes === 1 ? 1 : quotes - 1;

        const firstQuoteDiscount = Math.floor(quoteForMonth / 2);
        const remainingAmountToPay = total - firstQuoteDiscount;
        const payPerMonthAdvance = Math.floor(remainingAmountToPay / remainingQuotes);
        const adjustmentPayment = parseFloat(
            (payPerMonthAdvance * remainingQuotes + firstQuoteDiscount - total).toFixed(2),
        );

        detailValues.info = {
            remainingQuotes,
            firstQuoteDiscount,
            remainingAmountToPay,
            payPerMonthAdvance,
            adjustmentPayment,
        };
    } else if (isSuscription) {
        const quoteForMonth = Math.floor(total / quotes);
        const remainingQuotes = quotes === 1 ? 1 : quotes - 1;
        const payPerMonthAdvance = quoteForMonth;
        const adjustmentPayment = parseFloat((payPerMonthAdvance * quotes - total).toFixed(2));

        detailValues.info = {
            quoteForMonth,
            remainingQuotes,
            payPerMonthAdvance,
            adjustmentPayment,
        };
    } else {
        const quoteForMonth = Math.floor(total / 1);

        const payPerMonthAdvance = quoteForMonth;
        const adjustmentPayment = parseFloat((payPerMonthAdvance - total).toFixed(2));

        detailValues.info = {
            quoteForMonth,
            payPerMonthAdvance,
            adjustmentPayment,
        };
    }
    //console.groupEnd();

    return detailValues;
};