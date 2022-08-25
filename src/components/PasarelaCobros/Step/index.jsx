/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// import './Step.scss';
import Button from '../Button';
import SideItem from '../SideItem';
import Side from '../Side';
import { AppContext } from '../Provider/StateProvider';

function Step({ children, currentStep, stepTitle }) {
  const [state] = useContext(AppContext);
  return (
    <div className="pasarela columns mx-auto">
      <div className="pasarela-1 column seleccion-pais">
        {currentStep !== 0 && (
          <h2 className="title is-4">
            <span className="has-text-white has-background-black is-circle">
              {currentStep}
            </span>

            {stepTitle}
          </h2>
        )}
        {children}
        <div id="stepControls" className="stepControls is-flex">
          <Button className="flex-grow-1" label="Volver" fullwidth />
          <Button className="flex-grow-1" label="Siguiente" fullwidth onClick={()=> {console.log({state})}}/>
        </div>
      </div>

      <Side>
        {state.sideItemOptions.map(({ step, label, status, value }) => (
          <SideItem
            key={step}
            currentStep={step}
            label={label}
            status={status}
            valueSelected={value}
          />
        ))}
      </Side>
    </div>
  );
}

Step.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  stepTitle: PropTypes.string.isRequired,
  currentStep: PropTypes.number.isRequired
};

export default Step;
