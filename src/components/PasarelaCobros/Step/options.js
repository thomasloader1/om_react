import IMAGES from '../../../img/pasarelaCobros/share';

export const countryOptions = [
    {
        idElement: 'pais_arg_label',
        flag: 'argFlag',
        title: 'Argentina'
    },
    {
        idElement: 'pais_bol_label',
        flag: 'bolFlag',
        title: 'Bolivia'
    },
    {
        idElement: 'pais_chi_label',
        flag: 'chiFlag',
        title: 'Chile'
    },
    {
        idElement: 'pais_col_label',
        flag: 'colFlag',
        title: 'Colombia'
    },
    {
        idElement: 'pais_cos_label',
        flag: 'cosFlag',
        title: 'Costa Rica'
    },
    {
        idElement: 'pais_ecu_label',
        flag: 'ecuFlag',
        title: 'Ecuador'
    },
    {
        idElement: 'pais_sal_label',
        flag: 'salFlag',
        title: 'El Salvador'
    },
    {
        idElement: 'pais_gua_label',
        flag: 'guaFlag',
        title: 'Guatemala'
    },
    {
        idElement: 'pais_hon_label',
        flag: 'honFlag',
        title: 'Honduras'
    },
    {
        idElement: 'pais_mex_label',
        flag: 'mexFlag',
        title: 'México'
    },
    {
        idElement: 'pais_nic_label',
        flag: 'nicFlag',
        title: 'Nicaragua'
    },
    {
        idElement: 'pais_pan_label',
        flag: 'panFlag',
        title: 'Panamá'
    },
    {
        idElement: 'pais_par_label',
        flag: 'parFlag',
        title: 'Paraguay'
    },
    {
        idElement: 'pais_per_label',
        flag: 'perFlag',
        title: 'Perú'
    },
    {
        idElement: 'pais_uru_label',
        flag: 'uruFlag',
        title: 'Uruguay'
    },
    {
        idElement: 'pais_usa_label',
        flag: 'usaFlag',
        title: 'Estados Unidos'
    },

];

const { mp, st, pp, ba, df } = IMAGES
export const paymentOptions = [
    {
        title: 'Mercado Pago',
        image: mp,
        shortName: 'mp',
        className: '',
        idInputElement: ''
    },
    {
        title: 'Stripe',
        image: st,
        shortName: 'st',
        className: '',
        idInputElement: ''
    },
    {
        title: 'PayPal',
        image: pp,
        shortName: 'pp',
        className: '',
        idInputElement: ''
    },
    {
        title: 'Datafast',
        image: df,
        shortName: 'df',
        className: '',
        idInputElement: ''
    },
    {
        title: 'Banorte',
        image: ba,
        shortName: 'ba',
        className: '',
        idInputElement: ''
    },
]