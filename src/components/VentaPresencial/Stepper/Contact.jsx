import InputField from '../../PasarelaCobros/InputField';
import { FormStep } from './MultiStep';
import Select from '../Select';

const ContactStep = () => {
  return (
    <>
      <FormStep stepNumber={3} stepName="Conversion a contacto">
        <div id="medModPago_grid" className="grid-conversion_contact">
          <InputField
            label="DNI"
            type="text"
            placeholder="Ingrese DNI"
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
            label="Fecha de Nacimiento"
            type="date"
            placeholder="--/--/----"
            id="date_of_birth"
            name="date_of_birth"
          />
          <InputField
            label="Pais"
            type="text"
            placeholder="Ingresar pais"
            id="country"
            name="country"
          />
          <InputField
            label="Provincia / Estado"
            type="text"
            placeholder="Ingresar localidad"
            id="province_state"
            name="province_state"
          />
          <InputField
            label="Codigo Postal"
            type="text"
            placeholder="Ingresar matricula"
            id="postal_code"
            name="postal_code"
          />
          <InputField
            label="Direccion"
            type="text"
            placeholder="Ingresar calle y numero"
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
            label="Numero de Matricula"
            type="text"
            placeholder="Ingresar matricula"
            id="registration_number"
            name="registration_number"
          />
          <InputField
            label="Area de Trabajo"
            type="text"
            placeholder="Ingresar area de trabajo"
            id="area_of_work"
            name="area_of_work"
          />
          <InputField
            label="Interes de Formacion"
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
