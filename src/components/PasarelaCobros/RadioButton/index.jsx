/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useRef, useState } from 'react';
import './RadioButton.scss';
import { Image } from 'semantic-ui-react';

import { useField } from 'formik';

import IMAGES from '../../../img/pasarelaCobros/share';
import { AppContext } from '../Provider/StateProvider';
import { delegateManager } from '../Helpers/delegateManager';
import { getCurrentStep } from '../Hooks/useCurrentStep';

function RadioButton({ ...props }) {
  const [field, meta] = useField(props);

  const {
    disabled,
    showText,
    img,
    idElement,
    value,
    name,
    className,
    typeBtn,
    formikHook,
    formikValue,
  } = props;

  const formRadioRef = useRef(null);
  const [btnStatus, setBtnStatus] = useState(null);
  const [btnType] = useState(typeBtn);
  const [classes, setClasses] = useState(className);

  const {
    options,
    setOptions,
    userInfo,
    setUserInfo,
    formikValues,
    setFormikValues,
  } = useContext(AppContext);
  const { sideItemOptions } = options;

  const buttonStatus = {
    country: {
      active: 'grid-country-item is-link is-light is-outlined',
      default: 'grid-country-item',
    },
    payment_method: {
      active: 'grid-payment_method-item tall is-link is-light is-outlined',
      default: 'grid-payment_method-item tall',
    },
    mod_med_payment: {
      active: 'is-link is-light is-outlined',
      default: '',
    },
  };

  const imageIcon = img && <Image src={IMAGES[img]} alt={value} size="small" />;
  const labelOfRadio = showText ? value : '';

  const handleClick = () => {
    const currentStepObject = getCurrentStep(sideItemOptions);

    console.group('Radio Handle', {
      currentStepObject,
      formRadioRef,
      formikValue,
      idElement,
      options,
      props,
    });
    delegateManager(
      currentStepObject,
      formRadioRef,
      idElement,
      options,
      formikHook,
      userInfo,
      setUserInfo
    );
    console.groupEnd();

    const { values } = formikHook;

    setOptions({ ...options });
    setFormikValues({
      ...formikValues,
      ...values,
    });
    setBtnStatus('active');
  };

  useEffect(() => {
    setClasses(buttonStatus[btnType][btnStatus]);
  }, [btnStatus, formRadioRef]);
  console.warn(`Radio ${name}`, { props });
  return (
    <button
      ref={formRadioRef}
      id={props.idElement}
      name={name}
      type="button"
      value={value}
      className={`button ${classes ?? className}`}
      disabled={disabled}
      onClick={(e) => {
        //console.log(props)
        const field = props.name;
        props.formikHook.setFieldValue(field, value);
        props.formikHook.setSubmitting(true);
        handleClick();
      }}
      {...field}
      {...props}
    >
      {imageIcon}
      <p>{labelOfRadio}</p>
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
  typeBtn: 'country',
};
export default RadioButton;
