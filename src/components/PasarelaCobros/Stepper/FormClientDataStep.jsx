import React, { useContext } from 'react';
import { AppContext } from '../Provider/StateProvider';
import ResumeTicket from '../ResumeTicket';
import { FormStep } from './MultiStep';

function FormClientDataStep() {
  const { userInfo } = useContext(AppContext);

  if (userInfo.stepTwo.value === 'Mercado Pago') {
    return (
      <FormStep stepNumber={4} stepName='Confirma los datos del cliente'>
        <div className='is-divider m-0 mb-1'></div>
        <div id='grid-client_data'>
          <ResumeTicket />
        </div>
      </FormStep>
    );
  } else {
    return (
      <FormStep stepNumber={4} stepName='Confirma los datos del cliente'>
        <div className='is-divider'></div>
        <div id='grid-client_data'>
          <ResumeTicket />
        </div>
      </FormStep>
    );
  }
}

export default FormClientDataStep;
