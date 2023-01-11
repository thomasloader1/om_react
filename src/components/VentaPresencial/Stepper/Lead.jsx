import { useFormikContext } from "formik";
import { useContext } from "react";
import { useParams } from "react-router";
import InputField from "../../PasarelaCobros/InputField";
import { AppContext } from "../../PasarelaCobros/Provider/StateProvider";
import { FormStep } from "./MultiStep";
import axios from 'axios';

const LeadStep =  () => {
    const { formikValues, setFormikValues, checkoutLink, setCheckoutLink, appRef, userInfo } = useContext(AppContext);
    const { useState,setOptions, setUserInfo } = useContext(AppContext);
    // const [fetching, setFetching] = useState(false)

    const { stepOne, stepThree } = userInfo
    const { name, username } = useParams();
    const formik = useFormikContext();

    const body = new FormData();
    const requestConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    let dataJson = {
      lead:{
        id: null,
        name: formik.values.name,
        username: formik.values.username,
        email: formik.values.email,
        telephone: formik.values.telephone,
        profession: formik.values.profession,
        speciality: formik.values.speciality,
        method_contact: formik.values.method_contact
      }
    };

    // body.append('dataJson', JSON.stringify(formik.values))
    body.append('dataJson', JSON.stringify(dataJson))

    axios.post("http://127.0.0.1:8000/api/db/stepCreateLead", body, requestConfig)
    .then(res => {
      
      console.log({ id: res.data.newLead.id })
    }).catch(err => {
      console.error({ err })
    }).finally((res) => {
    });

    // debugger;//10

    // console.log({ response });
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