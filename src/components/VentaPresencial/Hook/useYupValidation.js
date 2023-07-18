import * as Yup from 'yup';

export const useYupValidation = () => {
  const countryStepValidation = Yup.object({
    country: Yup.string().required('El pais es requerido'),
  });

  const leadStepValidation = Yup.object({
    name: Yup.string().required('❗ El nombre es requerido'),
    username: Yup.string().required('❗ El apellido es requerido'),
    email: Yup.string().required('❗ El e-mail es requerido'),
    telephone: Yup.string().required('❗ El teléfono es requerido'),
    profession: Yup.string()
      .required('❗ La profesión es requerida')
      .test(
        'is-not-zero',
        '❗ Seleccione una profesion valida',
        (value) => value !== '0'
      ),
    speciality: Yup.string()
      .required('❗ La especialidad es requerida')
      .test(
        'is-not-zero',
        '❗ Seleccione una especialidad valida',
        (value) => value !== '0'
      ),
    method_contact: Yup.string()
      .required('❗ El método de contacto es requerido')
      .test(
        'is-not-zero',
        '❗ Seleccione un método de contacto valido',
        (value) => value !== '0'
      ),
    source_lead: Yup.string()
      .required('❗ La fuente de lead es requerido')
      .test(
        'is-not-zero',
        '❗ Seleccione una fuente de lead valida',
        (value) => value !== '0'
      ),
  });

  /* .test('rut-validation', 'El formato del documento es incorrecto', function (value) {
        const pais = this.resolve(Yup.ref('country'));
        if (pais === 'Chile') {
          return /^([0-9]\d{7,8})-([A-Za-z]|\d{1})$/.test(value);
        } else {
          return /^[0-9]+$/.test(value);
        }
      }), */

  const contactStepValidation = Yup.object({
    dni: Yup.number().when('country', (country, schema) => {
      if (country.trim() === 'Argentina') {
        return schema.required('❗ El Numero de Identificacion es requerido (DNI)');
      }
      return schema;
    }),
    rut: Yup.string().when('country', (country, schema) => {
      if (country.trim() === 'Chile') {
        return schema.matches(/^[0-9]+-[0-9kK]{1}$/, "El RUT no es válido").required('❗ El Numero de Identificacion es requerido (RUT)');
      }
      return schema;
    }),
    rfc: Yup.string().when('country', (country, schema) => {
      if (country.trim() === 'México') {
        return schema.matches(/^[A-ZÑ&]{3,4}(\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[A1-9\d][A\d]$/, "El RFC no es válido").required('❗ El Numero de Identificacion es requerido (RFC)');
      }
      return schema;
    }),
    sex: Yup.string().required('❗ El sexo es requerido'),
    date_of_birth: Yup.string().required(
      '❗ La fecha de nacimiento es requerida'
    ),
    registration_number: Yup.string(),
    area_of_work: Yup.string(),
    training_interest: Yup.string(),
    province_state: Yup.string().required(
      '❗ La provincia o estado son requeridos'
    ),
    country: Yup.string().required('❗ El país es requerido'),
    postal_code: Yup.string().when('country', (country, schema) => {
      if (country.trim() !== 'Chile')
        return schema.required('❗ El código postal es requerido');
      return schema;
    }),
    street: Yup.string().max(50, "❗El domicilio solo puede contener 50 caracteres").required('❗ La dirección es requerida'),
    locality: Yup.string().required('❗ La Ciudad o Comuna es requerida'),
  });


  const selectCoursesStepValidation = Yup.object().shape({
    products: Yup.array()
      .of(
        Yup.object().shape({
          product_code: Yup.number().required('El código de producto es obligatorio'),
          price: Yup.number().required('El precio es obligatorio'),
          title: Yup.string().required('El título es obligatorio'),
          quantity: Yup.number().required('La cantidad es obligatoria'),
          discount: Yup.number().min(0, 'El descuento no puede ser menor a cero')
        }).nullable()
      )
      .min(1, 'Debe seleccionar al menos un producto')
  });

  return {
    countryStepValidation,
    leadStepValidation,
    contactStepValidation,
    selectCoursesStepValidation,
  };
};
