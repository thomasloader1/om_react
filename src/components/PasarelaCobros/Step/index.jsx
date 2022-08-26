/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import './Step.scss';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Button from '../Button';
import SideItem from '../SideItem';
import Side from '../Side';
import { AppContext } from '../Provider/StateProvider';
import { sideItemOptions } from '../../../config/config';


function Step({ children, currentStep, stepTitle }) {
  const [state,setState] = useContext(AppContext);
  const [backBtnDisabled, setBackBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false)
  
  const toast = withReactContent(Swal)
  const fireToast = (title) =>{
    toast.fire({
        title: <p>{title}</p>,
        toast: true,
        icon: 'error',
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (alert) => {
          alert.addEventListener('mouseenter', Swal.stopTimer)
          alert.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
  }

  const validateSuccessStep = (nextStep, backStep) => {
    state.sideItemOptions.forEach(({step, status, value}) => {
      if(status === 'current' && value !== ''){
        nextStep.step = step + 1
        nextStep.allow = true
        backStep.step = step
        backStep.allow = nextStep.step > 1 
        sideItemOptions[step - 1].status = 'completed';
        sideItemOptions[step].status = 'current';
        console.log(nextStep, backStep)
        return
      }
       console.log({step, status, value})
    })
    
    if(!nextStep.allow){
      fireToast('Debe seleccionar una opcion para avanzar')
    } 
  }  

  const handleBackStep = (actualStep)=>{}
  const handleNextStep = (actualStep)=>{
    
    const nextStep = {step: actualStep, allow: true}
    const backStep = {step: null, allow: false}
    validateSuccessStep(nextStep, backStep)
    
    // console.log(backStep,nextStep)
    setNextBtnDisabled(!nextStep.allow)
    setBackBtnDisabled(!backStep.allow)
  }


  useEffect(() => {
    setState({...state, sideItemOptions: [...sideItemOptions]})
    // console.log({backBtnDisabled, nextBtnDisabled,state})
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
          <Button disabled={backBtnDisabled} className="flex-grow-1" label="Volver" fullwidth onClick={()=> handleBackStep(currentStep)}/>
          <Button disabled={nextBtnDisabled} className="flex-grow-1" label="Siguiente" fullwidth onClick={()=> handleNextStep(currentStep)}/>
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
