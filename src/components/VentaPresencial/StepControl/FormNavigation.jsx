import axios from 'axios';
import { useFormikContext } from 'formik';
import React from 'react';
import { useContext } from 'react';
import { Button } from 'react-bulma-components';
import { useParams } from 'react-router';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';

const FormNavigation = ({ hasPrevious, isLastStep, onBackClick }) => {
  const { values, ...formik } = useFormikContext();
  const { stepNumberGlobal } = useContext(AppContext);
  const { id } = useParams();
  const { cardComplete, savingProgress } = values;
  const disabledButton = isLastStep === !cardComplete || savingProgress;
  const disabledSavingProgress = !formik.dirty;
  /* console.log({ formik }); */
  const handleSaveProgress = async () => {
    formik.setFieldValue('savingProgress', true);
    const response = await axios.put(`/api/progress/${id}`, {
      step_number: stepNumberGlobal,
      ...values,
    });

    console.log({ response });
    formik.setFieldValue('savingProgress', false);
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
