export const countryOptions = [
  {
    idElement: 'pais_arg_input',
    img: 'argFlag',
    value: 'Argentina',
    active: true,
  },
  {
    idElement: 'pais_bol_input',
    img: 'bolFlag',
    value: 'Bolivia',
    active: false,
  },
  {
    idElement: 'pais_chi_input',
    img: 'chiFlag',
    value: 'Chile',
    active: true,
  },
  {
    idElement: 'pais_col_input',
    img: 'colFlag',
    value: 'Colombia',
    active: false,
  },
  {
    idElement: 'pais_cos_input',
    img: 'cosFlag',
    value: 'Costa Rica',
    active: false,
  },
  {
    idElement: 'pais_ecu_input',
    img: 'ecuFlag',
    value: 'Ecuador',
    active: true,
  },
  {
    idElement: 'pais_sal_input',
    img: 'salFlag',
    value: 'El Salvador',
    active: false,
  },
  {
    idElement: 'pais_gua_input',
    img: 'guaFlag',
    value: 'Guatemala',
    active: false,
  },
  {
    idElement: 'pais_hon_input',
    img: 'honFlag',
    value: 'Honduras',
    active: false,
  },
  {
    idElement: 'pais_mex_input',
    img: 'mexFlag',
    value: 'México',
    active: true,
  },
  {
    idElement: 'pais_nic_input',
    img: 'nicFlag',
    value: 'Nicaragua',
    active: false,
  },
  {
    idElement: 'pais_pan_input',
    img: 'panFlag',
    value: 'Panamá',
    active: false,
  },
  {
    idElement: 'pais_par_input',
    img: 'parFlag',
    value: 'Paraguay',
    active: false,
  },
  {
    idElement: 'pais_per_input',
    img: 'perFlag',
    value: 'Perú',
    active: false,
  },
  {
    idElement: 'pais_uru_input',
    img: 'uruFlag',
    value: 'Uruguay',
    active: false,
  },
  {
    idElement: 'pais_usa_input',
    img: 'usaFlag',
    value: 'Estados Unidos',
    active: false,
  },
];

export const paymentOptions = [
  {
    img: 'mp',
    shortName: 'mp',
    className: 'button grid-payment_method-item tall',
    value: 'Mercado Pago',
    allowedCountries: ['arg', 'mex', 'chi', 'col', 'per', 'uru'],
    disabledCountries: [],
  },
  {
    img: 'st',
    shortName: 'st',
    className: 'button grid-payment_method-item tall',
    idInputElement: '',
    value: 'Stripe',
    allowedCountries: ['bol', 'mex', 'chi', 'cos', 'ecu', 'sal', 'gua', 'hon', 'nic'],
    disabledCountries: [],
  },
  {
    img: '',
    shortName: 'CTC',
    className: 'button grid-payment_method-item tall',
    idInputElement: '',
    value: 'CTC',
    allowedCountries: ['mex'],
    disabledCountries: [],
  },
  {
    img: 'df',
    shortName: 'df',
    className: 'button grid-payment_method-item tall',
    idInputElement: '',
    value: 'Datafast',
    allowedCountries: ['ecu'],
    disabledCountries: ['ecu'],
  },
  {
    img: 'ptp',
    shortName: 'ptp',
    className: 'button grid-payment_method-item tall',
    idInputElement: '',
    value: 'PlaceToPay',
    allowedCountries: ['ecu'],
    disabledCountries: ['ecu'],
  },
  {
    img: 'wp',
    shortName: 'wp',
    className: 'button grid-payment_method-item tall',
    idInputElement: '',
    value: 'WebpayCL',
    allowedCountries: [],
    disabledCountries: [],
  },
];
export const paymentMethodOptions = [
  {
    idElement: 'med_tarjeta',
    name: 'med',
    value: 'Pagar con Tarjeta',
    classLabel: 'half',
  },
  {
    idElement: 'med_link',
    name: 'med',
    value: 'Compartir Link',
    classLabel: 'half',
  },
];

export const paymentModeOptions = [
  {
    idElement: 'mod_traditional',
    name: 'mod',
    value: 'Tradicional',
    classLabel: 'half',
  },
  {
    idElement: 'mod_suscrip',
    name: 'mod',
    value: 'Suscripción',
    classLabel: 'half',
  },
  {
    idElement: 'mod_advance_suscrip',
    name: 'mod',
    value: 'Suscripción con anticipo',
    classLabel: 'half',
  },
];

