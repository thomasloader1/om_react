/* eslint-disable react/prop-types */
import React from 'react'
import { Button } from 'semantic-ui-react'
import { validateStep } from '../Hooks/useStepManager'

function StepControl({currentStep, setCurrentStep,state, sideItemOptions}) {
  return (
    <div className='controls'>
      { currentStep > 1 && (<Button
            className="flex-grow-1 is-primary is-normal is-fullwidth"
            content="Volver"
            onClick={() => validateStep(currentStep,'back', state, sideItemOptions, setCurrentStep)}
          />)}
          <Button
            className="flex-grow-1 is-primary is-normal is-fullwidth"
            content="Siguiente"
            type='submit'
            onClick={() => validateStep(currentStep,'next', state, sideItemOptions, setCurrentStep)}
          />
      </div>
  )
}



export default StepControl