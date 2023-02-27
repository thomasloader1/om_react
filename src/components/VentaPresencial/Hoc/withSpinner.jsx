import React from 'react';
import MotionSpinner from '../../PasarelaCobros/Spinner/MotionSpinner';

const withSpinner = (ComponentToLoad) => {
  return function WithSpinnerComponent(props) {
    if (props.loading) {
      // <--- Agregamos props.loading en la condición
      return <MotionSpinner text={props.loadingText} viewHeight="50vh" />;
    }

    return <ComponentToLoad {...props} />;
  };
};

export default withSpinner;
