import InputField from '../../PasarelaCobros/InputField';
import { FormStep } from './MultiStep';
import Select from '../Select';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import { useFormikContext } from 'formik';

const ContactStep = () => {
  const { appEnv } = useContext(AppContext);
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (
      appEnv !== null &&
      appEnv?.contact !== null &&
      typeof appEnv?.contact !== 'undefined'
    ) {
      Object.keys(appEnv?.contact).map((key) => {
        const value =
          appEnv?.contact[key] !== null && appEnv?.contact[key]
            ? appEnv?.contact[key]
            : '';
        console.log({ key, value });
        setFieldValue(key, value);
      });
    }
  }, [appEnv, appEnv?.contact]);

  return (
    <>
      <FormStep stepNumber={3} stepName="Convertir a contacto">
        <div id="medModPago_grid" className="grid-conversion_contact">
          <InputField
            label="DNI"
            type="text"
            placeholder="Ingresar DNI"
            id="dni"
            name="dni"
          />
          <Select
            label="Sexo"
            options={[
              { id: 1, name: 'Masculino' },
              { id: 2, name: 'Femenino' },
              { id: 3, name: 'Prefiero no aclararlo' },
            ]}
            id="sex"
            name="sex"
            placeholderText="Seleccionar sexo"
          />
          <InputField
            label="Fecha de nacimiento"
            type="date"
            placeholder="--/--/----"
            id="date_of_birth"
            name="date_of_birth"
          />
          <InputField
            label="Pais"
            type="text"
            placeholder="Ingresar país"
            id="country"
            name="country"
          />
          <InputField
            label="Provincia / Estado"
            type="text"
            placeholder="Ingresar provincia o estado"
            id="province_state"
            name="province_state"
          />
          <InputField
            label="Código postal"
            type="text"
            placeholder="Ingresar código postal"
            id="postal_code"
            name="postal_code"
          />
          <InputField
            label="Dirección"
            type="text"
            placeholder="Ingresar calle y número"
            id="street"
            name="street"
          />
          <InputField
            label="Localidad"
            type="text"
            placeholder="Ingresar localidad"
            id="locality"
            name="locality"
          />
          <InputField
            label="Número de matrícula"
            type="text"
            placeholder="Ingresar matrícula"
            id="registration_number"
            name="registration_number"
          />
          <InputField
            label="Área de trabajo"
            type="text"
            placeholder="Ingresar área de trabajo"
            id="area_of_work"
            name="area_of_work"
          />
          <InputField
            label="Interés de formación"
            type="text"
            placeholder="Ingresar interés"
            id="training_interest"
            name="training_interest"
          />
        </div>
      </FormStep>
    </>
  );
};

export default ContactStep;
