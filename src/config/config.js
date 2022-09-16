export const countryOptions = [
  {
    idElement: 'pais_arg_input',
    img: 'argFlag',
    value: 'Argentina'
  },
  {
    idElement: 'pais_bol_input',
    img: 'bolFlag',
    value: 'Bolivia'
  },
  {
    idElement: 'pais_chi_input',
    img: 'chiFlag',
    value: 'Chile'
  },
  {
    idElement: 'pais_col_input',
    img: 'colFlag',
    value: 'Colombia'
  },
  {
    idElement: 'pais_cos_input',
    img: 'cosFlag',
    value: 'Costa Rica'
  },
  {
    idElement: 'pais_ecu_input',
    img: 'ecuFlag',
    value: 'Ecuador'
  },
  {
    idElement: 'pais_sal_input',
    img: 'salFlag',
    value: 'El Salvador'
  },
  {
    idElement: 'pais_gua_input',
    img: 'guaFlag',
    value: 'Guatemala'
  },
  {
    idElement: 'pais_hon_input',
    img: 'honFlag',
    value: 'Honduras'
  },
  {
    idElement: 'pais_mex_input',
    img: 'mexFlag',
    value: 'México'
  },
  {
    idElement: 'pais_nic_input',
    img: 'nicFlag',
    value: 'Nicaragua'
  },
  {
    idElement: 'pais_pan_input',
    img: 'panFlag',
    value: 'Panamá'
  },
  {
    idElement: 'pais_par_input',
    img: 'parFlag',
    value: 'Paraguay'
  },
  {
    idElement: 'pais_per_input',
    img: 'perFlag',
    value: 'Perú'
  },
  {
    idElement: 'pais_uru_input',
    img: 'uruFlag',
    value: 'Uruguay'
  },
  {
    idElement: 'pais_usa_input',
    img: 'usaFlag',
    value: 'Estados Unidos'
  }
];

export const paymentOptions = [
  {
    img: 'mp',
    shortName: 'mp',
    className: 'tall',
    value: 'Mercado Pago',
    allowedCountries: ['arg','mex','chi','col']
  },
  {
    img: 'st',
    shortName: 'st',
    className: 'tall',
    idInputElement: '',
    value: 'Stripe',
    allowedCountries: ['bol','mex','chi','cos','ecu','sal','gua','hon','nic']

  },
  {
    img: 'pp',
    shortName: 'pp',
    className: 'tall',
    idInputElement: '',
    value: 'PayPal',
    allowedCountries: []

  },
  {
    img: 'df',
    shortName: 'df',
    className: 'tall',
    idInputElement: '',
    value: 'Datafast',
    allowedCountries: []
  },
  {
    img: 'ba',
    shortName: 'ba',
    className: 'tall',
    idInputElement: '',
    value: 'Banorte',
    allowedCountries: []
  }
];
export const paymentMethodOptions = [
  {
    idElement: 'med_tarjeta',
    name: 'med1',
    value: 'Pagar con Tarjeta',
    classLabel: 'half'
  },
  {
    idElement: 'med_link',
    name: 'med2',
    value: 'Compartir Link',
    classLabel: 'half'
  }
];

export const paymentModeOptions = [
  {
    idElement: 'mod_traditional',
    name: 'mod1',
    value: 'Tradicional',
    classLabel: 'half'
  },
  {
    idElement: 'mod_suscrip',
    name: 'mod2',
    value: 'Suscripción',
    classLabel: 'half'
  }
];

export const clientForm = [
  {
    idElement: 'numeroContrato',
    value: '',
    label: 'Número de Contrato',
    placeholder: 'placeholder'
  },
  {
    idElement: 'porcentajeDescuento',
    value: '',
    label: 'Porcentaje a descontar',
    placeholder: 'Ingrese porcentaje a descontar'
  }
];

export const sideItemOptions = [
  {
    step: 1,
    idElement: 'seleccion_pais',
    label: 'País',
    value: '',
    status: 'current'
  },
  {
    step: 2,
    idElement: 'seleccion_metPago',
    label: 'MÉTODO DE PAGO',
    value: '',
    status: ''
  },
  {
    step: 3,
    idElement: 'seleccion_pais',
    label: 'MEDIO Y MODO DE PAGO',
    value: '',
    status: ''
  },
  {
    step: 4,
    idElement: 'seleccion_pais',
    label: 'DATOS DEL CLIENTE    ',
    value: '',
    status: ''
  },
  {
    step: 5,
    idElement: 'seleccion_pais',
    label: 'DATOS DE LA TARJETA',
    value: '',
    status: ''
  }
];

export const userFlow = {
  stepOne:{
    step: 1,
    label: 'country',
    value: '',
    isoRef: ''
  },
  stepTwo:{
    step: 2,
    label: 'payment_method',
    value: '',
  },
  stepThree:{
    step: 3,
    label: 'payment_mode',
    value: '',
  },
  stepFour:{
    step: 4,
    label: 'customer_data',
    value: '',
  },
  stepFive:{
    step: 5,
    label: 'card_data',
    value: '',
  }
};