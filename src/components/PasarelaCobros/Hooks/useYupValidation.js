import * as Yup from 'yup';

export const useYupValidation = () => {
  const countryStepValidation = Yup.object({
    country: Yup.string().required('❗ El pais es requerido'),
  });

  const selectPaymentMethodStepValidation = Yup.object({
    payment_method: Yup.string().required('❗ El método de pago es requerido'),
  });

  const selectPaymentModeStepValidation = Yup.object({
    contractId: Yup.string(),
    mod: Yup.string().required('❗ Selecciona un modo de pago'),
    quotes: Yup.string().when('mod', {
      is: (val) => !(val && val.includes('Tradicional')),
      then: (schema) => Yup.string().required('❗ Especifique las cuotas'),
      otherwise: (schema) => null,
    }),
  });

  const formClientDataStepValidation = Yup.object({
    checkContract: Yup.string().required('❗ El campo es requerido'),
  });

  const rebillPaymentStepValidation = Yup.object({
    fullName: Yup.string()
      .required('❗ Ingresa el nombre que figura en la tarjeta')
      .matches(/^[a-zA-Z]+\s+[a-zA-Z]+(?:\s+[a-zA-Z]+)?$/i, 'El campo debe contener solo letras'),
    phone: Yup.string()
      .required('❗ Ingresa un número de telefono')
      .matches(/^\+?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9}$/, 'El campo debe contener solo numeros'),
    address: Yup.string()
      .max(50, 'La direccion no puede superar los 50 caracteres')
      .required('❗ Ingresa calle y número del titual de la tarjeta')
      .matches(/([A-Za-z0-9]+( [A-Za-z0-9]+)+)/i, 'El formato de la dirección es invalido'),
    dni: Yup.string()
      .required('❗ Ingresa el número de tu documento de identidad')
      .test('rut-validation', 'El formato del documento es incorrecto', function (value) {
        const pais = this.resolve(Yup.ref('country'));
        if (pais === 'Chile') {
          return /^([0-9]\d{7,8})-([A-Za-z]|\d{1})$/.test(value);
        } else {
          return /^[0-9A-Za-z]+$/.test(value);
        }
      }),
    email: Yup.string().email('❗ Ingresa un email valido').required('❗ El email es requerido'),
    zip: Yup.string().required('❗ El zip es requerido'),
  });

  const ptpPaymentStepValidation = Yup.object({
    address: Yup.string()
      .max(50, '❗ La direccion no puede superar los 50 caracteres')
      .required('❗ Ingresa calle y número del titual de la tarjeta')
      .matches(/([A-Za-z0-9]+( [A-Za-z0-9]+)+)/i, 'El formato de la dirección es invalido'),
    document_type: Yup.string().required('❗ Seleccione un tipo de documento'),
    dni: Yup.string()
      .required('❗ Ingresa el número de tu documento de identidad')
      .test('doc-validation', '❗ El formato del documento es incorrecto', function (value) {
        const docType = this.resolve(Yup.ref('document_type'));

        switch (docType) {
          case 'CC':
            return /^[1-9][0-9]{3,9}$/.test(value);
          case 'CI':
            return /^\d{10}$/.test(value);
          case 'RUC':
            return /^\d{13}$/.test(value);
          case 'PPN':
            return /^[a-zA-Z0-9_]{4,16}$/.test(value);
        }
      }),
    email: Yup.string().email('❗ Ingresa un email valido').required('❗ El email es requerido'),
    phone: Yup.string()
      .required('❗ Ingresa un número de telefono')
      .matches(/^\+?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9}$/, 'El campo debe contener solo numeros'),
  });

  const dataCardCTCStepValidation = Yup.object({
    n_ro_de_tarjeta: Yup.string()
      .required('❗ Ingresa el número que figura en la tarjeta')
      .matches(/^[0-9]{16}$/i, 'La tarjeta es invalida'),
    card_v: Yup.string()
      .required('❗ Ingresa la fecha de vencimiento')
      .matches(/[0-9]+\/[0-9]+/i, 'El vencimiento es invalido'),
    address: Yup.string()
      .max(50, 'La direccion no puede superar los 50 caracteres')
      .required('❗ Ingresa calle y número del titual de la tarjeta')
      .matches(/([A-Za-z0-9]+( [A-Za-z0-9]+)+)/i, 'El formato de la dirección es invalido'),
    zip: Yup.string().required('❗ El zip es requerido'),
    rfc: Yup.string().required('❗ Ingresar el RFC').min(12),
  });

  const folioPaymentCTCStepValidation = Yup.object({
    folio_pago: Yup.string()
      .required('❗ Ingresa el número que figura en CTC')
      .matches(/^[0-9]/i, 'El campo solo recibe numeros'),
  });

  const folioSuscriptionCTCStepValidation = Yup.object({
    folio_suscripcion: Yup.string()
      .required('❗ Ingresa el número que figura en CTC')
      .matches(/^[0-9]/i, 'El campo solo recibe numeros'),
  });

  return {
    countryStepValidation,
    selectPaymentMethodStepValidation,
    selectPaymentModeStepValidation,
    formClientDataStepValidation,
    rebillPaymentStepValidation,
    ptpPaymentStepValidation,
    dataCardCTCStepValidation,
    folioPaymentCTCStepValidation,
    folioSuscriptionCTCStepValidation,
  };
};
