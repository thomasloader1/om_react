import React, { useContext } from 'react'
import { FormStep } from './MultiStep'
import { downloadResource } from '../../../logic/ctc'
import { AppContext } from '../Provider/StateProvider'

const PlanCTCPayment = () => {
    const { downloadLinkCTCPayment } = useContext(AppContext)
    return (
        <FormStep stepNumber={8} stepName='Plan de Pago'>
            <div id='payment_ctc_download-suscri' className='field'>
                <label className="label">DESCARGAR EXCEL PARA SUBIR A CTC</label>

                <button className='is-primary button' onClick={() => downloadResource(downloadLinkCTCPayment)}> Descargar</button>
            </div>

        </FormStep>
    )
}

export default PlanCTCPayment