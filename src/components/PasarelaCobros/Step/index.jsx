/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { fireToast } from '../Hooks/useSwal';
import { AppContext } from '../Provider/StateProvider';
import { sideItemOptions } from '../../../config/config';

import Button from '../Button';
import SideItem from '../SideItem';
import Side from '../Side';

// eslint-disable-next-line react/prop-types
function Step({ children, currentStep, stepTitle, setCurrentStep }) {
  const [state, setState] = useContext(AppContext);

  const validateSuccessStep = (actualStep, direction) => {
    const validateResponse = { hasError: true };
    
    // const stepState = state.sideItemOptions.filter((sideItem) => sideItem.step === actualStep)
    const indexOfActualStep = actualStep - 1;
    const indexOfNextStep = indexOfActualStep + 1;
    const indexOfPrevStep = indexOfActualStep > 0 ? indexOfActualStep - 1 : 0;
    
    // console.log({stepState, indexOfActualStep,indexOfNextStep,indexOfPrevStep,sideItemOptions, actualOption: sideItemOptions[indexOfActualStep]})
    if(direction === 'next'){
      state.sideItemOptions.forEach(({ step, status, value }) => {
      if (status === 'current' && value !== '') {
          
          sideItemOptions[indexOfActualStep].status = 'completed';

          // Set next step
          sideItemOptions[indexOfNextStep].status = 'current';
          
          validateResponse.hasError = false;
          setCurrentStep(s => s + 1)

        }
        
      });
    }else{
      
      sideItemOptions[indexOfActualStep].status = '';
      sideItemOptions[indexOfPrevStep].status = 'current';
     
      validateResponse.hasError = false;
      setCurrentStep(s => s - 1)
      
      // console.log({actualStep, backStep, nextStep, sideOptionActualStep: sideItemOptions[actualStep], sideOptionGoFrom:  sideItemOptions[goFrom]}, direction)
    }

    if (validateResponse.hasError) {
      fireToast('Debe seleccionar una opcion para avanzar');
    }
  };

  const childrenArray = React.Children.toArray(children);
  const currentChildren = childrenArray[currentStep - 1];
 
  useEffect(() => {
    setState({ ...state, sideItemOptions: [...sideItemOptions] });
  }, [currentStep]);

  return (
    <div className="pasarela columns mx-auto">
      <div className="pasarela-1 column seleccion-pais">
        {currentStep !== 0 && (
          <h2 className="title is-4">
            <span className="has-text-white has-background-black is-circle">
              {currentStep}
            </span>
            {stepTitle}
          </h2>
        )}
        {currentChildren}
        <div id="stepControls" className="stepControls is-flex">
         { currentStep > 1 && (<Button
            className="flex-grow-1"
            label="Volver"
            fullwidth
            onClick={() => validateSuccessStep(currentStep,'back')}
          />)}
          <Button
            className="flex-grow-1"
            label="Siguiente"
            fullwidth
            onClick={() => validateSuccessStep(currentStep,'next')}
          />
        </div>
        <pre>
          {JSON.stringify(state,null,2)}
        </pre>
      </div>

      <Side>
        {state.sideItemOptions.map(({ step: stepNumber, label, status, value }) => (
          <SideItem
            key={stepNumber}
            currentStep={stepNumber}
            label={label}
            status={status}
            valueSelected={value}
          />
        ))}
      </Side>
    </div>
  );
}

Step.propTypes = {
  children: PropTypes.node.isRequired,
  currentStep: PropTypes.number.isRequired,
  stepTitle: PropTypes.string.isRequired
};

export default Step;
