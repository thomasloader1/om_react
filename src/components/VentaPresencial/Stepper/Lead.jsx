import { useContext } from 'react';
import InputField from '../../PasarelaCobros/InputField';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import Select from '../Select';
import { FormStep } from './MultiStep';

const LeadStep = () => {
  const {
    fetchProfessions,
    professions,
    fetchSpecialties,
    specialties,
    fetchMethods,
    methods,
  } = useContext(AppContext);

  return (
    <>
      <FormStep stepNumber={2} stepName="Creacion de lead">
        <div className="grid-create_lead">
          <InputField
            label="Nombre"
            type="text"
            placeholder="Ingrese nombre"
            id="name"
            name="name"
          />
          <InputField
            label="Apellido"
            type="text"
            placeholder="Ingrese apellido"
            id="username"
            name="username"
          />
          <InputField
            label="Correo Electronico"
            type="text"
            placeholder="Ingrese e-mail"
            id="email"
            name="email"
          />

          <InputField
            label="Telefono"
            type="text"
            placeholder="Ingrese telefono"
            id="telephone"
            name="telephone"
          />
          <Select
            options={professions}
            placeholderText="Seleccione una profesion"
            label="Profesion"
            id="profession"
            name="profession"
          />

          <Select
            options={specialties}
            placeholderText="Seleccione una especialidad"
            label="Especialidad"
            id="speciality"
            name="speciality"
          />

          <Select
            options={methods}
            placeholderText="Seleccionar metodo de contacto"
            label="Metodo de contactacion"
            id="method_contact"
            name="method_contact"
          />
        </div>
      </FormStep>
    </>
  );
};

export default LeadStep;
