/* eslint-disable react/default-props-match-prop-types */
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../Provider/StateProvider';
import { sideItemOptions } from '../../../config/config';
import SideItem from '../SideItem';
import Side from '../Side';

function Step({
  children,
  currentStep,
  stepTitle
}) {
  const [state, setState] = useContext(AppContext);
  const childrenArray = React.Children.toArray(children);
  const currentChildren = childrenArray[currentStep - 1];

  useEffect(() => {
    setState({ ...state, sideItemOptions: [...sideItemOptions] });
  }, [currentStep]);

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
        {currentChildren}
        <pre>{JSON.stringify(state.sideItemOptions, null, 2)}</pre>
        <pre>{JSON.stringify(state.userFlow, null, 2)}</pre>
      </div>

      <Side>
        {state.sideItemOptions.map(
          ({ step: stepNumber, label, status, value }) => (
            <SideItem
              key={stepNumber}
              currentStep={stepNumber}
              label={label}
              status={status}
              valueSelected={value}
            />
          )
        )}
      </Side>
    </div>
  );
}

Step.propTypes = {
  children: PropTypes.node.isRequired,
  currentStep: PropTypes.number.isRequired,
  stepTitle: PropTypes.string.isRequired
};

Step.defaultProps = {
  formikHook: ''
};

export default Step;
