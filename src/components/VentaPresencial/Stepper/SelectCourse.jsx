import { useFormikContext } from "formik";
import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import InputField from "../../PasarelaCobros/InputField";
import { AppContext } from "../../PasarelaCobros/Provider/StateProvider";
import { FormStep } from "./MultiStep";

const SelectCourseStep = () => {
    const { options, setOptions, userInfo, setUserInfo } = useContext(AppContext);
    const { stepOne, stepThree } = userInfo
    const { id } = useParams();
    const formik = useFormikContext();
  
    return (
      <>
      <FormStep
        stepNumber={3}
        stepName='Seleccion de Curso'
      >
        <div id="medModPago_grid" className="grid-lead-face-to-face-sale">
  
        </div>
      </FormStep>
      
      </>
    );
  }
  
  export default SelectCourseStep;