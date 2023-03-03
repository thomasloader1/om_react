import { useContext } from 'react';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';

export const useAppEnv = () => {
  const {
    options,
    setOptions,
    setFormikValues,
    stepNumberGlobal,
    setStepNumberGlobal,
    selectedCourses,
    setSelectedCourses,
  } = useContext(AppContext);

  //console.log("useAppEnv()",{stepNumberGlobal})

  const setValues = ({ step_number, ...values }) => {
    setFormikValues((prevState) => ({
      ...prevState,
      ...values,
    }));

    step_number =
      step_number === undefined ? stepNumberGlobal + 1 : step_number;

    const { country, lead, contact, contract, products } = values;

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

        if (
          contact !== null &&
          typeof contact !== 'undefined' &&
          option.step === 3
        ) {
          const {
            lead_id,
            id,
            entity_id_crm,
            type_of_address,
            training_interest,
            registration_number,
            area_of_work,
            ...formContact
          } = contact;
          const formIncomplete = Object.values(formContact).includes(null);
          //console.log({ formIncomplete, lead }, Object.values(lead));
          option.status = formIncomplete ? 'current' : 'completed';
          option.value = formIncomplete ? 'Sin completar' : 'Completado';
        } else if (sameStep && option.step === 3) {
          option.status = 'current';
        }

        console.log({ products, selectedCourses })
        if (
          products !== null &&
          typeof products !== 'undefined' &&
          option.step === 4
        ) {
          setSelectedCourses(products);
          option.status =
            contract !== null && typeof contract !== 'undefined'
              ? 'completed'
              : 'current';
          //option.value = formIncomplete ? 'Sin completar' : 'Completado';
        } else if (products == null &&
          typeof products === 'undefined' && sameStep && option.step === 4) {
          option.status = 'current';
        }

         if (
          contract !== null &&
          typeof products !== 'undefined' &&
          option.step === 5
        ) {
          option.status =
            contract !== null && typeof contract !== 'undefined'
              ? 'completed'
               : 'current';
          option.value = typeof contract === 'undefined'? 'Sin completar' : 'Completado';
           
          //option.value = formIncomplete ? 'Sin completar' : 'Completado';
        } else if (sameStep && option.step === 5) {
           option.status = 'current';
           option.value = 'Sin completar';
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
