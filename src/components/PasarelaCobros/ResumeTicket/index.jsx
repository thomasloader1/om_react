/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

function ResumeTicket({ data }) {
  return (
    <div id="finalResume" className="column ">
      <div className="columns is-multiline datos-cliente">
        <div className="column datos-cliente-header">
          <div id="emailCliente_resume" className="finalResume-item">
            <label>
              CORREO ELECTRÓNICO
            </label>
            <h4>
              {data.response.data[0].Owner.email !== null
                ? data.response.data[0].Owner.email
                : '****'}
            </h4>
          </div>
          <div id="todayDate_resume" className="finalResume-item">
            <h4>****</h4>
          </div>
        </div>
        <div
          id="numeroContrato_resume"
          className="column is-three-fifths finalResume-item"
        >
          <label>
            Número de contrato
          </label>
          <h4>
            {data.response.data[0].Owner.id !== null
              ? data.response.data[0].Owner.id
              : '****'}
          </h4>
        </div>
        <div id="montoTotalContrato_resume" className="column finalResume-item">
          <label>
            MONTO TOTAL DEL CONTRATO
          </label>
          <h4>
            {data.response.data[0].Sub_Total !== null
              ? data.response.data[0].Sub_Total
              : '****'}
          </h4>
        </div>
        <div className="column is-full is-divider-dashed">-</div>
        <div
          id="mesesTotales_resume"
          className="column is-one-third finalResume-item"
        >
          <label>
            MESES TOTALES
          </label>
          <h4>
            {data.response.data[0].Cuotas_totales !== null
              ? data.response.data[0].Cuotas_totales
              : '****'}
          </h4>
        </div>
        <div
          id="montoTotalMes_resume"
          className="column is-one-third finalResume-item"
        >
          <label>
            monto a pagar POR MES
          </label>
          <h4>
            {data.response.data[0].Valor_Cuota !== null
              ? data.response.data[0].Valor_Cuota
              : '****'}
          </h4>
        </div>
      </div>
      <div className="is-divider">-</div>
      <div className="columns is-multiline datos-tarjeta">
        <h2 className="column is-full title is-size-4">Datos de la tarjeta</h2>
        <div
          id="tipoTarjeta_resume"
          className="column is-one-third finalResume-item"
        >
          <label>
            Tipo de tarjeta
          </label>
          <h4>
            {data.response.data[0].Medio_de_Pagod !== null
              ? data.response.data[0].Medio_de_Pago
              : '****'}
          </h4>
        </div>
        <div
          id="numeroTarjeta_resume"
          className="column is-two-thirds finalResume-item"
        >
          <label>
            número de tarjeta
          </label>
          <h4>****</h4>
        </div>
        <div
          id="fechaVencimiento_resume"
          className="column is-one-third finalResume-item"
        >
          <label>
            Fecha de vencimiento
          </label>
          <h4>****</h4>
        </div>
        <div id="cvv_resume" className="column is-1 finalResume-item">
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
            {data.response.data[0].CUIT_CUIL !== null
              ? data.response.data[0].CUIT_CUIL
              : '****'}
          </h4>
        </div>
        <div
          id="tipoNumDocumento_resume"
          className="column is-one-third finalResume-item"
        >
          <label>
            Tipo Y NÚMERO DE DOC
          </label>
          <h4>
            ****
            {/* {(data.response.data[0].CUIT_CUIL !== null)? data.response.data[0].CUIT_CUIL:'No tiene CUIL/CUIT'} */}
          </h4>
        </div>
        <div
          id="cuilCuit_resume"
          className="column is-one-third finalResume-item"
        >
          <label>
            CUIL/CUIT
          </label>
          <h4>
            {data.response.data[0].CUIT_CUIL !== null
              ? data.response.data[0].CUIT_CUIL
              : '****'}
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
            {data.response.data[0].Razon_Social !== null
              ? 'Tiene razon social'
              : '****'}
          </h4>
        </div>
      </div>
    </div>
  );
}

export default ResumeTicket;
