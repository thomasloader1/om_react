import React, { useContext } from 'react';
import { AppContext } from '../Provider/StateProvider';
import ResumeTicket from '../ResumeTicket';
import { FormStep } from './MultiStep';

function FormClientDataStep() {
  const { formikValues, userInfo } = useContext(AppContext);


  if (userInfo.stepTwo.value === "Mercado Pago") {
   
    return (
      <FormStep
        stepNumber={4}
        stepName='Confirme los datos del cliente'
      >
        <div id="grid-client_data">
          <ResumeTicket contractId={formikValues.contractId} />
        </div>
      </FormStep>)
  
} else {

    return (
      <FormStep
        stepNumber={4}
        stepName='Confirme los datos del cliente'
      >
        <div id="grid-client_data">
          <ResumeTicket contractId={formikValues.contractId} />
        </div>
      </FormStep>
    );
  }



}

export default FormClientDataStep;
