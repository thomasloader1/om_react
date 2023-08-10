import React from 'react'
import { FormStep } from './MultiStep'
import InputField from '../InputField'

const DataCardCTC = () => {
    return (
        <FormStep stepNumber={5} stepName='Datos de la tarjeta'>
            <div id='payment_ctc'>
                <InputField
                    type='text'
                    id='n_ro_de_tarjeta'
                    name='n_ro_de_tarjeta'
                    label='Numero de tarjeta'
                    placeholder='Ingresar el numero de la tarjeta'

                />
                <InputField
                    type='text'
                    id='card_v'
                    name='card_v'
                    label='Fecha de vencimiento'
                    placeholder='Ingresar fecha de vencimiento '
                />

                <InputField
                    type='text'
                    id='rfc'
                    name='rfc'
                    label='RFC'
                    placeholder='Ingresar RFC'
                />

                <InputField
                    type='address'
                    id='address'
                    name='address'
                    label='Dirección de facturación'
                    placeholder='Dirección completa'

                />

                <InputField
                    type='text'
                    id='zip'
                    name='zip'
                    label='Codigo postal'
                    placeholder='Codigo postal'
                />
            </div>
        </FormStep>
    )
}

export default DataCardCTC