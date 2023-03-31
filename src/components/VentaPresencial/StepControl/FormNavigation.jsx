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
  const { tokenLogin,stepNumberGlobal, setAppEnv, appEnv } = useContext(AppContext);
  const { id } = useParams();
  const { modalAlert } = useSwal();
  const { savingProgress } = values;
  const disabledPrevButton = savingProgress;
  const disabledNextButton = savingProgress;
  const disabledSavingProgress = !formik.dirty;
  const isMediaQSmall = useMediaQSmall();
  const { save } = IMAGES;

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
            },
                    { headers: { Authorization: tokenLogin } }

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
          const response = await axios.post(
            `${apiContactSaveProgress}/${id}`,
            {
              step_number: 3,
              ...values,
            },
            { headers: { Authorization: tokenLogin } }
          );

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
        console.log("llamando al apiLeadSaveProgress que requiere auntenticacion, este el el token: ", {tokenLogin})
          const response = await axios.post(`${apiLeadSaveProgress}/${id}`,
            { step_number: 2, ...values, }, { headers: { Authorization: tokenLogin } }
          );
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
          className="prev-button flex-grow-1 is-primary is-normal is-fullwidth is-outlined"
          type="button"
          onClick={onBackClick}
          disabled={disabledPrevButton}
        >
          Volver
        </Button>
      )}

      <Button
        className={`save-button flex-grow-1 is-primary ${
          !isMediaQSmall ? 'is-outlined' : ''
        } is-normal is-fullwidth ${
          savingProgress ? 'is-loading is-hover' : ''
        }`}
        type="button"
        onClick={handleSaveProgress}
        disabled={savingProgress || disabledSavingProgress}
      >
        <span>Guardar</span> <img alt="guardar" src={save} />
      </Button>

      <Button
        className={`flex-grow-1 is-primary is-normal is-fullwidth next-button`}
        disabled={disabledNextButton || !formik.isValid}
        type="submit"
      >
        {isLastStep ? 'Ir a Pagar' : 'Siguiente'}
      </Button>
    </div>
  );
};

export default FormNavigation;
