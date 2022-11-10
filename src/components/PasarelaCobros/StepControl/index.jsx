import React, { useContext } from 'react'
import { Button } from 'semantic-ui-react'
import { validateStep } from '../Hooks/useStepManager'
import { AppContext } from '../Provider/StateProvider';

console.group('StepControl')
function StepControl({currentStep, setCurrentStep,state, sideItemOptions, validStep, currentFormikValues = null}) {
  // console.log({currentStep, setCurrentStep,state, sideItemOptions, validStep})

  return (
    <div className='controls'>
      { currentStep > 1 && (<Button
            className="flex-grow-1 is-primary is-normal is-fullwidth"
            content="Volver"
            onClick={() => validateStep(currentStep,'back', state, sideItemOptions, setCurrentStep, currentFormikValues)}
          />)}
          <Button
            className="flex-grow-1 is-primary is-normal is-fullwidth"
            content="Siguiente"
            type='submit'
            disabled={!validStep}
            onClick={() => validateStep(currentStep,'next', state, sideItemOptions, setCurrentStep, currentFormikValues)}
          />
      </div>
  )
}
console.groupEnd()



export default StepControl