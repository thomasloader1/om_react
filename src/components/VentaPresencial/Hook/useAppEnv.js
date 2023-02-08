import { useContext } from 'react';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';

export const useAppEnv = () => {
  const {
    options,
    setOptions,
    setFormikValues,
    stepNumberGlobal,
    setStepNumberGlobal,
  } = useContext(AppContext);

  console.log("useAppEnv()",{stepNumberGlobal})

  const setValues = ({ step_number, ...values }) => {

    setFormikValues((prevState) => ({
      ...prevState,
      ...values,
    }));

    step_number =
      step_number === undefined ? stepNumberGlobal + 1 : step_number;

    const { country, lead } = values;

    options.sideItemOptionsVP.map((option) => {
      const sameStep =
        step_number === option.step || step_number >= option.step;
      if (sameStep) {
        if (country !== null && option.step === 1) {
          option.status = 'completed';
          option.value = country;
        }

        if (lead !== null && typeof lead !== 'undefined' && option.step === 2) {
          const { contact_id, entity_id_crm, ...formLead } = lead;
          const formIncomplete = Object.values(formLead).includes(null);
          //console.log({ formIncomplete, lead }, Object.values(lead));
          option.status = formIncomplete ? 'current' : 'completed';
          option.value = formIncomplete ? 'Sin completar' : 'Completado';
        } else if (sameStep && option.step === 2) {
          option.status = 'current';
        }
      }

      return { ...option };
    });

    setOptions({ ...options });
    const stepIndex = step_number - 1;
    setStepNumberGlobal(stepIndex);
  };



  return {
    setFormikValues,
    setValues,
    stepNumberGlobal,
    setStepNumberGlobal,
  };
};