export const clientForm = [
  {
    idElement: 'tipoSuscripcion',
    value: '',
    label: 'Tipo de suscripcion',
    options: ['agregar suscripcion', 'modificar suscripcion'],
  },
  {
    idElement: 'numeroContrato',
    value: '',
    label: 'Número de Contrato',
    placeholder: 'Ingrese número del contrato (SO)',
  },
  {
    idElement: 'email',
    value: '',
    label: 'Correo Electronico',
    placeholder: 'Ingrese correo electronico del cliente',
  },
  {
    idElement: 'montoContrato',
    value: '',
    label: 'Monto total del contrato',
    placeholder: 'Ingrese monto total del contrato',
  },
  {
    idElement: 'cuotas',
    value: '',
    label: 'Cuotas',
    placeholder: 'Ingrese las cuotas',
  },
  {
    idElement: 'montoMensual',
    value: '',
    label: 'Monto a pagar por mes',
    placeholder: 'Monto a pagar por mes',
  },
  {
    idElement: 'compartirLink',
    value: '',
    label: 'Compartir Link por',
    options: [
      {
        idElement: 'compartirLink_email',
        value: '',
        label: 'Email',
        placeholder: 'Ingrese email',
      },
      {
        idElement: 'compartirLink_wpp',
        value: '',
        label: 'WhatsApp',
        placeholder: 'Ingrese telefono',
      },
    ],
  },
];

export const cardForm = [
  {
    idElement: 'numeroTarjeta',
    value: '',
    label: 'Numero de tarjeta',
  },
];

export const numberSOForm = [
  {
    idElement: 'numberSO',
    value: '',
    label: 'Numero de SO',
  },
];

export const sideItemOptions = [
  {
    step: 1,
    idElement: 'seleccion_pais',
    label: 'País',
    value: '',
    status: 'current',
  },
  {
    step: 2,
    idElement: 'seleccion_metPago',
    label: 'MÉTODO DE PAGO',
    value: '',
    status: '',
  },
  {
    step: 3,
    idElement: 'mod_payment',
    label: 'MODO DE PAGO',
    value: '',
    status: '',
  },
  {
    step: 4,
    idElement: 'seleccion_pais',
    label: 'DATOS DEL CLIENTE    ',
    value: '',
    status: '',
  },
  {
    step: 5,
    idElement: 'seleccion_pais',
    label: 'DATOS DE LA TARJETA',
    value: '',
    status: '',
  },
  {
    step: 6,
    idElement: 'data_card_ctc',
    label: 'CTC',
    value: '',
    status: '',
  },
  {
    step: 7,
    idElement: 'folio_pago_ctc',
    label: 'FOLIO PAGO',
    value: '',
    status: '',
  },
  {
    step: 8,
    idElement: 'data_plan_ctc',
    label: 'PLAN DE PAGO',
    value: '',
    status: '',
  },
  {
    step: 9,
    idElement: 'folio_plan_ctc',
    label: 'FOLIO PLAN DE PAGO',
    value: '',
    status: '',
  },
];

export const makeCustomSideItemOptions = (steps, data) => {
  const sideItemOptionsAux = JSON.parse(JSON.stringify(sideItemOptions));

  data.map((obj, index) => {
    sideItemOptionsAux[index].value = obj.value;
    sideItemOptionsAux[index].status = 'completed';

    if (obj.step === steps) {
      sideItemOptionsAux[index].value = 'Completa los datos';
      sideItemOptionsAux[index].status = 'current';
    }
  });

  return sideItemOptionsAux;
};

export const userFlow = {
  stepOne: {
    step: 1,
    label: 'country',
    value: '',
    isoRef: '',
  },
  stepTwo: {
    step: 2,
    label: 'payment_method',
    value: '',
  },
  stepThree: {
    step: 3,
    label: 'payment_mode',
    value: '',
  },
  stepFour: {
    step: 4,
    label: 'customer_data',
    value: '',
  },
  stepFive: {
    step: 5,
    label: 'card_data',
    value: '',
  },
};
