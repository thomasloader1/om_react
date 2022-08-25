import React, { useContext } from 'react';
import '../../../scss/pasarela-de-cobros.scss';
import Header from '../Header';
import Stepper from '../Stepper';
import { AppContext } from '../Provider/StateProvider';

function PasarelaApp() {
  const [state] = useContext(AppContext);
  /* const [flow] = useContext(AppContext); */

  console.log(state);

  return (
    <>
      <Header />
      <Stepper />
    </>
  );
}

export default PasarelaApp;
