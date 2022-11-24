import React, { useContext } from 'react'
import { useEffect } from 'react';
import { Button } from 'semantic-ui-react'
import { validateStep } from '../Helpers/validateStep';
import { getCurrentStep } from '../Hooks/useCurrentStep';
import { AppContext } from '../Provider/StateProvider';

console.group('StepControl')
function StepControl({ currentStep, setCurrentStep, validStep, currentFormikValues = null }) {
  // console.log({currentStep, setCurrentStep,state, sideItemOptions, validStep})

  const { options, setOptions } = useContext(AppContext)

  useEffect(() => {
    setOptions({ ...options })
  }, [currentFormikValues])

  const { sideItemOptions } = options
  const currentStepObject = getCurrentStep(sideItemOptions)
  const { step } = currentStepObject

  return (
    <div className='controls'>
      {currentStep > 1 && (<Button
        className="flex-grow-1 is-primary is-normal is-fullwidth"
        content="Volver"
        onClick={() => {
          const prev = {
            actualStep: step,
            direction: 'back',
            options,
            setCurrentStep
          }
          validateStep(prev)
        }}
      />)}
      <Button
        className="flex-grow-1 is-primary is-normal is-fullwidth"
        content="Siguiente"
        type='submit'
        disabled={!validStep}
        onClick={() => {
          const next = {
            actualStep: step,
            direction: 'next',
            options,
            setCurrentStep,
          }
          validateStep(next)
        }}
      />
    </div>
  )
}
console.groupEnd()

export default StepControl