/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './RadioButton.scss';
import {Ref ,Image, Radio } from 'semantic-ui-react';

import IMAGES from '../../../img/pasarelaCobros/share';
import { AppContext } from '../Provider/StateProvider';
import { delegateManager } from '../Hooks/useStepManager';

function RadioButton({...props }) {
  const {
    disabled,
    showText,
    img,
    idElement,
    value,
    name,
    className,
    classLabel,
    typeBtn,
    formikHook,
    formikValue
  } = props;
 // console.log({props}, 'radioButton')
  const formRadioRef = useRef(null);
  const [btnStatus, setBtnStatus] = useState(null);
  const [btnType] = useState(typeBtn);
  const [classes, setClasses] = useState(className);

  const [state, setState] = useContext(AppContext);

  const buttonStatus = {
    country: {
      active: 'grid-country-item is-link is-light is-outlined',
      default: 'grid-country-item'
    },
    payment_method: {
      active: 'grid-payment_method-item tall is-link is-light is-outlined',
      default: 'grid-payment_method-item tall'
    }
  };

  const imageIcon = img && <Image src={IMAGES[img]} alt={value} size='small' />
  const labelOfRadio = showText ? value : ''

  const handleClick = () => {
    const [currentStepObject] = state.sideItemOptions.filter( options => options.status === 'current');
    
    console.group('Radio Handle',{ currentStepObject, formRadioRef, formikValue, idElement, state, props });
    delegateManager(currentStepObject, formRadioRef, idElement, state, formikHook);
    console.groupEnd();

    setState({ ...state });
    setBtnStatus('active');
  };

  useEffect(() => {
    setClasses(buttonStatus[btnType][btnStatus]);
  }, [btnStatus, formRadioRef]);

  return (
    
        <button type='button' className={`button ${classes ?? className}`} onClick={handleClick} >
        {imageIcon}
        <Ref innerRef={formRadioRef}>
        <Radio
            name={name}
            value={value}
            disabled={disabled}
            label={labelOfRadio}
            checked={formikValue === value}
            onChange={props.onChange}
            id={props.idElement}
          />
          </Ref>
        </button>

  );
}


RadioButton.defaultProps = {
  showText: true,
  disabled: false,
  className: '',
  classLabel: '',
  name: '',
  img: '',
  typeBtn: 'country'
};
export default RadioButton;
