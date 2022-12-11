import React from 'react';
import PropTypes from 'prop-types';
import { MdOutlineEditNote } from 'react-icons/md';
import './SideItem.scss';
import { useContext } from 'react';
import { AppContext } from '../Provider/StateProvider';

function SideItem({ currentStep, label, status, className, valueSelected, stepStateNumber, formikInstance }) {
  const stepStatus = {
    current: `card current ${className}`,
    completed: `card completed ${className}`
  };

  const { setStepNumber } = stepStateNumber
  const { options, setOptions, formikValues, setFormikValues, userInfo, setUserInfo, setStepNumberGlobal } = useContext(AppContext)

  const classNameStatus = status !== '' ? `${stepStatus[status]}` : className;
  const titleCurrentStep = currentStep > 3 && !valueSelected ? 'Sin completar' : !valueSelected ? 'Sin seleccionar' : valueSelected
  
  const editStep = (stepNumber) => {
    console.log({formikInstance, formikValues, stepNumber})

    switch(stepNumber){
      case 1:{
        const {country, ...rest} = formikInstance.values;
        
        Object.entries(rest).forEach(([key]) => {
          formikInstance.setFieldValue(key,'');
          formikInstance.setTouched({})
        });
        
        userInfo.stepFive.value = '';
        userInfo.stepFour.value = '';
        userInfo.stepThree.value = '';
        userInfo.stepTwo.value = '';

        setUserInfo({...userInfo})
        setFormikValues({...formikInstance.values})

        console.log({rest, formikInstance,userInfo})
        break;
      }
      case 2:{
        const {country,payment_method, ...rest} = formikInstance.values;
        
        Object.entries(rest).forEach(([key]) => {
          formikInstance.setFieldValue(key,'');
          formikInstance.setTouched({})
        });
        
        userInfo.stepFive.value = '';
        userInfo.stepFour.value = '';
        userInfo.stepThree.value = '';

        setUserInfo({...userInfo})
        setFormikValues({...formikInstance.values})

        console.log({rest, formikInstance,userInfo})
        break;
      }
      case 3:{
        const {country,payment_method, contractId, mod, quotes, ...rest} = formikInstance.values;
        
        Object.entries(rest).forEach(([key]) => {
          formikInstance.setFieldValue(key,'');
          formikInstance.setTouched({})
        });
        
        userInfo.stepFive.value = '';
        userInfo.stepFour.value = '';

        setUserInfo({...userInfo})
        setFormikValues({...formikInstance.values})

        console.log({rest, formikInstance,userInfo})
        break;
      }
      case 4:{
        const {country,payment_method, contractId, mod, quotes, checkContract, ...rest} = formikInstance.values;
        
        Object.entries(rest).forEach(([key]) => {
          formikInstance.setFieldValue(key,'');
          formikInstance.setTouched({})
        });
        
        userInfo.stepFive.value = '';

        setUserInfo({...userInfo})
        setFormikValues({...formikInstance.values})

        console.log({rest, formikInstance,userInfo})
        break;
      }
      default:{
        console.log("CHUPALA")
        break;
      }
    }


    
    options.sideItemOptions.forEach((stepObject, index) =>{
      /* console.group(`${index}`)
      console.log({stepObject})
      console.log("if",stepNumber === stepObject.step)
      console.log("else if",stepNumber < stepObject.step)
      console.groupEnd(); */

      if(stepNumber === stepObject.step){
        options.sideItemOptions[stepNumber - 1].status = 'current'
      }else if(stepNumber < stepObject.step){
        options.sideItemOptions[index].status = ''
        options.sideItemOptions[index].value = ''
      }
    })
    

    setOptions({ ...options })
    setStepNumber(stepNumber - 1)
    setStepNumberGlobal(stepNumber - 1)
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
