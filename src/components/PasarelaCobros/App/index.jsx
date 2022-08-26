import React, {  } from 'react';
import '../../../scss/pasarela-de-cobros.scss';
import Header from '../Header';
import Stepper from '../Stepper';
import {  } from '../Provider/StateProvider';

function PasarelaApp() {
  // const [state] = useContext(AppContext);

  return (
    <>
      <Header />
      <Stepper />
    </>
  );
}

export default PasarelaApp;
