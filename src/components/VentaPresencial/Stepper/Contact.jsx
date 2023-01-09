import { useFormikContext } from "formik";
import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import InputField from "../../PasarelaCobros/InputField";
import { AppContext } from "../../PasarelaCobros/Provider/StateProvider";
import { FormStep } from "./MultiStep";

const ContactStep = () => {
    const { options, setOptions, userInfo, setUserInfo } = useContext(AppContext);
    const { stepOne, stepThree } = userInfo
    const { id } = useParams();
    const formik = useFormikContext();
  
    return (
      <>
      <FormStep
        stepNumber={3}
        stepName='Conversion a contacto'
      >
        <div id="medModPago_grid" className="grid-lead-face-to-face-sale">
  
          <InputField label="DNI" type='text' 
          placeholder="Ingrese DNI" id="name" name="name" 
          value={id}   />
          <InputField label="SEXO" type='text' 
          placeholder="Seleccionar sexo" id="username" name="username" 
          value={id}   />
          <InputField label="FECHA DE NACIMIENTO" type='text' 
          placeholder="--/--/----" id="email" name="email" 
          value={id}   />
          <InputField label="PAIS" type='text' 
          placeholder="Ingresar pais" id="telephone" name="telephone" 
          value={id}   />
          <InputField label="PROVINCIA/ESTADO" type='text' 
          placeholder="Ingresar localidad" id="profession" name="profession" 
          value={id}   />
          <InputField label="CODIGO POSTAL" type='text' 
          placeholder="Ingresar matricula" id="speciality" name="speciality" 
          value={id}   />
          <InputField label="DIRECCION" type='text' 
          placeholder="Ingresar calle y numero" id="method_contact" name="method_contact" 
          value={id}   />
          <InputField label="LOCALIDAD" type='text' 
          placeholder="Ingresar localidad" id="telephone" name="telephone" 
          value={id}   />
          <InputField label="NUMERO DE MATRICULA" type='text' 
          placeholder="Ingresar matricula" id="profession" name="profession" 
          value={id}   />
          <InputField label="AREA DE TRABAJO" type='text' 
          placeholder="Ingresar area de trabajo" id="speciality" name="speciality" 
          value={id}   />
          <InputField label="INTERES DE FORMACION" type='text' 
          placeholder="Ingresar interes de formacion" id="method_contact" name="method_contact" 
          value={id}   />
        </div>
      </FormStep>
      
      </>
    );
  }
  
  export default ContactStep;