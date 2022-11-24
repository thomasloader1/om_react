import React from 'react';
import PropTypes from 'prop-types';
import { MdOutlineEditNote } from 'react-icons/md';
import './SideItem.scss';
import { useContext } from 'react';
import { AppContext } from '../Provider/StateProvider';

function SideItem({ currentStep, label, status, className, valueSelected, stepStateNumber }) {
  const stepStatus = {
    current: `card current ${className}`,
    completed: `card completed ${className}`
  };
  const {stepNumber, setStepNumber} = stepStateNumber

  const { options, setOptions, setStepNumberGlobal } = useContext(AppContext)

  // console.log({currentStep, label, status, className, valueSelected})

  const classNameStatus = status !== '' ? `${stepStatus[status]}` : className;
  const titleCurrentStep = currentStep > 3 && !valueSelected ? 'Sin completar' : !valueSelected ? 'Sin seleccionar' : valueSelected
  
  const editStep = (stepNumber) => {

    options.sideItemOptions.forEach((stepObject, index) =>{
      if(stepNumber === stepObject.step){
        options.sideItemOptions[stepNumber - 1].status = 'current'
      }else if(stepNumber < stepObject.step){
        options.sideItemOptions[index].status = ''
        options.sideItemOptions[index].value = ''
      }
    })
    

    setOptions({ ...options })
    setStepNumber(stepNumber - 1)
    console.log({sideOptions: options.sideItemOptions})
    
  }

  return (
    <div className={`side-item ${classNameStatus}`}>
      <span className="side-item-info">
        <div className="numstep">{currentStep}</div>

        <div className="is-flex is-flex-direction-column is-align-items-flex-start">
          <h3 className="subtitle is-uppercase">{!label ? 'Label' : label}</h3>
          <h4 className="title is-6">
            {titleCurrentStep}
          </h4>
        </div>
      </span>

      <button
        type="button"
        id={`editStep_${currentStep}`}
        className="button is-ghost"
        aria-label="User Profile"
      >
        <MdOutlineEditNote className="is-size-3" onClick={() => {
          editStep(currentStep)
        }}/>
      </button>
    </div>
  );
}

SideItem.propTypes = {
  currentStep: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  status: PropTypes.string,
  className: PropTypes.string,
  valueSelected: PropTypes.string.isRequired
};

SideItem.defaultProps = {
  status: '',
  className: ''
};

export default SideItem;
