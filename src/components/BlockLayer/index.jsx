import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AppContext } from '../PasarelaCobros/Provider/StateProvider'
import { MdContentCopy } from 'react-icons/md'

const { NODE_ENV, REACT_APP_URL_PRD, REACT_APP_URL_LOCAL } = process.env

const URL = NODE_ENV === 'production' ? REACT_APP_URL_PRD : REACT_APP_URL_LOCAL

const BlockLayer = () => {
    const { openBlockLayer, rebillFetching } = useContext(AppContext)
    const [cardTitle, setCardTitle] = useState('');
    const { loading, ...rest } = rebillFetching

    useEffect(() => {
        const title = rebillFetching.type === 'paymentLink' ? 'Link Generado' : 'Pago Realizado';
        setCardTitle(title)
    }, [rebillFetching.type])

    const handleCopyLink = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
            })
            .catch((error) => {
                //console.log('Error al copiar al portapapeles:', error);
            });
    };


    //console.log({ openBlockLayer, rebillFetching })
    return (
        <>
            {openBlockLayer && (
                <>
                    <motion.div
                        style={{
                            width: '3000px',
                            height: '100%',
                            minHeight: '100vh',
                            position: 'absolute',
                            top: '0',
                            right: '0',
                            zIndex: '1',
                            backgroundColor: 'white',
                        }}
                        animate={{ backgroundColor: 'rgba(63, 108, 187, 0.8)' }}
                        transition={{ ease: 'easeOut', duration: 0.5 }}
                    ></motion.div>

                    {!loading && (
                        <motion.div
                            className='modal-generated-link'
                            animate={{ backgroundColor: '#f4f5f7', boxShadow: '5px 5px 2rem rgba(0,0,0, 0.3)' }}
                            transition={{ ease: 'easeOut', duration: 0.5 }}
                        >
                            <motion.h2 className='title is-2 has-text-success my-5'>
                                {cardTitle}
                            </motion.h2>
                            {rebillFetching.type === "paymentLink" ? (<div className='is-flex is-fullwidth'>
                                <button
                                    className='button is-primary has-text-weight-bold'
                                    onClick={() => handleCopyLink(`${URL}/#/checkout/${rest.payment.contract_entity_id}`)}
                                >
                                    Copiar Link <MdContentCopy className='ml-2' />
                                </button>
                                <a
                                    href='https://crm.zoho.com/crm/org631172874/tab/SalesOrders'
                                    className='button is-primary is-outlined has-text-weight-bold'
                                >
                                    Generar nuevo pago
                                </a>
                            </div>) : (<a
                                href='https://crm.zoho.com/crm/org631172874/tab/SalesOrders'
                                className='button is-success'
                            >
                                Cobrar otro contrato
                            </a>)}

                        </motion.div>
                    )}
                </>
            )}</>
    )
}

export default BlockLayer