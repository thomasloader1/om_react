import axios from 'axios';
import { useFormikContext } from 'formik';
import React from 'react';
import { useContext } from 'react';
import { Button } from 'react-bulma-components';
import { useParams } from 'react-router';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import { useAppEnv } from '../Hook/useAppEnv';
import { useSwal } from '../Hook/useSwal';

const FormNavigation = ({ hasPrevious, isLastStep, onBackClick }) => {
  const { values, setFieldValue, ...formik } = useFormikContext();
  const { stepNumberGlobal, setAppEnv } = useContext(AppContext);
  const { id } = useParams();
  const { modalAlert } = useSwal();
  const { cardComplete, savingProgress } = values;
  const disabledButton = isLastStep === !cardComplete || savingProgress;
  const disabledSavingProgress = !formik.dirty;

  const handleSaveProgress = async () => {
    setFieldValue('savingProgress', true);
    console.log({ stepNumberGlobal, ...values });

    try {
      switch (stepNumberGlobal) {
        case 2: {
          const response = await axios.post(`/api/contactSaveProgress/${id}`, {
            step_number: 3,
            ...values,
          });

          const {contact, lead, progress} = response.data;


          setAppEnv((prevState) => ({
            ...prevState,
            ...progress,
            lead: {...lead},
            contact:{...contact}
          }));
          console.log({ stepNumberGlobal, response });
          break;
        }
        case 1: {
          const response = await axios.post(`/api/leadSaveProgress/${id}`, {
            step_number: 2,
            ...values,
          });
          const { lead } = response.data;
          setAppEnv((prevState) => ({
            ...prevState,
            lead,
          }));
          console.log({ stepNumberGlobal, response });
          break;
        }
        default: {
          const response = await axios.put(`/api/progress/${id}`, {
            step_number: 1,
            ...values,
          });

          const { stepNumberGlobal: step_number, ...restValues } =
            response.data;

          setAppEnv((prevState) => ({
            ...prevState,
            ...restValues,
          }));
          console.log({ stepNumberGlobal, response });
          break;
        }
      }

      modalAlert('Progreso guardado', 'success');
    } catch (e) {
      const { message } = e.response.data;
      modalAlert(message, 'error');
      console.log({ e });
    } finally {
      setFieldValue('savingProgress', false);
    }
  };

  return (
    <div className="controls">
      {hasPrevious && (
        <Button
          className="flex-grow-1 is-primary is-normal is-fullwidth"
          type="button"
          onClick={onBackClick}
          disabled={disabledButton}
        >
          Volver
        </Button>
      )}

      <Button
        className={`flex-grow-1 is-success is-normal is-fullwidth ${
          disabledButton ? 'is-loading is-hover' : 'is-outlined'
        }`}
        type="button"
        onClick={handleSaveProgress}
        disabled={disabledButton || disabledSavingProgress}
      >
        Guardar
      </Button>
      {!isLastStep && (
        <Button
          className={`flex-grow-1 is-primary is-normal is-fullwidth`}
          disabled={disabledButton}
          type="submit"
        >
          {isLastStep ? 'Pagar' : 'Siguiente'}
        </Button>
      )}
    </div>
  );
};

export default FormNavigation;
