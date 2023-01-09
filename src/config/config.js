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
    className: 'button grid-payment_method-item tall',
    value: 'Mercado Pago',
    allowedCountries: ['arg', 'mex', 'chi', 'col', 'per', 'uru']
  },
  {
    img: 'st',
    shortName: 'st',
    className: 'button grid-payment_method-item tall',
    idInputElement: '',
    value: 'Stripe',
    allowedCountries: [
      'bol',
      'mex',
      'chi',
      'cos',
      'ecu',
      'sal',
      'gua',
      'hon',
      'nic'
    ]
  },
  {
    img: 'pp',
    shortName: 'pp',
    className: 'button grid-payment_method-item tall',
    idInputElement: '',
    value: 'PayPal',
    allowedCountries: []
  },
  {
    img: 'df',
    shortName: 'df',
    className: 'button grid-payment_method-item tall',
    idInputElement: '',
    value: 'Datafast',
    allowedCountries: ['ecu']
  },
  {
    img: 'ba',
    shortName: 'ba',
    className: 'button grid-payment_method-item tall',
    idInputElement: '',
    value: 'Banorte',
    allowedCountries: []
  }
];
export const paymentMethodOptions = [
  {
    idElement: 'med_tarjeta',
    name: 'med',
    value: 'Pagar con Tarjeta',
    classLabel: 'half'
  },
  {
    idElement: 'med_link',
    name: 'med',
    value: 'Compartir Link',
    classLabel: 'half'
  }
];

export const paymentModeOptions = [
  {
    idElement: 'mod_traditional',
    name: 'mod',
    value: 'Tradicional',
    classLabel: 'half'
  },
  {
    idElement: 'mod_suscrip',
    name: 'mod',
    value: 'Suscripción',
    classLabel: 'half'
  }
];

export const clientForm = [
  {
    idElement: 'tipoSuscripcion',
    value: '',
    label: 'Tipo de suscripcion',
    options: ['agregar suscripcion', 'modificar suscripcion']
  },
  {
    idElement: 'numeroContrato',
    value: '',
    label: 'Número de Contrato',
    placeholder: 'Ingrese número del contrato (SO)'
  },
  {
    idElement: 'email',
    value: '',
    label: 'Correo Electronico',
    placeholder: 'Ingrese correo electronico del cliente'
  },
  {
    idElement: 'montoContrato',
    value: '',
    label: 'Monto total del contrato',
    placeholder: 'Ingrese monto total del contrato'
  },
  {
    idElement: 'cuotas',
    value: '',
    label: 'Cuotas',
    placeholder: 'Ingrese las cuotas'
  },
  {
    idElement: 'montoMensual',
    value: '',
    label: 'Monto a pagar por mes',
    placeholder: 'Monto a pagar por mes'
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
        placeholder: 'Ingrese email'
      },
      {
        idElement: 'compartirLink_wpp',
        value: '',
        label: 'WhatsApp',
        placeholder: 'Ingrese telefono'
      }
    ]
  }
];

export const cardForm = [
  {
    idElement: 'numeroTarjeta',
    value: '',
    label: 'Numero de tarjeta',
  }
];

export const numberSOForm = [
  {
    idElement: 'numberSO',
    value: '',
    label: 'Numero de SO'
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
    idElement: 'mod_payment',
    label: 'MODO DE PAGO',
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
  stepOne: {
    step: 1,
    label: 'country',
    value: '',
    isoRef: ''
  },
  stepTwo: {
    step: 2,
    label: 'payment_method',
    value: ''
  },
  stepThree: {
    step: 3,
    label: 'payment_mode',
    value: ''
  },
  stepFour: {
    step: 4,
    label: 'customer_data',
    value: ''
  },
  stepFive: {
    step: 5,
    label: 'card_data',
    value: ''
  }
};


// VentaPresencial
export const userFlowFaceToFaceSale = {
  stepOne: {
    step: 1,
    label: 'country',
    value: '',
    isoRef: ''
  },
  stepTwo: {
    step: 2,
    label: 'create_lead',
    value: ''
  },
  stepThree: {
    step: 3,
    label: 'conversion_contact',
    value: ''
  }
};
export const leadForm = [
  {
    idElement: 'name',
    value: '',
    label: 'NOMBRE',
    placeholder: 'Ingrese nombre'
  },
  {
    idElement: 'username',
    value: '',
    label: 'APELLIDO',
    placeholder: 'Ingrese apellido'
  },
  {
    idElement: 'telephone',
    value: '',
    label: 'TELEFONO',
    placeholder: 'Ingrese e-mail'
  },
  {
    idElement: 'profession',
    value: '',
    label: 'PROFESION',
    placeholder: 'Ingrese profesion'
  },
  {
    idElement: 'speciality',
    value: '',
    label: 'ESPECIALIDAD',
    placeholder: 'Ingrese especialidad'
  },
  {
    idElement: 'email',
    value: '',
    label: 'E-MAIL',
    placeholder: 'Ingrese email'
  },
  {
    idElement: 'method_contact',
    value: '',
    label: 'METODO DE CONTACTO',
    placeholder: 'Seleccionar metodo de contacto'
  }
];
