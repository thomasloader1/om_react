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
    dni: Yup.number().required('❗ El DNI es requerido'),
    sex: Yup.string().required('❗ El sexo es requerido'),
    date_of_birth: Yup.string().required(
      '❗ La fecha de nacimiento es requerida'
    ),
    registration_number: Yup.number(
      '❗ El campo debe contener solo numeros'
    ).required('❗ El número de matrícula es requerido'),
    area_of_work: Yup.string().required('❗ El área de trabajo es requerida'),
    training_interest: Yup.string().required(
      '❗ El interés de formación es requerido'
    ),
    province_state: Yup.string().required(
      '❗ La provincia o estado son requeridos'
    ),
    country: Yup.string().required('❗ El país es requerido'),
    postal_code: Yup.number('❗ El campo debe contener solo numeros').required(
      '❗ El código postal es requerido'
    ),
    street: Yup.string().required('❗ La dirección es requerida'),
    locality: Yup.string().required('❗ La localidad es requerida'),
  });

  const selectCoursesStepValidation = Yup.object().shape({
    /* products: Yup.array()
                      .min(1)
                      .of(Yup.string().required())
                      .required(), */
  });

  return {
    countryStepValidation,
    leadStepValidation,
    contactStepValidation,
    selectCoursesStepValidation,
  };
};
