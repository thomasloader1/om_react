import React, { useContext } from 'react'
import { FormStep } from './MultiStep'
import InputField from '../InputField'
import { AppContext } from '../Provider/StateProvider'
import { useFormikContext } from 'formik'

const FolioCTCPlanPayment = () => {
    const formik = useFormikContext();
    const { setFormikValues } = useContext(AppContext)

    return (
        <FormStep stepNumber={9} stepName='Folio Plan de Pago'>
            <div id='payment_ctc'>
                <InputField
                    type='text'
                    id='folio_suscripcion'
                    name='folio_suscripcion'
                    label='Numero de folio'
                    placeholder='Ingresar el numero del folio'
                    onChange={(e) => {

                        setFormikValues(prevState => ({
                            ...prevState,
                            folio_suscripcion: e.target.value
                        }))

                        formik.setFieldValue('folio_suscripcion', e.target.value)

                    }}
                />

            </div>
        </FormStep>
    )
}

export default FolioCTCPlanPayment