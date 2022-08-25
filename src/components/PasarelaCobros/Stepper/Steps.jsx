/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/prefer-default-export */
import React, { useContext } from 'react'
import { AppContext } from '../Provider/StateProvider'
import RadioButton from '../RadioButton';

export function SelectCountryStep() {
    const [state] = useContext(AppContext);
  return (
    <div id="pais-grid" className="gridCuartos">
      {state.countryOptions.map(({ idElement,...props }) => (
        <RadioButton {...props} name="country" key={idElement}/>
      ))}
    </div>
  )
}