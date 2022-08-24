import React, { useEffect, useState } from 'react';
import '../../../scss/pasarela-de-cobros.scss';
import {
  countryOptions,
  paymentOptions,
  paymentMethodOptions,
  paymentModeOptions,
  clientForm
} from '../../../config/config';
import Header from '../Header';
import Stepper from '../Stepper';

function PasarelaApp() {
  const [config, setConfig] = useState();
  const [flow] = useState();
  useEffect(() => {
    setConfig({
      countryOptions,
      paymentOptions,
      paymentMethodOptions,
      paymentModeOptions,
      clientForm
    });
  }, [flow]);

  console.log(config);

  return (
    <>
      <Header />
      <Stepper />
    </>
  );
}

export default PasarelaApp;
