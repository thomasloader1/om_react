/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import React, { useContext } from 'react'
import { Form } from 'react-bulma-components';
import { sideItemOptions } from '../../../config/config';
import { AppContext } from '../Provider/StateProvider';
import StepControl from '../StepControl';

function CheckoutForm() {

    const stripe = useStripe();
    const elements = useElements();
    // const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)
      });
      // setLoading(true);
  
      if(!error){
        // console.log(paymentMethod)
        const {id} = paymentMethod
        
        try {
          // eslint-disable-next-line no-shadow
          const { data } = await axios.post('http://localhost:3001/api/checkout',{
            id,
            amount: 1000
          });
  
          console.log(data);
  
        // eslint-disable-next-line no-shadow
        } catch (error) {
          console.log(error);
        }
        // setLoading(false);
  
        elements.getElement(CardElement).clear();
      }
    };
  
    
    return (
      <form onSubmit={handleSubmit} className="card card-body">
  
        {/* <img src="https://http2.mlstatic.com/D_NQ_NP_721030-MLA49653195444_042022-O.webp" 
        alt="k68 keyboard"
        className='img-fluid'/> */}
  
        {/* <h3 className='text-center my-2'>Price: 1000$</h3> */}
  
        <div className='form-group' styles='width: 100px;'>
          <CardElement className='form-control'/>
        </div>
  
        <button type='submit' className='btn btn-success' disabled={!stripe}>
          Buy
        </button> 
      </form>
    );
  };
  
export function FormCardPayStep({ currentStep, setCurrentStep }) {
  
    const stripePromise = loadStripe('pk_test_51LxuPAL8LzLismpRJ8x17MLBqh02YNICHMvzD91jEXEXkFQAPtDy3zE0BVM9xuRvlItl9ZWX2WH3fk5PTdzJ8TNL00n3Y1WfyW');
  
    const [state] = useContext(AppContext);
  
    // const [currentStepObject] = state.sideItemOptions.filter(options => options.status === 'current');
  
    // const formik = useFormik({
    //   initialValues: {
    //     numeroTarjeta: ''
    //   },
    //   validationSchema: Yup.object({
    //     numeroTarjeta: Yup.number().typeError('Numero de tarjeta debe ser un numero').positive('No se permite valores negativos').min(16, 'Ingrese un numero valido').required('Campo requerido'),
    //   }),
    //   onSubmit: (values) => {
    //     console.log(values);
    //     state.sideItemOptions[3].value = JSON.stringify({ ...values })
    //     state.userFlow[3].value = JSON.stringify({ ...values })
    //     delegateManager(currentStepObject, values, state)
    //   },
    //   onChange: (values) => {
    //     delegateManager(currentStepObject, values, state)
    //     console.log({ state, formik })
    //   }
    // });
  
    return (
      <Form
        autoComplete='off'
        style={{ width: '80%', margin: '0 auto' }}
        className='grid-client_form'
        // onSubmit={formik.handleSubmit}
      >
  
        <Elements stripe={stripePromise}>
              <div className='container p-6'>
                <div className="row">
                  <div className="col-md-12
                  offset-md-12">
                  
                    <CheckoutForm />
  
                  </div>
                </div>
              </div>
            </Elements> 
  {/* 
            {state.cardForm.map((input) => (
              <FB.Field key={input.idElement} style={{ marginBottom: '0.7rem' }}>
                <FB.Label>{input.label}</FB.Label>
                <FB.Control>
                  <FB.Input
                    placeholder={input.placeholder}
                    className={formik.errors[input.idElement] && 'is-danger'}
                    type='text'
                    value={formik.values[input.idElement]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name={input.idElement}
                    id={input.idElement}
                  />
                  
                </FB.Control>
              </FB.Field>
            ))}  */}
  
        <StepControl
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          state={state}
          sideItemOptions={sideItemOptions}
          validStep="true"
          // validStep={formik.isValid}
  
        />
      </Form>
    );
  }