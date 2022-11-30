import React from 'react'
import { Button } from 'react-bulma-components'

const FormNavigation = (props) => {
  return (
    <div className='controls'>
      {props.hasPrevious && (
        <Button className="flex-grow-1 is-primary is-normal is-fullwidth" type='button' onClick={props.onBackClick}>Volver</Button>
      )}
      <Button className="flex-grow-1 is-primary is-normal is-fullwidth" type='submit'>{props.isLastStep ? 'Finalizar' : 'Siguiente'}</Button>
    </div>
  )
}

export default FormNavigation