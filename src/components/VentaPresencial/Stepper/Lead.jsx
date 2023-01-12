import InputField from '../../PasarelaCobros/InputField';
import { FormStep } from './MultiStep';

const LeadStep = () => {
  return (
    <>
      <FormStep stepNumber={2} stepName="Creacion de lead">
        <div id="medModPago_grid" className="grid-lead-face-to-face-sale">
          <InputField
            label="NOMBRE"
            type="text"
            placeholder="Ingrese nombre"
            id="name"
            name="name"
            // value={id}
          />
          <InputField
            label="APELLIDO"
            type="text"
            placeholder="Ingrese apellido"
            id="username"
            name="username"
            // value={id}
          />
          <InputField
            label="E-MAIL"
            type="text"
            placeholder="Ingrese e-mail"
            id="email"
            name="email"
            // value={id}
          />
          <InputField
            label="TELEFONO"
            type="text"
            placeholder="Ingrese telefono"
            id="telephone"
            name="telephone"
            // value={id}
          />
          <InputField
            label="PROFESION"
            type="text"
            placeholder="Ingrese profesion"
            id="profession"
            name="profession"
            // value={id}
          />
          <InputField
            label="ESPECIALIDAD"
            type="text"
            placeholder="Ingrese especialidad"
            id="speciality"
            name="speciality"
            // value={id}
          />
          <InputField
            label="METODO DE CONTACTO"
            type="text"
            placeholder="Seleccionar metodo de contacto"
            id="method_contact"
            name="method_contact"
            // value={id}
          />
        </div>
      </FormStep>
    </>
  );
};

export default LeadStep;
