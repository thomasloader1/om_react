import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { AppContext } from '../PasarelaCobros/Provider/StateProvider'

const BlockLayer = () => {
    const { openBlockLayer, rebillFetching } = useContext(AppContext)
    const { loading, ...rest } = rebillFetching
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
                                Pago realizado!
                            </motion.h2>
                            <a
                                href='https://crm.zoho.com/crm/org631172874/tab/SalesOrders'
                                className='button is-success'
                            >
                                Cobrar otro contrato
                            </a>
                        </motion.div>
                    )}
                </>
            )}</>
    )
}

export default BlockLayer