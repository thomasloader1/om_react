import React, { useState } from 'react'
import IMAGES from '../../../img/pasarelaCobros/share';
import { useParams } from 'react-router';
import MotionSpinner from '../Spinner/MotionSpinner';
import mpImg from '../../../img/pasarelaCobros/metPago/mp.svg'
import stripeImg from '../../../img/pasarelaCobros/metPago/stripe.svg'

import { usePaymentRebill } from '../Hooks/usePaymentRebill';
import { Box, Columns, Container, Content, Hero, Image, Navbar } from 'react-bulma-components';

const { logo } = IMAGES

const Status = () => {


    const { payment_id } = useParams();

    const payment = "60d33e10-1c17-4310-8189-5fc8553b8692"
    //const { loading, data: contractData } = useContractZoho(so, needRunEffect);
    const { loading, data } = usePaymentRebill(payment_id)
    const currencyOptions = {
        style: 'currency',
        currency: 'MXN',
    };
    console.log({ data })

    //console.log(checkoutPayment)

    const handleText = (status) => {
        const statusFront = {
            PENDING: 'Pendiente',
            FAILED: 'Pago Rechazado',
            SUCCEEDED: 'Pago Aprobado'
        }

        return statusFront[status]
    }

    const getCardColor = (status) => {
        // Función para obtener el color de fondo de la card según el estado del pago
        // Puedes personalizarla según tus necesidades
        switch (status) {
            case 'PENDING':
                return 'is-secondary';
            case 'FAILED':
                return 'is-danger';
            case 'SUCCEEDED':
                return 'is-success';
            default:
                return '';
        }
    };

    const cardColor = getCardColor(data?.status);

    return (
        <>
            {loading ? <MotionSpinner /> : <main class="grid-status container">
                <header class="is-max-widescreen py-5">
                    <nav class="navbar is-justify-content-space-between" role="navigation" aria-label="main navigation">
                        <div class="navbar-brand">
                            <a class="navbar-item">
                                <img src={logo} alt="MSK Logo" width="130" height="80" />
                            </a>
                        </div>
                        <div class="nav-item">

                        </div>
                    </nav>
                </header>
                <section class="container">
                    <div class="columns">
                        <div class="column has-text-centered">
                            <div class={`notification ${cardColor} my-4 box`}>
                                <h1 class="title is-1 has-text-weight-bold">{handleText(data.status)}</h1>
                            </div>

                            <div class="mx-auto p-4 is-fullheight">
                                <div class="mt-5">
                                    {data.status === 'PENDING' && (<p>Su pago aun esta siendo procesado, vuelva actualizar la pantalla</p>)}
                                    {data.status === 'FAILED' && (<p>El pago fue rechazado, porfavor intente pagar nuevamente</p>)}
                                    {data.status === 'SUCCEEDED' && (<p>¡El pago fue acreditado correctamente!</p>)}
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </main>
            }
        </>

    )
}

export default Status