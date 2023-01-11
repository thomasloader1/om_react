import { useFormikContext } from 'formik';
import { useContext } from 'react';
import InputField from '../../PasarelaCobros/InputField';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import { FormStep } from './MultiStep';
import axios from 'axios';

const ContactStep = () => {
  const { appEnv } = useContext(AppContext);

  const formik = useFormikContext();

  const body = new FormData();
  const requestConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  let dataJson = {
    contact: {
      dni: formik.values.dni,
      sex: formik.values.sex,
      date_of_birth: formik.values.date_of_birth,
      registration_number: formik.values.registration_number,
      area_of_work: formik.values.area_of_work,
      training_interest: formik.values.training_interest
    },
    address: {
      country: formik.values.country,
      province_state: formik.values.province_state,
      postal_code: formik.values.postal_code,
      street: formik.values.street,
      locality: formik.values.locality
    }
  };

  // body.append('dataJson', JSON.stringify(formik.values))
  body.append('dataJson', JSON.stringify(dataJson));

  const response = axios.post(
    'http://127.0.0.1:8000/api/db/stepConversionContact',
    body,
    requestConfig
  );
  // debugger;//10

  console.log({ response });

  return (
    <>
      <FormStep stepNumber={3} stepName="Conversion a contacto">
        <div id="medModPago_grid" className="grid-lead-face-to-face-sale">
          <pre>{JSON.stringify(appEnv, null, 2)}</pre>
          <InputField
            label="DNI"
            type="text"
            placeholder="Ingrese DNI"
            id="dni"
            name="dni"
          />
          <InputField
            label="SEXO"
            type="text"
            placeholder="Seleccionar sexo"
            id="sex"
            name="sex"
          />
          <InputField
            label="FECHA DE NACIMIENTO"
            type="text"
            placeholder="--/--/----"
            id="date_of_birth"
            name="date_of_birth"
          />
          <InputField
            label="PAIS"
            type="text"
            placeholder="Ingresar pais"
            id="country"
            name="country"
          />
          <InputField
            label="PROVINCIA/ESTADO"
            type="text"
            placeholder="Ingresar localidad"
            id="province_state"
            name="province_state"
          />
          <InputField
            label="CODIGO POSTAL"
            type="text"
            placeholder="Ingresar matricula"
            id="postal_code"
            name="postal_code"
          />
          <InputField
            label="DIRECCION"
            type="text"
            placeholder="Ingresar calle y numero"
            id="street"
            name="street"
          />
          <InputField
            label="LOCALIDAD"
            type="text"
            placeholder="Ingresar localidad"
            id="locality"
            name="locality"
          />
          <InputField
            label="NUMERO DE MATRICULA"
            type="text"
            placeholder="Ingresar matricula"
            id="registration_number"
            name="registration_number"
          />
          <InputField
            label="AREA DE TRABAJO"
            type="text"
            placeholder="Ingresar area de trabajo"
            id="area_of_work"
            name="area_of_work"
          />
          <InputField
            label="INTERES DE FORMACION"
            type="text"
            placeholder="Ingresar interes de formacion"
            id="training_interest"
            name="training_interest"
          />
        </div>
      </FormStep>
    </>
  );
};

export default ContactStep;
