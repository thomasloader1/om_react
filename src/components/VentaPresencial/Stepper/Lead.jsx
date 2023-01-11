import { useFormikContext } from "formik";
import { useContext } from "react";
import { useParams } from "react-router";
import InputField from "../../PasarelaCobros/InputField";
import { AppContext } from "../../PasarelaCobros/Provider/StateProvider";
import { FormStep } from "./MultiStep";
import axios from 'axios';

const LeadStep = () => {
  const { formikValues, setFormikValues, checkoutLink, setCheckoutLink, appRef, userInfo } = useContext(AppContext);
  const { useState, setOptions, setUserInfo } = useContext(AppContext);
  // const [fetching, setFetching] = useState(false)

  const { stepOne, stepThree } = userInfo
  const { name, username } = useParams();

  return (
    <>
      <FormStep
        stepNumber={2}
        stepName='Creacion de lead'
      >
        <div id="medModPago_grid" className="grid-lead-face-to-face-sale">

          <InputField label="NOMBRE" type='text'
            placeholder="Ingrese nombre" id="name" name="name"
          // value={id}   
          />
          <InputField label="APELLIDO" type='text'
            placeholder="Ingrese apellido" id="username" name="username"
          // value={id}   
          />
          <InputField label="E-MAIL" type='text'
            placeholder="Ingrese e-mail" id="email" name="email"
          // value={id}   
          />
          <InputField label="TELEFONO" type='text'
            placeholder="Ingrese telefono" id="telephone" name="telephone"
          // value={id}   
          />
          <InputField label="PROFESION" type='text'
            placeholder="Ingrese profesion" id="profession" name="profession"
          // value={id}   
          />
          <InputField label="ESPECIALIDAD" type='text'
            placeholder="Ingrese especialidad" id="speciality" name="speciality"
          // value={id}   
          />
          <InputField label="METODO DE CONTACTO" type='text'
            placeholder="Seleccionar metodo de contacto" id="method_contact" name="method_contact"
          // value={id}   
          />
        </div>
      </FormStep>

    </>
  );
}

export default LeadStep;