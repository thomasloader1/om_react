import axios from 'axios';
import { useFormikContext } from 'formik';
import React from 'react';
import { useContext } from 'react';
import { Button } from 'react-bulma-components';
import { useParams } from 'react-router';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import { useSwal } from '../Hook/useSwal';
import { useMediaQSmall } from '../Hook/useMediaQuery';
import IMAGES from '../../../img/pasarelaCobros/share';

const FormNavigation = ({ hasPrevious, isLastStep, onBackClick }) => {
  const { values, setFieldValue, ...formik } = useFormikContext();
  const { stepNumberGlobal, setAppEnv, appEnv } = useContext(AppContext);
  const { id } = useParams();
  const { modalAlert } = useSwal();
  const { cardComplete, savingProgress } = values;
  const disabledButton = isLastStep === !cardComplete || savingProgress;
  const disabledSavingProgress = !formik.dirty;
  const isMediaQSmall = useMediaQSmall();
  const { save } = IMAGES;

  // console.log("FormNavigation",{values, formik, formValid: formik.isValid})

  const handleSaveProgress = async () => {
    setFieldValue('savingProgress', true);

    try {
      switch (stepNumberGlobal) {
        case 3: {
          const { products } = appEnv;
          const response = await axios.post(`/api/contractSaveProgress/${id}`, {
            step_number: 4,
            products,
          });

          const { contact, contract, lead, progress } = response.data;

          setAppEnv((prevState) => ({
            ...prevState,
            ...progress,
            lead: { ...lead },
            contact: { ...contact },
            contract: { ...contract },
          }));

          break;
        }
        case 2: {
          const response = await axios.post(`/api/contactSaveProgress/${id}`, {
            step_number: 3,
            ...values,
          });

          const { contact, lead, progress } = response.data;

          setAppEnv((prevState) => ({
            ...prevState,
            ...progress,
            lead: { ...lead },
            contact: { ...contact },
          }));

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
          className="prev-button flex-grow-1 is-primary is-normal is-fullwidth is-outlined"
          type="button"
          onClick={onBackClick}
          disabled={disabledButton}
        >
          Volver
        </Button>
      )}

      <Button
        className={`save-button flex-grow-1 is-primary ${
          !isMediaQSmall ? 'is-outlined' : ''
        } is-normal is-fullwidth ${
          disabledButton ? 'is-loading is-hover' : ''
        }`}
        type="button"
        onClick={handleSaveProgress}
        disabled={disabledButton || disabledSavingProgress}
      >
        <span>Guardar</span> <img alt="guardar" src={save} />
      </Button>
      {!isLastStep && (
        <Button
          className={`next-button flex-grow-1 is-primary is-normal is-fullwidth`}
          disabled={disabledButton || !formik.isValid}
          type="submit"
        >
          {isLastStep ? 'Pagar' : 'Siguiente'}
        </Button>
      )}
    </div>
  );
};

export default FormNavigation;
