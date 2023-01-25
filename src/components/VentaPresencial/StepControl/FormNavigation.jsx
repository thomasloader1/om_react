import axios from 'axios';
import { useFormikContext } from 'formik';
import React from 'react';
import { useContext } from 'react';
import { Button } from 'react-bulma-components';
import { useParams } from 'react-router';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import { useProgress } from '../Hook/useProgress';

const FormNavigation = ({ hasPrevious, isLastStep, onBackClick }) => {
  const { values, setFieldValue, ...formik } = useFormikContext();
  const { stepNumberGlobal } = useContext(AppContext);
  const { id } = useParams();
  const { cardComplete, savingProgress } = values;
  const disabledButton = isLastStep === !cardComplete || savingProgress;
  const disabledSavingProgress = !formik.dirty;

  const handleSaveProgress = async () => {
    setFieldValue('savingProgress', true);
    console.log({ stepNumberGlobal, ...values });
    switch (stepNumberGlobal) {
      case 2: {
        const response = await axios.post(`/api/leadSaveProgress/${id}`, {
          step_number: 2,
          ...values,
        });
        console.log({ stepNumberGlobal, response });
        break;
      }
      default: {
        const response = await axios.put(`/api/progress/${id}`, {
          step_number: 1,
          ...values,
        });
        console.log({ stepNumberGlobal, response });
        break;
      }
    }

    setFieldValue('savingProgress', false);
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
