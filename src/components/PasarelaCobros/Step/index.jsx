/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import './Step.scss';
import Button from '../Button';

function Step({ children, idStepElement, currentStep, stepTitle }) {
  return (
    <div id={idStepElement} className="pasarela-1 column seleccion-pais">
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
        <Button className="flex-grow-1" label="Siguiente" fullwidth />
      </div>
    </div>
  );
}

Step.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  idStepElement: PropTypes.string.isRequired,
  stepTitle: PropTypes.string.isRequired,
  currentStep: PropTypes.number.isRequired
};

export default Step;
