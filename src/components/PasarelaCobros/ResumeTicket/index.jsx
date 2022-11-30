/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import moment from 'moment';
import { Block, Notification, Columns } from 'react-bulma-components';
import { useContext } from 'react';
import { AppContext } from '../Provider/StateProvider';
import { useContractZoho } from '../Hooks/useContractZoho';
import Spinner from '../Spinner';
import ButtonField from '../RadioButton/ButtonField';

function ResumeTicket({ contractId }) {
  const {
    formikValues,
    setFormikValues,
    options,
    setOptions,
    userInfo,
    setUserInfo
  } = useContext(AppContext);
  const { loading, data, error } = useContractZoho(contractId);

  if (typeof data === 'string') {
    return (
      <Block>
        <Notification color="danger">
          No se encontro ningun Contrato correspondiente al ID:{' '}
          <strong>{formikValues.contractId}</strong>, vuelva atras y verifique
          denuevo el numero
        </Notification>
      </Block>
    );
  }

  const { sale, contact } = data;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div id="finalResume" className="column">
          <div className="columns is-multiline datos-cliente">
            <h2 className="column is-full title is-size-4">
              Datos del contrato
            </h2>
            <div className="column datos-cliente-header">
              <div id="emailCliente_resume" className="finalResume-item">
                <label>CORREO ELECTRÓNICO</label>
                <h4>{contact.Email}</h4>
              </div>
              <div id="todayDate_resume" className="finalResume-item">
                {/*<label>FECHA DE CONTRATO</label>*/}
                <h4>{moment(sale.Fecha_Creaci_n).format('lll')}</h4>
              </div>
            </div>
            <div
              id="numeroContrato_resume"
              className="column is-two-thirds finalResume-item"
            >
              <label>Número de contrato</label>
              <h4>{sale.SO_Number}</h4>
            </div>
            <div
              id="montoTotalContrato_resume"
              className="column finalResume-item"
            >
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
              className="column is-one-third finalResume-item"
            >
              <label>Estado del contrato</label>
              <h4>{sale.Status}</h4>
            </div>
          </div>
          <div className="is-divider"></div>
          <div className="columns is-multiline datos-tarjeta">
            <h2 className="column is-full title is-size-4">
              Datos del contacto
            </h2>
            <div
              id="tipoTarjeta_resume"
              className="column is-two-thirds finalResume-item"
            >
              <label>Nombre completo</label>
              <h4>{contact.Full_Name}</h4>
            </div>
            <div
              id="numeroTarjeta_resume"
              className="column is-one-third finalResume-item"
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

            <div
              id="tipoNumDocumento_resume"
              className="column is-one-third finalResume-item"
            >
              <label>Tipo Y NÚMERO DE DOC</label>
              <h4>DNI: {contact.DNI}</h4>
            </div>
          </div>
          <Columns className="finalResume-confirmation">
            <Columns.Column>
              <ButtonField
                className={`button`}
                showText={true}
                id="checkContract"
                name="checkContract"
                value="Todo liso"
                onClick={() => {
                  // console.log(userInfo)
                  const { sideItemOptions } = options;
                  const { stepFour } = userInfo;

                  sideItemOptions[3].value = 'Todo liso';
                  stepFour.value = 'Todo liso';

                  setOptions({
                    ...options,
                    sideItemOptions: [...sideItemOptions]
                  });

                  setUserInfo({
                    ...userInfo
                  });

                  setFormikValues({
                    ...formikValues,
                    amount: sale.Grand_Total
                  });
                }}
              />
            </Columns.Column>

            <Columns.Column>
              <ButtonField
                className={`button`}
                showText={true}
                id="checkContract"
                name="checkContract"
                value="Todo mal"
                onClick={() => {
                  // console.log(userInfo)
                  const { sideItemOptions } = options;
                  const { stepFour } = userInfo;

                  sideItemOptions[3].value = 'Todo mal';
                  stepFour.value = 'Todo mal';

                  setOptions({
                    ...options,
                    sideItemOptions: [...sideItemOptions]
                  });

                  setUserInfo({
                    ...userInfo
                  });
                }}
              />
            </Columns.Column>
          </Columns>
        </div>
      )}
    </>
  );
}

export default ResumeTicket;
