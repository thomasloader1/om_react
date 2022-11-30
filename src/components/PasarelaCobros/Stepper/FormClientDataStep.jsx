import React, { useContext } from 'react';
import InputField from '../InputField/InputField';
import { AppContext } from '../Provider/StateProvider';
import ButtonField from '../RadioButton/ButtonField';
import ResumeTicket from '../ResumeTicket';
import { FormStep } from './MultiStep';

function FormClientDataStep() {
  const { options, formikValues, userInfo } = useContext(AppContext);
  const { clientForm } = options

  const clientFormWithoutOptions = clientForm.filter(
    (input) => !input.options
  );

  const clientFormRadioField = clientForm.filter(
    (input) => input.options && typeof input.options[0] === 'string'
  );

  console.log({ clientFormWithoutOptions, clientFormRadioField })


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
     /*  <FormStep
        stepNumber={4}
        stepName='Complete los datos del cliente'
      >
        <div id='grid-client_data'>
          <div className="suscri_type">
            
            {clientFormRadioField.map((input) => (
              input.options.map((option, i) => (
                <ButtonField
                  showText={true}
                  className="button"
                  key={input.idElement}
                  value={option}
                  idElement={`${input.idElement}-${i}`}
                  name="type"
                />
              ))
            ))}

          </div>

          {clientFormWithoutOptions.map((input) => (
            <InputField
              key={input.idElement}
              name={input.idElement}
              id={input.idElement}
              placeholder={input.placeholder}
              label={input.label}
            />
          ))}

        </div>
      </FormStep> */
    );
  }



}

export default FormClientDataStep;
