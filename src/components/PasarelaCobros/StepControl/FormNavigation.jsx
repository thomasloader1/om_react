import React from 'react';
import { useFormikContext } from 'formik';
import { Button } from 'react-bulma-components';

const FormNavigation = (props) => {
  const formik = useFormikContext();
  const disabledButtonDefault = props.isLastStep === !formik.values.cardComplete;
  const disabledButtonCTC = props.isLastStep === (formik.values.folio_suscripcion && formik.values.folio_pago);

  const disabledButton = formik.values?.payment_method?.includes("CTC") ? disabledButtonCTC : disabledButtonDefault
  //console.log(props.isLastStep)

  return (
    <div className='controls'>
      {props.hasPrevious && (
        <Button
          className='flex-grow-1 is-primary is-outlined is-normal is-fullwidth'
          type='button'
          onClick={props.onBackClick}
        >
          Volver
        </Button>
      )}

      <Button
        className={`flex-grow-1 is-primary is-normal is-fullwidth`}
        disabled={disabledButton}
        type='submit'
      >
        {props.isLastStep ? 'Finalizar' : 'Siguiente'}
      </Button>

    </div>
  );
};

export default FormNavigation;
