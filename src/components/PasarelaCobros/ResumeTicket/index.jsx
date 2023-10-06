/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import { Block, Notification, Columns, Modal, Media, Content } from 'react-bulma-components';
import { AppContext } from '../Provider/StateProvider';
import ButtonField from '../RadioButton/ButtonField';
import { useLocation, useParams } from 'react-router';
import { useContractZoho } from '../Hooks/useContractZoho';
import MotionSpinner from '../Spinner/MotionSpinner';

function ResumeTicket({ forPayment }) {
  const {
    formikValues,
    setFormikValues,
    options,
    setOptions,
    userInfo,
    setUserInfo,
    appRef,
    contractData,
    renewSession,
  } = useContext(AppContext);
  const location = useLocation();
  const needRunEffect = location.pathname.includes('vp');
  const { id } = useParams();
  const { loading, data, error } = useContractZoho(id, needRunEffect);
  const [openModal, setOpenModal] = useState(null);

  const { stepFour } = userInfo;
  const [resumeData, setResumeData] = useState({
    totalMonths: '',
    payPerMonth: '',
    formattedAmount: '',
    firstQuoteDiscount: '',
    remainingAmountToPay: '',
    newQuotes: '',
    payPerMonthAdvance: '',
  });

  useEffect(() => {
    const isAdvanceSuscription = formikValues.mod.includes('Suscripción con anticipo');
    const isTraditional = formikValues.mod.includes('Tradicional');

    const totalMonths = isTraditional ? 1 : formikValues.quotes;
    const payPerMonth = isTraditional
      ? sale?.Grand_Total
      : Math.floor(sale?.Grand_Total / formikValues.quotes);

    const formattedAmount = new Intl.NumberFormat('MX', currencyOptions).format(payPerMonth);

    const firstQuoteDiscount = Math.floor(sale?.Grand_Total / formikValues.quotes / 2);
    const remainingAmountToPay = Math.floor(sale?.Grand_Total - firstQuoteDiscount);

    const newQuotes = formikValues.quotes - 1;
    const payPerMonthAdvance = Math.floor(remainingAmountToPay / newQuotes);

    if (formikValues.renewSuscription) {
      console.log({
        renewSession,
      });

      setResumeData({
        totalMonths: formikValues.quotes,
        payPerMonth: renewSession.remaining_installments,
        formattedAmount: new Intl.NumberFormat('MX', currencyOptions).format(
          renewSession.remaining_installments,
        ),
        isAdvanceSuscription,
      });

      return;
    }

    setResumeData({
      totalMonths,
      payPerMonth,
      formattedAmount,
      firstQuoteDiscount,
      remainingAmountToPay,
      newQuotes,
      payPerMonthAdvance,
      isAdvanceSuscription,
    });

    return () => null;
  }, [forPayment]);

  if (typeof data === 'string') {
    return (
      <Block>
        <Notification color='danger'>
          No se encontro ningun Contrato correspondiente al ID:{' '}
          <strong>{formikValues.contractId}</strong>, vuelva atras y verifique denuevo el numero
        </Notification>
      </Block>
    );
  }

  const currencyOptions = {
    style: 'currency',
    currency: 'MXN',
  };

  const { sale, contact, products } = contractData;

  return (
    <>
      {loading ? (
        <MotionSpinner text='Recuperando contrato' />
      ) : (
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
              <h4>{sale.Grand_Total}</h4>
            </div>
            {forPayment.includes('PlaceToPay') && (
              <div id='mesesTotales_resume' className='column is-one-third finalResume-item'>
                <label>COBRADOS MESES TOTALES</label>
                <h4>{renewSession.installments_paid}</h4>
              </div>
            )}
            <div id='mesesTotales_resume' className='column is-one-third finalResume-item'>
              <label>MESES TOTALES</label>
              <h4>{resumeData.totalMonths}</h4>
            </div>

            {resumeData.isAdvanceSuscription && (
              <div id='montoAnticipo_resume' className='column is-one-third finalResume-item'>
                <label>
                  {resumeData.isAdvanceSuscription
                    ? 'Monto a pagar de anticipo'
                    : 'monto a pagar POR MES'}
                </label>
                <h4>{resumeData.firstQuoteDiscount}</h4>
              </div>
            )}

            <div id='montoCuotaMes_resume' className='column is-one-third finalResume-item'>
              <label>Monto a pagar por mes</label>
              <h4>
                {resumeData.isAdvanceSuscription
                  ? resumeData.payPerMonthAdvance
                  : resumeData.payPerMonth}
              </h4>
            </div>

            <div id='monto_resume' className='column is-one-third finalResume-item'>
              <label>Estado del contrato</label>
              <h4>{sale.Status}</h4>
            </div>
          </div>
          <div className='is-divider'></div>
          <div className='columns is-multiline datos-tarjeta'>
            <h2 className='column is-full title is-size-4'>Datos del contacto</h2>
            <div id='tipoTarjeta_resume' className='column is-two-thirds finalResume-item'>
              <label>Nombre completo</label>
              <h4>{contact.Full_Name}</h4>
            </div>
            <div id='numeroTarjeta_resume' className='column is-one-third finalResume-item'>
              <label>Pais</label>
              <h4>{contact.Pais}</h4>
            </div>
            <div id='fechaVencimiento_resume' className='column is-one-third finalResume-item'>
              <label>Telefono</label>
              <h4>{contact.Phone}</h4>
            </div>

            <div id='tipoNumDocumento_resume' className='column is-one-third finalResume-item'>
              <label>Tipo Y NÚMERO DE DOC</label>
              <h4>DNI: {contact.Identificacion}</h4>
            </div>
          </div>
          <Columns className='finalResume-confirmation'>
            <Columns.Column>
              <ButtonField
                className={`grid-payment_method-item button ${
                  'Datos correctos' === stepFour.value && 'active'
                }`}
                showText={true}
                id='checkContract'
                name='checkContract'
                value='Datos correctos'
                onClick={() => {
                  // // //console.log(userInfo)
                  const { sideItemOptions } = options;

                  sideItemOptions[3].value = 'Datos correctos';
                  stepFour.value = 'Datos correctos';

                  setOptions({
                    ...options,
                    sideItemOptions: [...sideItemOptions],
                  });

                  setUserInfo({
                    ...userInfo,
                  });

                  setFormikValues({
                    ...formikValues,
                    amount: sale.Grand_Total,
                    sale,
                    contact,
                    products,
                    advanceSuscription: {
                      isAdvanceSuscription: resumeData.isAdvanceSuscription,
                      remainingAmountToPay: resumeData.remainingAmountToPay,
                      firstQuoteDiscount: resumeData.firstQuoteDiscount,
                      payPerMonthAdvance: resumeData.payPerMonthAdvance,
                      quotesAdvance: formikValues.quotes - 1,
                    },
                  });
                }}
              />
            </Columns.Column>

            <Columns.Column>
              <ButtonField
                className={`grid-payment_method-item button ${
                  'Datos erroneos' === stepFour.value && 'active'
                }`}
                showText={true}
                id='checkContract'
                name='checkContract'
                value='Datos erroneos'
                onClick={() => {
                  const { sideItemOptions } = options;
                  const { stepFour } = userInfo;
                  appRef.current.style.filter = 'blur(8px)';

                  sideItemOptions[3].value = 'Datos erroneos';
                  stepFour.value = 'Datos erroneos';

                  setOpenModal('card');

                  setOptions({
                    ...options,
                    sideItemOptions: [...sideItemOptions],
                  });

                  setUserInfo({
                    ...userInfo,
                  });
                }}
              />
            </Columns.Column>
          </Columns>
          {/* <pre>{JSON.stringify(formikValues, null, 2)}</pre> */}
        </div>
      )}
      <Modal
        show={openModal === 'card'}
        showClose={false}
        onClose={() => {
          appRef.current.style.filter = 'blur(0px)';

          return setOpenModal();
        }}
      >
        <Modal.Card>
          <Modal.Card.Header>
            <Modal.Card.Title>Datos incorrectos del contrato</Modal.Card.Title>
          </Modal.Card.Header>
          <Modal.Card.Body>
            <Media>
              <Media.Item>
                <Content>
                  <p>
                    Deberia editar los datos en la plataforma de Zoho y luego volver a hacer el
                    procedimiento de compra
                  </p>

                  <a
                    href={`https://crm.zoho.com/crm/org651130949/tab/SalesOrders/${id}`}
                    className='button is-primary is-normal is-fullwidth'
                  >
                    Salir de pasarela y editar contrato
                  </a>
                </Content>
              </Media.Item>
            </Media>
          </Modal.Card.Body>
        </Modal.Card>
      </Modal>
    </>
  );
}

export default ResumeTicket;
