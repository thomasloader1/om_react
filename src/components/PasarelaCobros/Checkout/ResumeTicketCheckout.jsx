/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import moment from 'moment';
import { Block, Notification, Modal, Media, Content } from 'react-bulma-components';
import { useParams } from 'react-router';

function ResumeTicketCheckout({ data }) {
  //console.log({ data })
  const { ZohoData, paymentLinkData } = data;
  const { contact, sale } = ZohoData;
  const { customer, checkout } = paymentLinkData;

  const { id } = useParams();

  const [openModal, setOpenModal] = useState(null);

  if (typeof data === 'string') {
    return (
      <Block>
        <Notification color='danger'>
          No se encontro ningun Contrato correspondiente al ID: <strong>{id}</strong>, vuelva atras
          y verifique denuevo el numero
        </Notification>
      </Block>
    );
  }

  const currencyOptions = {
    style: 'currency',
    currency: 'MXN',
  };

  const isAdvanceSuscription = checkout.type.includes('Suscripción con anticipo');
  const isTraditional = checkout.type.includes('Tradicional');

  const totalMonths = isTraditional ? 1 : Number(checkout.quotes);
  const payPerMonth = isTraditional
    ? sale?.Grand_Total
    : Math.floor(sale?.Grand_Total / checkout.quotes);

  const formattedAmount = new Intl.NumberFormat('MX', currencyOptions).format(payPerMonth);
  const formattedTotalAmount = new Intl.NumberFormat('MX', currencyOptions).format(
    sale.Grand_Total,
  );

  return (
    <>
      <div id='finalResume' className='column'>
        <div className='columns is-multiline datos-cliente'>
          <h2 className='column is-full title is-size-4'>Datos del contrato</h2>
          <div className='column datos-cliente-header'>
            <div id='emailCliente_resume' className='finalResume-item'>
              <label>CORREO ELECTRÓNICO</label>
              <h4>{contact.Email}</h4>
            </div>
            <div id='todayDate_resume' className='finalResume-item'>
              {/*<label>FECHA DE CONTRATO</label>*/}
              <h4>{moment(sale.Fecha_Creaci_n).format('lll')}</h4>
            </div>
          </div>
          <div id='numeroContrato_resume' className='column is-two-thirds finalResume-item'>
            <label>Número de contrato</label>
            <h4>{sale.SO_Number}</h4>
          </div>

          <div id='montoTotalContrato_resume' className='column finalResume-item'>
            <label>MONTO TOTAL DEL CONTRATO</label>
            <h4>{formattedTotalAmount}</h4>
          </div>
          <div id='mesesTotales_resume' className='column is-one-third finalResume-item'>
            <label>MESES TOTALES</label>
            <h4>{totalMonths}</h4>
          </div>
          <div id='montoTotalMes_resume' className='column is-one-third finalResume-item'>
            <label>
              {isAdvanceSuscription ? 'monto a pagar por anticipo' : 'monto a pagar POR MES'}
            </label>
            <h4>{formattedAmount}</h4>
          </div>
          <div id='montoTotalMes_resume' className='column is-one-third finalResume-item'>
            <label>Estado del contrato</label>
            <h4>{sale?.Status}</h4>
          </div>
        </div>
        <div className='is-divider'></div>
        <div className='columns is-multiline datos-tarjeta'>
          <h2 className='column is-full title is-size-4'>Datos del contacto</h2>
          <div id='tipoTarjeta_resume' className='column is-two-thirds finalResume-item'>
            <label>Nombre completo</label>
            <h4>{contact?.Full_Name}</h4>
          </div>
          <div id='numeroTarjeta_resume' className='column is-one-third finalResume-item'>
            <label>Pais</label>
            <h4>{contact?.Pais}</h4>
          </div>
          <div id='fechaVencimiento_resume' className='column is-one-third finalResume-item'>
            <label>Telefono</label>
            <h4>{contact?.Home_Phone}</h4>
          </div>

          <div id='tipoNumDocumento_resume' className='column is-one-third finalResume-item'>
            <label>Tipo Y NÚMERO DE DOC</label>
            <h4>DNI: {contact?.DNI}</h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResumeTicketCheckout;
