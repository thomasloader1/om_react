import axios from 'axios';
import { useFormikContext } from 'formik';
import React from 'react';
import { useContext } from 'react';
import { Button } from 'react-bulma-components';
import { useParams } from 'react-router';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import { useSwal } from '../Hook/useSwal';

const { NODE_ENV, REACT_APP_API } = process.env;
const isProduction = NODE_ENV === 'production';

const apiContractSaveProgress = isProduction
  ? `${REACT_APP_API}/api/contractSaveProgress`
  : '/api/contractSaveProgress';
const apiContactSaveProgress = isProduction
  ? `${REACT_APP_API}/api/contactSaveProgress`
  : '/api/contactSaveProgress';
const apiLeadSaveProgress = isProduction
  ? `${REACT_APP_API}/api/leadSaveProgress`
  : '/api/leadSaveProgress';
const apiProgress = isProduction
  ? `${REACT_APP_API}/api/progress`
  : '/api/progress';

const FormNavigation = ({ hasPrevious, isLastStep, onBackClick }) => {
  const { values, setFieldValue, ...formik } = useFormikContext();
  const { stepNumberGlobal, setAppEnv, appEnv } = useContext(AppContext);
  const { id } = useParams();
  const { modalAlert } = useSwal();
  const { savingProgress } = values;
  const disabledPrevButton = savingProgress;
  const disabledNextButton = savingProgress;
  const disabledSavingProgress = !formik.dirty;

  // console.log('FormNavigation', { values, formik, formValid: formik.isValid });

  const handleSaveProgress = async () => {
    setFieldValue('savingProgress', true);

    try {
      switch (stepNumberGlobal) {
        case 3: {
          const { products } = appEnv;
          const response = await axios.post(
            `${apiContractSaveProgress}/${id}`,
            {
              step_number: 4,
              products,
            }
          );

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
          const response = await axios.post(`${apiContactSaveProgress}/${id}`, {
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
          const response = await axios.post(`${apiLeadSaveProgress}/${id}`, {
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
          const response = await axios.put(`${apiProgress}/${id}`, {
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
          disabled={disabledPrevButton}
        >
          Volver
        </Button>
      )}

      <Button
        className={`flex-grow-1 is-success is-normal is-fullwidth ${
          savingProgress ? 'is-loading is-hover' : 'is-outlined'
        }`}
        type="button"
        onClick={handleSaveProgress}
        disabled={savingProgress || disabledSavingProgress}
      >
        Guardar
      </Button>

      <Button
        className={`flex-grow-1 is-primary is-normal is-fullwidth`}
        disabled={disabledNextButton || !formik.isValid}
        type="submit"
      >
        {isLastStep ? 'Ir a Pagar' : 'Siguiente'}
      </Button>
    </div>
  );
};

export default FormNavigation;
