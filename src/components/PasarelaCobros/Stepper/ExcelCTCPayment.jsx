import React, { useContext } from 'react'
import { FormStep } from './MultiStep'
import { downloadResource } from '../../../logic/ctc'
import { AppContext } from '../Provider/StateProvider'

const ExcelCTCPayment = () => {

    const { downloadLinkCTCPayment } = useContext(AppContext)
    console.log({ downloadLinkCTCPayment })

    return (
        <FormStep stepNumber={6} stepName='CTC'>
            <div id='payment_ctc_download-payment' className='field'>
                <label className="label">DESCARGAR EXCEL PARA SUBIR A CTC</label>
                <button className='is-primary button' onClick={() => downloadResource(downloadLinkCTCPayment)}> Descargar </button>
            </div>
        </FormStep>
    )
}

export default ExcelCTCPayment