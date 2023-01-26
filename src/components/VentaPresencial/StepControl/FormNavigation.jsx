import axios from 'axios';
import { useFormikContext } from 'formik';
import React, { useContext } from 'react';
import { Button } from 'react-bulma-components';
import { useParams } from 'react-router';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import { useAppEnv } from '../Hook/useAppEnv';

const FormNavigation = ({ hasPrevious, isLastStep, onBackClick }) => {
  const { values, setFieldValue, ...formik } = useFormikContext();
  const { stepNumberGlobal } = useContext(AppContext);
  const { stepNumber } = useAppEnv();
  const { id } = useParams();
  const { cardComplete, savingProgress } = values;
  const disabledButton = isLastStep === !cardComplete || savingProgress;
  const disabledSavingProgress = !formik.dirty;

  const handleSaveProgress = async () => {
    setFieldValue('savingProgress', true);
    console.log({ stepNumber, stepNumberGlobal, ...values });
    switch (stepNumberGlobal) {
      case 2: {
        const body = Object.fromEntries(
          Object.entries(values).map(([key, value]) =>
            value ? [key, value] : [key, null]
          )
        );

        const response = await axios.post(`/api/leadSaveProgress/${id}`, {
          step_number: 2,
          ...body,
        });
        console.log({ stepNumber, response });
        break;
      }
      default: {
        const response = await axios.put(`/api/progress/${id}`, {
          step_number: 1,
          ...values,
        });
        console.log({ stepNumber, response });
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
