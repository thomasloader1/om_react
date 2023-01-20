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
    setFormikValues,
    setAppEnv,
    appEnv,
  } = useContext(AppContext);
  const [stepNumber, setStepNumber] = useState(0);
  const { fetching: creatingProgress, updateProgress } = useProgress();

  const setValues = ({ step, ...values }) => {
    setFormikValues({
      ...values,
    });

    const stepValues = {
      0: {
        value: values?.country,
        status: values?.country ? 'completed' : 'current',
      },
      1: 'completed',
      2: 'completed',
    };

    if (step > 1) {
      options.sideItemOptionsVP.map((value) => {
        if (value.step <= step) {
          value.status = 'completed';
          value.value = stepValues[step];
        }

        return value;
      });
    } else {
      options.sideItemOptionsVP[step - 1].value = values?.country
        ? values?.country
        : 'Sin seleccionar';
      userInfo.stepOne.value = values?.country;
      options.sideItemOptionsVP[step - 1].status = values?.country
        ? 'completed'
        : 'current';
      setOptions({ ...options });
      setUserInfo({ ...userInfo });
    }
    setStepNumber(step - 1);
  };

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

  useEffect(() => {
    setStepNumber(stepNumber);
    //console.log({ creatingProgress, appEnv });

    if (appEnv !== null) {
      /*  console.log({ appEnv }); */
      setValues(appEnv);
    }

    return () => null;
  }, [stepNumber, creatingProgress]);

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
