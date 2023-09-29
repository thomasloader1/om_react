export const formatPrice = (iso, currencyOptions, price) => new Intl.NumberFormat(iso, currencyOptions).format(Math.floor(price));

export const handleCheckoutData = (currencyOptions,checkoutPayment, advanceSuscription, formSPP = true) => {
  
    const { isAdvanceSuscription, isSuscription, isTraditional, info } = advanceSuscription;
    const auxResume = {
      totalMonths: 0,
      firstPay: 0,
      payPerMonth: 0,
      formattedFirstPay: 0,
      formattedPayPerMonth: 0,
      isTraditional,
      isAdvanceSuscription,
      isSuscription,
    };

   console.group('helpers/handleCheckoutData');
    console.log({ advanceSuscription, checkoutPayment, auxResume, formSPP });
    console.groupEnd();

    const {sale} = checkoutPayment
    

    if (auxResume.isAdvanceSuscription) {
      auxResume.totalMonths = Number(checkoutPayment?.quotes);
      auxResume.firstPay = info.firstQuoteDiscount;
      auxResume.payPerMonth = info.payPerMonthAdvance;

      auxResume.formattedFirstPay = formatPrice('US', currencyOptions, auxResume.firstPay);
      auxResume.formattedPayPerMonth = formatPrice('US', currencyOptions, auxResume.payPerMonth);
    } else if (auxResume.isSuscription) {
      auxResume.totalMonths = Number(checkoutPayment?.quotes);
      auxResume.firstPay = Math.floor(sale?.Grand_Total / auxResume.totalMonths);

      auxResume.formattedAmount = formatPrice('US', currencyOptions, auxResume.firstPay);
      auxResume.formattedFirstPay = formatPrice('US', currencyOptions, auxResume.firstPay);
      auxResume.formattedPayPerMonth = formatPrice('US', currencyOptions, auxResume.firstPay);
    } else {
      auxResume.totalMonths = 1;
      auxResume.firstPay = sale?.Grand_Total;

      auxResume.formattedAmount = formatPrice('US', currencyOptions, auxResume.firstPay);
      auxResume.formattedFirstPay = formatPrice('US', currencyOptions, auxResume.firstPay);
      auxResume.formattedPayPerMonth = formatPrice('US', currencyOptions, auxResume.firstPay);
    }

    return auxResume;
  };