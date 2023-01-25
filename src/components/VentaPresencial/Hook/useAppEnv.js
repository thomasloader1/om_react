import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import { useProgress } from './useProgress';

export const useAppEnv = () => {
  const {
    options,
    setOptions,
    userInfo,
    setUserInfo,
    formikValues,
    setFormikValues,
    setAppEnv,
  } = useContext(AppContext);
  const [stepNumber, setStepNumber] = useState(1);
  const [progressLoadedFormStep, setProgressLoadedFormStep] = useState(null);
  const { fetching: creatingProgress, appEnv, updateProgress } = useProgress();

  const setValues = ({ step, ...values }) => {
    setFormikValues({
      ...values,
    });

    setProgressLoadedFormStep(step);

    options.sideItemOptionsVP.map((option) => {
      const stepHasIncompleted = !option.status.includes('completed');

      if (step === option.step && option.step === 1 && stepHasIncompleted) {
        option.status = 'completed';
        option.value = values?.country;
      }

      if (step === option.step && option.step === 2 && stepHasIncompleted) {
        const { contact_id, entity_id_crm, ...leadForm } = values.lead;
        const formIncomplete = Object.values(leadForm).includes(null);

        option.status = formIncomplete ? 'current' : 'completed';
        option.value = formIncomplete ? 'Sin completar' : 'Completado';
      } else if (option.step === 2 && stepHasIncompleted) {
        option.status = 'current';
      }

      return { ...option };
    });

    setOptions({ ...options });
    setStepNumber(step);
  };

  useEffect(() => {
    console.log({ appEnv });
    if (appEnv !== null && progressLoadedFormStep === null) {
      /*  console.log({ appEnv }); */
      setValues(appEnv);
    }

    return () => null;
  }, [stepNumber, creatingProgress, formikValues]);

  const saveLead = async (values) => {
    const body = new FormData();
    const requestConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    let dataJson = {
      lead: {
        lead_id: appEnv.lead_id !== undefined ? appEnv.lead_id : null,
        ...values,
      },
    };

    body.append('dataJson', JSON.stringify(dataJson));

    const responseOfLaravel = await axios.post(
      'http://127.0.0.1:8000/api/db/stepCreateLead',
      body,
      requestConfig
    );
    console.log({ responseOfLaravel });

    if (responseOfLaravel.data.message === 'success') {
      setAppEnv((appEnvCurrent) => ({
        ...appEnvCurrent,
        lead_id: responseOfLaravel.data.newLead.id,
      }));
    }
    console.log({ appEnv });
  };

  const saveContact = async (values) => {
    console.log({ values });
    const body = new FormData();
    const requestConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
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
      'http://127.0.0.1:8000/api/db/stepConversionContact',
      body,
      requestConfig
    );

    if (responseOfLaravel.data.message === 'success') {
      setAppEnv((appEnvCurrent) => ({
        ...appEnvCurrent,
        contact_id: responseOfLaravel.data.newContact.id,
        address_id: responseOfLaravel.data.newAddress.id,
      }));
    }

    console.log({ appEnv });
  };

  return {
    setFormikValues,
    setAppEnv,
    appEnv,
    saveLead,
    saveContact,
    setValues,
    creatingProgress,
    updateProgress,
    stepNumber,
    setStepNumber,
  };
};
