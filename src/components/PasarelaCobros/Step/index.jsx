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

function Step({ children, currentStep, stepTitle }) {
  const [state, setState] = useContext(AppContext);

  const [backBtnDisabled, setBackBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);

  const validateSuccessStep = (actualStep, direction) => {
    const validateResponse = { hasError: true };
    
    const nextStep = { step: actualStep, allow: true };
    const backStep = { step: null, allow: false };
   
    if(direction === 'next'){
    state.sideItemOptions.forEach(({ step, status, value }) => {
      if (status === 'current' && value !== '') {

          console.log({step, status, value}, direction)
          nextStep.step = step + 1;
          nextStep.allow = true;
          
          backStep.step = step;
          backStep.allow = nextStep.step > 1;
          
          sideItemOptions[step - 1].status = 'completed';
          sideItemOptions[step].status = 'current';
          
          validateResponse.hasError = false;
        }
        
        
        if (validateResponse.hasError) {
          fireToast('Debe seleccionar una opcion para avanzar');
        }
        
      });
    }else{
      
      const goFrom = actualStep - 1;
      
      backStep.step = goFrom - 1;
      backStep.allow = goFrom > 1;
      
      nextStep.step = goFrom;
      nextStep.allow = true;

      sideItemOptions[actualStep].status = '';
      sideItemOptions[goFrom].status = 'current';
     
      validateResponse.hasError = false;
      
      console.log({actualStep, backStep, nextStep, sideOptionActualStep: sideItemOptions[actualStep], sideOptionGoFrom:  sideItemOptions[goFrom]}, direction)
    }

    setNextBtnDisabled(!nextStep.allow);
    setBackBtnDisabled(!backStep.allow);
  };

  const childrenArray = React.Children.toArray(children);
  const [step] = useState(0)
  const currentChildren = childrenArray[step];
 
  useEffect(() => {
    setState({ ...state, sideItemOptions: [...sideItemOptions] });
  }, [backBtnDisabled, nextBtnDisabled]);

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
          <Button
            disabled={backBtnDisabled}
            className="flex-grow-1"
            label="Volver"
            fullwidth
            onClick={() => validateSuccessStep(currentStep,'back')}
          />
          <Button
            disabled={nextBtnDisabled}
            className="flex-grow-1"
            label="Siguiente"
            fullwidth
            onClick={() => validateSuccessStep(currentStep,'next')}
          />
        </div>
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
