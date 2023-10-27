export const formatPrice = (iso, currencyOptions, price) => new Intl.NumberFormat(iso, currencyOptions).format(Math.floor(price));

export const handleCheckoutData = (
  currencyOptions,
  checkoutPayment,
  advanceSuscription,
  formSPP = true,
) => {
 // console.group("handleCheckoutData")
  const {
    isAdvanceSuscription,
    isSuscription,
    isTraditional,
  } = advanceSuscription;

  //console.log({advanceSuscription})

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

  const { sale } = checkoutPayment;

  if (auxResume.isAdvanceSuscription) {
    auxResume.totalMonths = Number(checkoutPayment.quotes);
    auxResume.firstPay = advanceSuscription.info.firstQuoteDiscount;
    auxResume.payPerMonth = advanceSuscription.info.payPerMonthAdvance;

    auxResume.formattedFirstPay = formatPrice('US', currencyOptions, auxResume.firstPay);
    auxResume.formattedPayPerMonth = formatPrice('US', currencyOptions, auxResume.payPerMonth);
  } else if (auxResume.isSuscription) {
    auxResume.totalMonths = Number(checkoutPayment.quotes);
    auxResume.firstPay = Math.floor(sale.Grand_Total / auxResume.totalMonths);

    auxResume.formattedAmount = formatPrice('US', currencyOptions, auxResume.firstPay);
    auxResume.formattedFirstPay = formatPrice('US', currencyOptions, auxResume.firstPay);
    auxResume.formattedPayPerMonth = formatPrice('US', currencyOptions, auxResume.firstPay);
  } else {
    auxResume.totalMonths = 1;
    auxResume.firstPay = sale.Grand_Total;

    auxResume.formattedAmount = formatPrice('US', currencyOptions, auxResume.firstPay);
    auxResume.formattedFirstPay = formatPrice('US', currencyOptions, auxResume.firstPay);
    auxResume.formattedPayPerMonth = formatPrice('US', currencyOptions, auxResume.firstPay);
  }
 // console.groupEnd("handleCheckoutData")

  return auxResume;
};
