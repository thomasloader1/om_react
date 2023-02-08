import { useContext } from 'react';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import { useLead } from '../Hook/useLead';
import { useContact } from '../Hook/useContact';

export const useAppEnv = () => {
  const {
    options,
    setOptions,
    setFormikValues,
    stepNumberGlobal,
    setStepNumberGlobal,
  } = useContext(AppContext);

  const { createContactSales } = useContact();
  const { createLeadSales } = useLead();

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

  const saveLead = async (values) => {
    createLeadSales(values);
  };

  const saveContact = async (values) => {
    console.log(values);
    createContactSales(values);

    /*  console.log({ values });
    const body = new FormData();
   
    let dataJson = {
      contact: {
        id: appEnv.contact_id !== undefined ? appEnv.contact_id : null,
        dni: values.dni,
        sex: values.sex,
        date_of_birth: values.date_of_birth,
        registration_number: values.registration_number,
        area_of_work: values.area_of_work,
        training_interest: values.training_interest,
      },
      address: {
        id: appEnv.address_id !== undefined ? appEnv.address_id : null,
        country: values.country,
        province_state: values.province_state,
        postal_code: values.postal_code,
        street: values.street,
        locality: values.locality,
      },
    };

    // body.append('dataJson', JSON.stringify(formik.values))
    body.append('dataJson', JSON.stringify(dataJson));

    const responseOfLaravel = await axios.post(
      '/api/db/stepConversionContact',
      body
    );

    if (responseOfLaravel.data.message === 'success') {
      setAppEnv((appEnvCurrent) => ({
        ...appEnvCurrent,
        contact_id: responseOfLaravel.data.newContact.id,
        address_id: responseOfLaravel.data.newAddress.id,
      }));
    }

    console.log({ appEnv }); */
  };

  return {
    setFormikValues,
    setValues,
    saveLead,
    saveContact,
    stepNumberGlobal,
    setStepNumberGlobal,
  };
};
