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
  });

  const contactStepValidation = Yup.object({
    dni: Yup.number().required('❗ El Numero de Identificacion es requerido'),
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
    postal_code: Yup.number('❗ El campo debe contener solo numeros').required(
      '❗ El código postal es requerido'
    ),
    street: Yup.string().required('❗ La dirección es requerida'),
    locality: Yup.string().required('❗ La Ciudad o Comuna es requerida'),
  });

  const selectCoursesStepValidation = Yup.object().shape({
    products: Yup.array('No se puede avanzar si no selecciona un curso')
      .min(1, 'Debe haber al menos un producto')
      .of(
        Yup.object().shape({
          product_code: Yup.number().required(),
          price: Yup.number().required(),
          title: Yup.string().required(),
        })
      )
      .required('Se requiere al menos un producto'),
  });

  return {
    countryStepValidation,
    leadStepValidation,
    contactStepValidation,
    selectCoursesStepValidation,
  };
};
