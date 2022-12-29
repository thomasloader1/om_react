import { useFormikContext } from "formik";
import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import InputField from "../../PasarelaCobros/InputField";
import { AppContext } from "../../PasarelaCobros/Provider/StateProvider";
import { FormStep } from "./MultiStep";

const LeadStep = () => {
    const { options, setOptions, userInfo, setUserInfo } = useContext(AppContext);
    const { stepOne, stepThree } = userInfo
    const { id } = useParams();
    const formik = useFormikContext();
  
    return (
      <>
      <FormStep
        stepNumber={2}
        stepName='Creacion de lead'
      >
        <div id="medModPago_grid" className="grid-med_mod_payment-mp">
  
          <InputField label="Ingrese ID de Contrato" type='text' placeholder="2000339000004553081" id="contractId" name="contractId" value={id} readOnly />
          <InputField label="Ingrese ID de Contrato" type='text' placeholder="2000339000004553081" id="contractId" name="contractId" value={id} readOnly />
          <InputField label="Ingrese ID de Contrato" type='text' placeholder="2000339000004553081" id="contractId" name="contractId" value={id} readOnly />
          <InputField label="Ingrese ID de Contrato" type='text' placeholder="2000339000004553081" id="contractId" name="contractId" value={id} readOnly />
          <InputField label="Ingrese ID de Contrato" type='text' placeholder="2000339000004553081" id="contractId" name="contractId" value={id} readOnly />
          <InputField label="Ingrese ID de Contrato" type='text' placeholder="2000339000004553081" id="contractId" name="contractId" value={id} readOnly />
          <InputField label="Ingrese ID de Contrato" type='text' placeholder="2000339000004553081" id="contractId" name="contractId" value={id} readOnly />
  
        </div>
      </FormStep>
      
      </>
    );
  }
  
  export default LeadStep;