import React, { useContext, useRef } from 'react';
import * as Yup from 'yup';
import { AppContext } from '../Provider/StateProvider';
import ButtonField from '../RadioButton/ButtonField';
import { FormStep } from './MultiStep';

function SelectCountryStep() {
  const { options, setOptions, userInfo, setUserInfo } = useContext(AppContext);
  const { countryOptions } = options

  return (
    <FormStep
      stepNumber={1}
      stepName='Seleccione un país'
    >
      <div id="pais-grid" className="grid-country">
        {countryOptions.map(({ ...props }) => (
          <ButtonField
            {...props}
            className={`grid-country-item button`}
            showText={true}
            id={props.idElement}
            name="country"
            key={props.idElement}
            onClick={()=>{
             // console.log(userInfo)
              const { sideItemOptions } = options
              const { stepOne } = userInfo

              sideItemOptions[0].value = props.value
              stepOne.isoRef = props.idElement
              stepOne.value = props.value
              
              setOptions({
                ...options,
                sideItemOptions:[
                  ...sideItemOptions
                ]
              })

              setUserInfo({
                ...userInfo
              })
            }}
          />
        ))}
      </div>
      {/* <pre>{JSON.stringify(options.sideItemOptions, null, 2)}</pre> */}
    </FormStep>
  );
}

export default SelectCountryStep;
