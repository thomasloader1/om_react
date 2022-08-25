/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import './Step.scss';
import Button from '../Button';
import SideItem from '../SideItem';
import Side from '../Side';
import { AppContext } from '../Provider/StateProvider';
import { sideItemOptions } from '../../../config/config';

function Step({ children, currentStep, stepTitle }) {
  const [state,setState] = useContext(AppContext);
  const [backBtnDisabled, setBackBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false)

  const handleBackStep = ()=>{}
  const handleNextStep = ()=>{
    const nextStep = state.sideItemOptions.map(step => {
      if(step.status === 'current' && step.value !== ''){

        sideItemOptions[step.step].status = 'current'
      }
      return (step.status === 'current' && step.value !== '')
    })
  console.log(nextStep)
    
    setNextBtnDisabled(nextStep)
    setBackBtnDisabled(nextStep)
  }


  useEffect(() => {
    setState({...state, sideItemOptions: [...state.sideItemOptions]})
    console.log({backBtnDisabled, nextBtnDisabled,state})
  }, [backBtnDisabled, nextBtnDisabled])
  
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
        {children}
        <div id="stepControls" className="stepControls is-flex">
          <Button disabled={backBtnDisabled} className="flex-grow-1" label="Volver" fullwidth onClick={()=> handleBackStep()}/>
          <Button disabled={nextBtnDisabled} className="flex-grow-1" label="Siguiente" fullwidth onClick={()=> handleNextStep()}/>
        </div>
      </div>

      <Side>
        {state.sideItemOptions.map(({ step, label, status, value }) => (
          <SideItem
            key={step}
            currentStep={step}
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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  stepTitle: PropTypes.string.isRequired,
  currentStep: PropTypes.number.isRequired
};

export default Step;
