import React from 'react'
import { FormStep } from './MultiStep'
import InputField from '../InputField'

const FolioCTCPayment = () => {
    return (
        <FormStep stepNumber={6} stepName='Folio Pago'>
            <div id='payment_ctc'>
                <InputField
                    type='text'
                    id='folio_pago'
                    name='folio_pago'
                    label='Numero de folio'
                    placeholder='Ingresar el numero del folio'

                />

            </div>
        </FormStep>
    )
}

export default FolioCTCPayment