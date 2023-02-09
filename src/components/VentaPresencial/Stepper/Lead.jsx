import { useFormikContext } from 'formik';
import { useContext, useEffect } from 'react';
import InputField from '../../PasarelaCobros/InputField';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import Select from '../Select';
import { FormStep } from './MultiStep';

const LeadStep = () => {
  const { professions, specialties, methods, appEnv } = useContext(AppContext);
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    console.log('Lead step', { appEnv });
    if (
      appEnv !== null &&
      appEnv?.lead !== null &&
      typeof appEnv?.lead !== 'undefined'
    ) {
      Object.keys(appEnv?.lead).map((key) => {
        const value =
          appEnv?.lead[key] !== null && appEnv?.lead[key]
            ? appEnv?.lead[key]
            : '';
        // console.log({ key, value });
        setFieldValue(key, value);
      });
    }
  }, [appEnv, appEnv?.lead]);

  return (
    <>
      <FormStep stepNumber={2} stepName="Crear lead">
        <div className="grid-create_lead">
          <InputField
            label="Nombre"
            type="text"
            placeholder="Ingresar nombre"
            id="name"
            name="name"
          />
          <InputField
            label="Apellido"
            type="text"
            placeholder="Ingresar apellido"
            id="username"
            name="username"
          />
          <InputField
            label="E-mail"
            type="text"
            placeholder="Ingresar e-mail"
            id="email"
            name="email"
          />

          <InputField
            label="Teléfono"
            type="text"
            placeholder="Ingresar teléfono"
            id="telephone"
            name="telephone"
          />
          <Select
            options={professions}
            placeholderText="Seleccionar una profesión"
            label="Profesión"
            id="profession"
            name="profession"
          />

          <Select
            options={specialties}
            placeholderText="Seleccionar una especialidad"
            label="Especialidad"
            id="speciality"
            name="speciality"
          />

          <Select
            options={methods}
            placeholderText="Seleccionar método de contacto"
            label="Método de contacto"
            id="method_contact"
            name="method_contact"
          />
        </div>
      </FormStep>
    </>
  );
};

export default LeadStep;
