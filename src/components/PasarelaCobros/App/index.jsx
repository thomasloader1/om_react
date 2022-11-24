import React, { useContext, useState } from 'react';
import '../../../scss/pasarela-de-cobros.scss';
import Header from '../Header';
import Stepper from '../Stepper';
import * as Yup from 'yup'
import MultiStep from '../Stepper/MultiStep';
import Side from '../Side';
import { AppContext } from '../Provider/StateProvider';
import SelectCountryStep from '../Stepper/SelectCountryStep';
import SelectPaymentMethodStep from '../Stepper/SelectPaymentMethodStep';
import SelectPaymentModeStep from '../Stepper/SelectPaymentModeStep';
import FormClientDataStep from '../Stepper/FormClientDataStep';
import GeneratePaymentLinkStep from '../Stepper/GeneratePaymentLinkStep';
import axios from 'axios';
import { useEffect } from 'react';

function PasarelaApp() {
  const { options, formikValues, setFormikValues } = useContext(AppContext);
  const [stepNumber, setStepNumber] = useState(0)


  useEffect(()=>{
    setStepNumber(stepNumber)
    
    return () => null
  }, [stepNumber])

  return (
    <>
      <Header />
      {/* <Stepper />  */}
      <section className="container is-max-widescreen">
        <div className="pasarela columns mx-auto">
          <MultiStep
            stepStateNumber={{stepNumber, setStepNumber}}
            className="pasarela-1 column seleccion-pais"
            initialValues={{
              country: '',
              contractId: '',
              mod: ''
            }}
            onSubmit={(values) => {
              alert(JSON.stringify(values, null, 2))
              axios.post("https://www.oceanomedicina.com.ar/suscripciontest/remote/generateCheckoutPro")
            }}
          >
            <SelectCountryStep
              onSubmit={(values) => { 
                setFormikValues({
                  ...formikValues,
                  ...values
                })

                console.log('Step 1 submit',{values, formikValues}) 
              }}
              validationSchema={Yup.object({
                country: Yup.string().required('El pais es requerido')
              })} />
            <SelectPaymentMethodStep
              onSubmit={(values) => { 
                setFormikValues({
                  ...formikValues,
                  ...values
                })

                console.log('Step 2 submit',{values, formikValues}) 
               }}
              validationSchema={Yup.object({
                payment_method: Yup.string().required('El metodo de pago es requerido')
              })}
            />
            <SelectPaymentModeStep
              onSubmit={(values) => { 
                setFormikValues({
                  ...formikValues,
                  ...values
                })

                console.log('Step 3 submit',{values, formikValues}) 
               }}
              validationSchema={Yup.object({
                contractId: Yup.string().required('El campo es requerido'),
                mod: Yup.string().required('El modo de pago es requerido')
              })}
            />
            <FormClientDataStep
              onSubmit={(values) => { 
                setFormikValues({
                  ...formikValues,
                  ...values
                })

                console.log('Step 4 submit',{values, formikValues}) 
               }}
              validationSchema={Yup.object({
                checkContract: Yup.string().required('El campo es requerido')
              })}
            />

          <GeneratePaymentLinkStep />

          </MultiStep>
          <Side options={options.sideItemOptions} stepStateNumber={{stepNumber, setStepNumber}} />
        </div>
      </section>
    </>
  );
}

export default PasarelaApp;
