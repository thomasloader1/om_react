/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './RadioButton.scss';
import { Form } from 'react-bulma-components';

import IMAGES from '../../../img/pasarelaCobros/share';
import { AppContext } from '../Provider/StateProvider';
// import usePreviousRef from '../Hooks/usePreviousRef';

function RadioButton({
  disabled,
  showText,
  img,
  idElement,
  value,
  name,
  className,
  classLabel,
}) {
  // eslint-disable-next-line no-unused-vars
  const formRadioRef = useRef(null)
  // const prevRef = usePreviousRef(formRadioRef)
  const [btnStatus, setBtnStatus] = useState(null)
  const [classes, setClasses] = useState(className)
  
  const [state,setState] = useContext(AppContext);
  
  const buttonStatus = {
    active: 'is-link is-light is-outlined',
    default: ''
  };

  const handleClick = () =>{
    const country = formRadioRef.current.firstChild.value.toLowerCase()

    formRadioRef.current.id = country
    state.userFlow.stepOne.value = country
    document.querySelectorAll('label[id]').forEach((val) => {
      // console.log({val},val.id.includes(country) , country, val.id)
      if(val.id.includes(country)){
        val.classList.add('is-link','is-light','is-outlined')
      }else{
        val.classList.remove('is-link','is-light','is-outlined')
      }
    })

    state.sideItemOptions.map((step) => {
      // console.log({step})
      if(step.status === 'current'){
        step.value = formRadioRef.current.firstChild.value
        return {...step}
      }
      return {...step}
    })

    setBtnStatus('active');
    setState({
      ...state
    })
  }

  useEffect(()=>{
    setClasses(buttonStatus[btnStatus])
  },[btnStatus])

  // Botón default render
  return (
    <Form.Field className={classLabel} >
      <Form.Control>
        <Form.Radio
          id={idElement}
          className={`gridCuartos-item button ${classes ?? ''}`}
          name={name}
          value={value}
          disabled={disabled}
          onClick={handleClick}
          domRef={formRadioRef}
        >
          {img && <img src={IMAGES[img]} alt={value} />}
          {showText && <h4 className="text_option">{value}</h4>}
        </Form.Radio>
      </Form.Control>
    </Form.Field>
  );
}

RadioButton.propTypes = {
  showText: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  classLabel: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  img: PropTypes.string,

};
RadioButton.defaultProps = {
  showText: true,
  disabled: false,
  className: '',
  classLabel: '',
  name: '',
  img: '',

};
export default RadioButton
