import React, { useContext } from 'react';
import { AppContext } from '../Provider/StateProvider';
import ResumeTicket from '../ResumeTicket';
import { FormStep } from './MultiStep';

function FormClientDataStep() {
  const { userInfo } = useContext(AppContext);

  return (
    <FormStep stepNumber={4} stepName='Confirma los datos del cliente'>
      <div className='is-divider m-0 mb-1'></div>

      <div id='grid-client_data'>
        <ResumeTicket forPayment={userInfo.stepTwo.value} />
      </div>
    </FormStep>
  );
}

export default FormClientDataStep;
