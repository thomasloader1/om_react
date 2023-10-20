export const makePostUpdateZohoCheckout = ({
  isAdvanceSuscription,
  advanceSuscription,
  QUOTES,
  customer,
  payment,
  paymentLinkCustomer,
  checkout,
  sale,
  subscriptionId,
}) => {
  /*  console.group('makePostUpdateZohoCheckout');
   console.log({
     isAdvanceSuscription,
     advanceSuscription,
     QUOTES,
     customer,
     payment,
     paymentLinkCustomer,
     checkout,
     sale,
     subscriptionId,
   });
   console.groupEnd(); */

  if (isAdvanceSuscription) {
    return {
      installments: QUOTES,
      email: customer.userEmail,
      amount: sale.Grand_Total,
      contractId: checkout.contract_entity_id,
      subscriptionId,
      installment_amount: advanceSuscription.info.firstQuoteDiscount, //
      payPerMonthAdvance: advanceSuscription.info.payPerMonthAdvance, //
      address: paymentLinkCustomer.address,
      dni: paymentLinkCustomer.personalId,
      phone: paymentLinkCustomer.phone,
      fullname: customer.firstName + ' ' + customer.lastName,
      is_suscri: !checkout.type.includes('Tradicional'),
      is_advanceSuscription: checkout.type.includes('Suscripción con anticipo'),
      adjustment: advanceSuscription.info.adjustmentPayment,
      country: checkout.country,
    };
  }

  const adjustmentPayment = parseFloat(Number(payment.amount) * QUOTES - sale.Grand_Total).toFixed(
    2,
  );

  return {
    installments: QUOTES,
    email: customer.userEmail,
    amount: sale.Grand_Total,
    contractId: checkout.contract_entity_id,
    subscriptionId,
    installment_amount: payment.amount,
    address: paymentLinkCustomer.address,
    dni: paymentLinkCustomer.personalId,
    phone: paymentLinkCustomer.phone,
    fullname: customer.firstName + ' ' + customer.lastName,
    is_suscri: !checkout.type.includes('Tradicional'),
    is_advanceSuscription: checkout.type.includes('Suscripción con anticipo'),
    adjustment: parseFloat(adjustmentPayment),
    country: checkout.country,
  };
};

export const makePostUpdateZoho = ({
  formikValues,
  customer,
  sale,
  payment,
  formsValues,
  subscriptionId,
  formAttributes,
  userInfo,
  dni,
}) => {
  const { advanceSuscription } = formikValues;

  if (!advanceSuscription.isAdvanceSuscription) {
    /*  console.group('makePostUpdateZoho')
     console.log({ advanceSuscription })
     console.groupEnd() */
    const adjustmentPayment = parseFloat(
      Number(payment.amount) * formikValues.quotes - sale.Grand_Total,
    ).toFixed(2);

    return {
      email: customer.userEmail,
      amount: sale.Grand_Total,
      contractId: formikValues.contractId,
      subscriptionId,
      installments: formikValues.quotes,
      installment_amount: payment.amount,
      address: formsValues.address,
      dni,
      phone: formAttributes.phone,
      fullname: customer.firstName + ' ' + customer.lastName,
      is_suscri: userInfo.stepThree.value.includes('Suscripción'),
      is_advanceSuscription: userInfo.stepThree.value.includes('Suscripción con anticipo'),
      adjustment: parseFloat(adjustmentPayment),
      country: formsValues.country,
    };
  }

  const adjustmentPayment = parseFloat(
    advanceSuscription.payPerMonthAdvance * (formikValues.quotes - 1) +
      advanceSuscription.firstQuoteDiscount -
      sale.Grand_Total,
  ).toFixed(2);

  return {
    installments: formikValues.quotes,
    email: customer.userEmail,
    amount: sale.Grand_Total,
    contractId: formikValues.contractId,
    subscriptionId,
    installment_amount: advanceSuscription.firstQuoteDiscount, //
    payPerMonthAdvance: advanceSuscription.payPerMonthAdvance,
    address: formsValues.address,
    dni,
    phone: formAttributes.phone,
    fullname: customer.firstName + ' ' + customer.lastName,
    is_suscri: !userInfo.stepThree.value.includes('Tradicional'),
    is_advanceSuscription: userInfo.stepThree.value.includes('Suscripción con anticipo'),
    adjustment: parseFloat(adjustmentPayment),
    country: formsValues.country,
  };
};

export const makePostUpdateZohoCTC = (formikValues, contractData, userInfo) => {
  console.log({ formikValues });
  const { advanceSuscription } = formikValues;
  const { contact, sale } = contractData;

  if (!advanceSuscription.isAdvanceSuscription) {
    /*  console.group('makePostUpdateZoho')
     console.log({ advanceSuscription })
     console.groupEnd() */
    const payment = Math.floor(sale.Grand_Total / formikValues.quotes);
    const adjustmentPayment = parseFloat(
      Number(payment) * formikValues.quotes - sale.Grand_Total,
    ).toFixed(2);

    return {
      email: contact.Email,
      amount: sale.Grand_Total,
      contractId: formikValues.contractId,
      installments: formikValues.quotes,
      installment_amount: payment,
      address: formikValues.address,
      dni: formikValues.rfc,
      phone: contact.Home_Phone,
      fullname: contact.First_Name + ' ' + contact.Last_Name,
      is_suscri: userInfo.stepThree.value.includes('Suscripción'),
      is_advanceSuscription: userInfo.stepThree.value.includes('Suscripción con anticipo'),
      adjustment: parseFloat(adjustmentPayment),
      country: formikValues.country,
      subscriptionId: formikValues.folio_suscripcion,
      folio_pago: formikValues.folio_pago,
    };
  }

  const adjustmentPayment = parseFloat(
    advanceSuscription.payPerMonthAdvance * (formikValues.quotes - 1) +
      advanceSuscription.firstQuoteDiscount -
      sale.Grand_Total,
  ).toFixed(2);

  return {
    installments: formikValues.quotes,
    email: contact.Email,
    amount: sale.Grand_Total,
    contractId: formikValues.contractId,
    installment_amount: advanceSuscription.firstQuoteDiscount, //
    payPerMonthAdvance: advanceSuscription.payPerMonthAdvance,
    address: formikValues.address,
    dni: formikValues.rfc,
    phone: contact.Home_Phone,
    fullname: contact.First_Name + ' ' + contact.Last_Name,
    is_suscri: !userInfo.stepThree.value.includes('Tradicional'),
    is_advanceSuscription: userInfo.stepThree.value.includes('Suscripción con anticipo'),
    adjustment: parseFloat(adjustmentPayment),
    country: formikValues.country,
    subscriptionId: formikValues.folio_suscripcion,
    folio_pago: formikValues.folio_pago,
  };
};

export const makePostUpdateZohoPTP = (data) => {
  const { requestId, adjustment, contractId, street, is_suscri } = data;

  return {
    is_suscri,
    requestId,
    adjustment,
    contractId,
    street,
  };
};
