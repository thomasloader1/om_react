import React, {useContext, useEffect, useState} from 'react';
import IMAGES from '../../../img/pasarelaCobros/share';
import { useLocation, useParams } from 'react-router';
import { fireModalAlert, fireToast } from '../Hooks/useSwal';
import {
  debitFirstPayment,
  ptpImages,
  updateZohoContract, rejectSession, ptpStates,
} from '../../../logic/ptp';
import { useContractZoho } from '../Hooks/useContractZoho';
import MotionSpinner from '../Spinner/MotionSpinner';
import InvoiceDetail from './InvoiceDetail';
import { makePostUpdateZohoPTP } from '../../../logic/zoho';
import {AppContext} from "../Provider/StateProvider";
import {useFetchPaymentLink} from "../Hooks/useFetchPaymentLink";
import PaymentStatusPTP from "../PaymentStatusPTP/PaymentStatusPTP";

const { logo } = IMAGES;
const { REACT_APP_PTP_CHECKOUT_URL } = process.env

const CheckoutPTP = () => {
  const {rejectedSessionPTP, setRejectedSessionPTP} = useContext(AppContext);
  const [ptpEffect, setPtpEffect] = useState(true);
  const [statusRequestPayment, setStatusRequestPayment] = useState(null);

  const { so } = useParams();
  const { pathname } = useLocation();

  const needRunEffect = !pathname.includes('vp');
  const { loading, data: contractData } = useContractZoho(so, needRunEffect);
  const {
    loading: loadingPL,
    products,
    checkoutPayment,
    processURL,
    advancePayment ,
    invoiceDetail,
    currencyOptions
  } = useFetchPaymentLink(!loading, so,contractData);


  useEffect(() => {
    const makeFirstPayment = async (requestId) => {
      try {
        const res = await debitFirstPayment({ ...requestId });

        console.log({ res });
        const statusPaymentPTP = res.data.statusPayment;
        const transactionPTP = checkoutPayment.transaction ?? res.data.updateRequestSession;

        if (statusPaymentPTP.includes(ptpStates.OK)) {
          fireToast(res.data.result, 'success');

          const paymentUserData = JSON.parse(transactionPTP.paymentData)

          const data = {
            requestId: requestId.requestId,
            adjustment: 0,
            contractId: transactionPTP.contract_id,
            street: paymentUserData.street,
            is_suscri: !transactionPTP.type.includes('Tradicional'),
          };
          const bodyZoho = makePostUpdateZohoPTP(data);
          const zohoResponse = await updateZohoContract(bodyZoho);

          if (zohoResponse.contact && zohoResponse.contract)
            fireToast(
                `Contacto ID: ${zohoResponse?.contact?.id} y Contrato id: ${zohoResponse?.contract?.id} se actualizados correctamente`,
                'success',
                50000,
            );

          //setOpenBlockLayer(true);
        } else if (statusPaymentPTP.includes(ptpStates.PENDING)) {
          const redirectState = {
            redirect: true,
            redirectSuffix: res.data?.payment?.pendingPayment?.requestId,
          };

          fireModalAlert('Pago Pendiente', res.data.result, 'warning', redirectState);
          setStatusRequestPayment(statusPaymentPTP);
        } else {
          fireModalAlert('Pago Rechazado', res.data.result, 'error');
          setStatusRequestPayment(statusPaymentPTP);
        }

      } catch (e) {
        console.log({ e });
        fireToast('Error al cobrar');
      }
    };

    if (ptpEffect) {
      setPtpEffect(false);
      window.P.on('response', async function (response) {
        console.log({ response });
        const { status } = response.status;
        setStatusRequestPayment(status);

        if (status.includes('APPROVED')) {
          const { requestId } = response;

          const body = {
            requestId,
          };

          try {
            makeFirstPayment(body);
          } catch (error) {
            console.log(error);
          }

          return;
        }

        const isRejectedSession = await rejectSession(response);
        //la referencia, el valor y el estado de la transacción
        setRejectedSessionPTP({
          reference: isRejectedSession.data.reference,
          status: isRejectedSession.data.ptpResponse.status.status,
          fullName: contractData.contact.Full_Name,
          payment: isRejectedSession.data.payment,
        });

        fireToast(`El estado de la sesion cambio a ${status}`, 'info');
      });
    }

    return () => {
      console.log({ P: window.P });
    };
  }, []);

  const totalPrice = products?.reduce((total, p) => total + Math.floor(p.price * p.quantity), 0);

  const handleInitPayment = async () => {
    window.P.init(`${REACT_APP_PTP_CHECKOUT_URL}/${processURL}`);
  };

  const loadingMessage = loading ? "Recuperando datos del contrato" : loadingPL ? "Recuperando datos de pago" : null
  return (
    <>
      {loading || loadingPL ? (
        <MotionSpinner text={loadingMessage} />
      ) : (
        <main className='grid-checkout container'>
          <header className={`is-max-widescreen py-5`}>
            <nav
              className='navbar is-justify-content-center'
              role='navigation'
              aria-label='main navigation'
            >
              <div className='navbar-brand msk-logo'>
                <img src={logo} alt='MSK Logo' width='130' height='130' />
              </div>
            </nav>
          </header>
          <section className='container'>
            <div className='columns'>
              <div className='column'>
                <div className='card my-4'>
                  <div id='card' className='card-content has-text invoice-text'>
                    <h1 className='title is-1 title-type'>
                      {checkoutPayment?.type === 'Suscripción con anticipo'
                        ? 'Inscripción con anticipo'
                        : 'Finaliza tu inscripción'}
                    </h1>

                    {!loadingPL && checkoutPayment?.type.includes('Suscripción') ? (
                      <InvoiceDetail invoiceDetail={invoiceDetail} />
                    ) : (
                      <div>
                        <p>
                          {invoiceDetail?.totalMonths}{' '}
                          {checkoutPayment?.type === 'Tradicional' ? 'pago unico de' : 'pagos de'}
                        </p>
                        <h3 className='title is-3'>
                          {checkoutPayment?.type === 'Suscripción con anticipo'
                            ? invoiceDetail?.formattedFirstPay
                            : invoiceDetail?.formattedAmount}
                        </h3>
                      </div>
                    )}
                  </div>
                  <hr className='is-divider-dashed' />
                  <div className='px-5 py-2 invoice-text'>
                    <h4 className='is-4 invoice-text mb-2'>Detalle de tu inscripci&oacute;n</h4>

                    {products?.map((p) => (
                      <div key={p.id} className='is-flex is-justify-content-space-between mb-2'>
                        <span className='item-deail-text'>
                          x{p.quantity} {p.name}
                        </span>
                        <span className='has-text-weight-bold item-deail-text'>
                          {new Intl.NumberFormat('MX', currencyOptions).format(Math.floor(p.price))}
                        </span>
                      </div>
                    ))}
                  </div>
                  <hr className='is-divider-dashed' />

                  <div className='px-5 py-2 invoice-text is-flex is-justify-content-end'>
                    <h4 className='is-4 invoice-text mb-2 mr-2'>Total</h4>
                    <span className='has-text-weight-bold item-deail-text'>
                      {new Intl.NumberFormat('MX', currencyOptions).format(totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
              <div className='column'>
                <div className='is-flex is-justify-content-center is-align-items-center invoice-text'>
                  <span>Pagos procesados con</span>
                  <img
                    src='https://static.placetopay.com/placetopay-logo.svg'
                    width='120px'
                    alt='Gateway'
                    className='ml-2'
                  />
                </div>
                <img
                  src={ptpImages.availableCards}
                  alt='Tarjeta aceptadas'
                  width='200px'
                  className='mt-3 mx-auto is-block'
                />

                <PaymentStatusPTP checkoutPayment={checkoutPayment} handleInitPayment={handleInitPayment}/>

                {rejectedSessionPTP && (
                    <div id="rejectedSessionPTP" className="notification is-danger">
                      <p><strong>Estado del pago:</strong> {rejectedSessionPTP.payment.status}</p>
                      <p><strong>Referencia de pago:</strong> {rejectedSessionPTP.payment.reference}</p>
                      <p><strong>Monto:</strong> {rejectedSessionPTP.payment.currency} {rejectedSessionPTP.payment.total}</p>
                      <p><strong>Nombre de usuario:</strong> {rejectedSessionPTP.fullName}</p>
                    </div>
                )}

                <p className='invoice-text mt-5 mx-3 has-text-centered'>
                  Si tiene dudas o consultas puedes visitar nuestro
                  <a
                    href='https://ayuda.msklatam.com/'
                    target='_blank'
                    rel='noreferrer'
                    className='has-text-info'
                  >
                    {' '}
                    centro de ayuda{' '}
                  </a>
                  o ver las
                  <a
                    href='https://ayuda.msklatam.com/portal/es/kb/articles/placetopay'
                    target='_blank'
                    rel='noreferrer'
                    className='has-text-info'
                  >
                    {' '}
                    preguntas frecuentes{' '}
                  </a>
                </p>
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default CheckoutPTP;
