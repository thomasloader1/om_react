/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import moment from 'moment'

function ResumeTicket({ data }) {
  const { sale, contact } = data;
  return (
    <div id="finalResume" className="column ">
      <div className="columns is-multiline datos-cliente">
      <h2 className="column is-full title is-size-4">Datos del contrato</h2>
        <div className="column datos-cliente-header">
          <div id="emailCliente_resume" className="finalResume-item">
            <label>CORREO ELECTRÓNICO</label>
            <h4>{contact.Email}</h4>
          </div>
          <div id="todayDate_resume" className="finalResume-item">
          <label>FECHA DE CONTRATO</label>
            <h4>{moment(sale.Fecha_Creaci_n).format('LLL')}</h4>
          </div>
        </div>
        <div
          id="numeroContrato_resume"
          className="column is-three-fifths finalResume-item"
        >
          <label>Número de contrato</label>
          <h4>{sale.SO_Number}</h4>
        </div>
        <div id="montoTotalContrato_resume" className="column finalResume-item">
          <label>MONTO TOTAL DEL CONTRATO</label>
          <h4>{sale.Grand_Total}</h4>
        </div>
        <div
          id="mesesTotales_resume"
          className="column is-one-third finalResume-item"
        >
          <label>MESES TOTALES</label>
          <h4>{sale.Cantidad}</h4>
        </div>
        <div
          id="montoTotalMes_resume"
          className="column is-one-third finalResume-item"
        >
          <label>monto a pagar POR MES</label>
          <h4>{sale.Valor_Cuota}</h4>
        </div>
        <div
          id="montoTotalMes_resume"
          className="column is-three-fifths finalResume-item"
        >
          <label>Estado del contrato</label>
          <h4>{sale.Status}</h4>
        </div>
      </div>
      <div className="is-divider">-</div>
      <div className="columns is-multiline datos-tarjeta">
        <h2 className="column is-full title is-size-4">Datos del contacto</h2>
        <div
          id="tipoTarjeta_resume"
          className="column is-one-third finalResume-item"
        >
          <label>Nombre completo</label>
          <h4>{contact.Full_Name}</h4>
        </div>
        <div
          id="numeroTarjeta_resume"
          className="column is-two-thirds finalResume-item"
        >
          <label>Pais</label>
          <h4>{contact.Pais}</h4>
        </div>
        <div
          id="fechaVencimiento_resume"
          className="column is-one-third finalResume-item"
        >
          <label>Telefono</label>
          <h4>{contact.Home_Phone}</h4>
        </div>
        {/* <div id="cvv_resume" className="column is-1 finalResume-item">
          <label>
            CVV
          </label>
          <h4>****</h4>
        </div>
        <div id="cuotas_resume" className="column is-2 finalResume-item">
          <label>
            Cuotas
          </label>
          <h4>****</h4>
        </div> 
        <div
          id="nombreTitular_resume"
          className="column is-half finalResume-item"
        >
          <label>
            NOMBRE DEL TITULAR
          </label>
          <h4>****</h4>
        </div>
        <div
          id="direccionTitular_resume"
          className="column is-half finalResume-item"
        >
          <label>
            Dirección
          </label>
          <h4>
            asd
          </h4>
        </div>*/}
        <div
          id="tipoNumDocumento_resume"
          className="column is-one-third finalResume-item"
        >
          <label>Tipo Y NÚMERO DE DOC</label>
          <h4>DNI: {contact.DNI}</h4>
        </div>
        {/* <div
          id="cuilCuit_resume"
          className="column is-one-third finalResume-item"
        >
          <label>
            CUIL/CUIT
          </label>
          <h4>
            asd
          </h4>
        </div>
        <div
          id="razonSocial_resume"
          className="column is-one-third finalResume-item"
        >
          <label>
            Razón Social
          </label>
          <h4>
            asd
          </h4>
        </div> */}
      </div>
    </div>
  );
}

export default ResumeTicket;
