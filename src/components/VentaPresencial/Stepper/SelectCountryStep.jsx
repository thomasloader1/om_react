import { useFormikContext } from 'formik';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import ButtonField from '../../PasarelaCobros/RadioButton/ButtonField';
import { useFormHandler } from '../Hook/useFormHandler';

import { FormStep } from './MultiStep';

function SelectCountryStep() {
  // const { setStepOne } = useFormHandler();
  const { options, setOptions, userInfo, setUserInfo, formikValues, appEnv } =
    useContext(AppContext);
  const { countryOptions, sideItemOptionsVP } = options;
  const { stepOne } = userInfo;
  const { setFieldValue, ...formik } = useFormikContext();

  useEffect(() => {
    if (appEnv !== null && formikValues?.country !== null) {
      //setFieldValue('country', formikValues?.country);
      //console.log({ formik });
    }
  }, [appEnv, formikValues?.country]);

  const handleClick = (propsOfContryOptions) => {
    const { value, idElement } = propsOfContryOptions;
    sideItemOptionsVP[0].value = value;
    stepOne.isoRef = idElement;
    stepOne.value = value;

    setOptions({
      ...options,
      sideItemOptionsVP: [...sideItemOptionsVP],
    });

    setUserInfo({
      ...userInfo,
    });
  };

  return (
    <FormStep stepNumber={1} stepName="Seleccione un país">
      <div id="pais-grid" className="grid-country">
        {countryOptions.map(({ ...props }) => (
          <ButtonField
            {...props}
            className={`grid-country-item button ${
              props.value === stepOne.value && 'active'
            }`}
            showText={true}
            id={props.idElement}
            name="country"
            key={props.idElement}
            onClick={() => {
              handleClick(props);
            }}
          />
        ))}
      </div>
    </FormStep>
  );
}

export default SelectCountryStep;
