import React, { useContext } from 'react';
import { AppContext } from '../Provider/StateProvider';
import ButtonField from '../RadioButton/ButtonField';
import { FormStep } from './MultiStep';

function SelectCountryStep() {
  const { options, setOptions, userInfo, setUserInfo } = useContext(AppContext);
  const { countryOptions } = options;
  const { stepOne } = userInfo;

  return (
    <FormStep stepNumber={1} stepName='Selecciona un país'>
      <div id='pais-grid' className='grid-country'>
        {countryOptions.map(({ active, ...props }) => (
          <ButtonField
            {...props}
            className={`grid-country-item button ${props.value === stepOne.value && 'active'}`}
            showText={true}
            id={props.idElement}
            name='country'
            key={props.idElement}
            disabled={!active}
            onClick={() => {
              const { sideItemOptions } = options;
              const { stepOne } = userInfo;

              sideItemOptions[0].value = props.value;
              stepOne.isoRef = props.idElement;
              stepOne.value = props.value;

              setOptions({
                ...options,
                sideItemOptions: [...sideItemOptions],
              });

              setUserInfo({
                ...userInfo,
              });
            }}
          />
        ))}
      </div>
      {/* <pre>{JSON.stringify(options.sideItemOptions, null, 2)}</pre> */}
    </FormStep>
  );
}

export default SelectCountryStep;
