import React, { useContext, useState,useEffect } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import Header from '../../PasarelaCobros/Header';
import MultiStep from '../Stepper/MultiStep';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import SelectCountryStep from '../../PasarelaCobros/Stepper/SelectCountryStep';
const { REACT_APP_OCEANO_URL, REACT_APP_OCEANO_GENERATECHECKOUTPRO, NODE_ENV } =
  process.env;

function VentaPresencialApp() {
  const { formikValues, setFormikValues, checkoutLink, setCheckoutLink } = useContext(AppContext);
  const [stepNumber, setStepNumber] = useState(0);

  useEffect(() => {
    setStepNumber(stepNumber);

    return () => null;
  }, [stepNumber]);

  return (
    <>
      <Header />
      <section className="container is-max-widescreen">
        <div className="pasarela columns mx-auto">

          <MultiStep
            stepStateNumber={{ stepNumber, setStepNumber }}
            className="pasarela-1 column seleccion-pais"
            initialValues={{}}
            onSubmit={async (values) => {
              const body = new FormData();
              const type = formikValues.mod.toLowerCase().substring(0, 4);
              const requestConfig = {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              }

              body.append('months', 0);
              body.append('amount', `${formikValues.amount}`);
              body.append('type', type);
              body.append('so', formikValues.sale.SO_Number);

              const URL =
                NODE_ENV === 'production'
                  ? `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_GENERATECHECKOUTPRO}`
                  : REACT_APP_OCEANO_GENERATECHECKOUTPRO;
              
              const response = await axios.post(URL, body, requestConfig);

              setCheckoutLink(response.data.url);
              console.log({ response });
            }}
          >
                <SelectCountryStep
                  onSubmit={(values) => {
                    setFormikValues((prevFormikValues) => ({
                      ...prevFormikValues,
                      ...values
                    }));
                  }}
                  validationSchema={Yup.object({
                    country: Yup.string().required('El pais es requerido')
                  })}
                />
               
          </MultiStep>
        </div>
      </section>
      {/*   <pre>{JSON.stringify(formikValues, null, 2)}</pre> */}
    </>
  );
}

export default VentaPresencialApp;
