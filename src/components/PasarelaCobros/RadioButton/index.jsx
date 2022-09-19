/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './RadioButton.scss';
import { Form } from 'react-bulma-components';
import { Radio } from 'semantic-ui-react';

import IMAGES from '../../../img/pasarelaCobros/share';
import { AppContext } from '../Provider/StateProvider';
import { delegateManager } from '../Hooks/useStepManager';

function RadioButton({ ...props }) {
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
    formikHook
  } = props;
  // console.log({props})
  const formRadioRef = useRef(null);
  const [btnStatus, setBtnStatus] = useState(null);
  const [btnType] = useState(typeBtn);
  const [classes, setClasses] = useState(className);

  const [state, setState] = useContext(AppContext);

  const buttonStatus = {
    country: {
      active: 'is-link is-light is-outlined',
      default: ''
    },
    payment_method: {
      active: 'tall is-link is-light is-outlined',
      default: ''
    }
  };

  const handleClick = () => {
    const [currentStepObject] = state.sideItemOptions.filter(
      (options) => options.status === 'current'
    );
    console.log({ currentStepObject, formRadioRef, idElement, state, props });
    delegateManager(currentStepObject, formRadioRef, idElement, state);
    // console.log(delegateManager(currentStepObject, formRadioRef, idElement, state))
    setState({ ...state });
    setBtnStatus('active');
  };

  useEffect(() => {
    setClasses(buttonStatus[btnType][btnStatus]);
  }, [btnStatus]);

  return (
    <Form.Field className={classLabel}>
      <Form.Control>
        <Form.Radio
          className={`gridCuartos-item button ${classes ?? className}`}
          name={name}
          value={value}
          disabled={disabled}
          onClick={handleClick}
          domRef={formRadioRef}
        >
          {img && <img src={IMAGES[img]} alt={value} />}
          {showText && <h4 className="text_option">{value}</h4>}
        </Form.Radio>
        <Radio
            className={`gridCuartos-item button ${classes ?? className}`}
            name={name}
            value={value}
            disabled={disabled}
            onClick={handleClick}
            label='Choose this'
            error={formikHook.errors.country}
            checked={formikHook.values.country === name}
            onChange={formikHook.handleChange}
          />
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
  typeBtn: PropTypes.string
};

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
