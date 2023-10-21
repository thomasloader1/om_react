import React from 'react';
import { useParams } from 'react-router';
import MotionSpinner from '../Spinner/MotionSpinner';
import { Container, Navbar, Image, Card, Content } from 'react-bulma-components';
import IMAGES from '../../../img/pasarelaCobros/share';
import { usePaymentPTP } from '../Hooks/usePaymentPTP';

const { logo } = IMAGES;

const StatusPTP = () => {
  const { requestId } = useParams();
  const { loading, data } = usePaymentPTP(requestId);
  const ptpStatus = data?.ptp?.status;

  const getStatusText = (status) => {
    const statusFront = {
      PENDING: 'Pendiente',
      FAILED: 'Pago Fallido',
      REJECTED: 'Pago Rechazado',
      APPROVED: 'Pago Aprobado',
    };
    return statusFront[status] || '';
  };

  const getCardColor = (status) => {
    const colorMap = {
      PENDING: 'is-secondary',
      FAILED: 'is-danger',
      REJECTED: 'is-danger',
      APPROVED: 'is-success',
    };
    return colorMap[status] || '';
  };

  return (
    <>
      {loading ? (
        <MotionSpinner />
      ) : (
        <Container className='grid-status has-text-centered'>
          <section>
            <div className='columns'>
              <div className='column'>
                <div className='is-flex is-justify-content-center'>
                  <Image src={logo} alt='MSK Logo' size={128} />
                </div>
                <Card className={`notification ${getCardColor(ptpStatus?.status)} my-4`}>
                  <Card.Content>
                    <Content>
                      <h1 className='title is-1 has-text-weight-bold'>
                        {getStatusText(ptpStatus?.status)}
                      </h1>
                      <p>{ptpStatus?.message}</p>
                      {ptpStatus?.status === 'PENDING' && (
                        <p>Se notificara mediante email cuando cambie de estado</p>
                      )}
                    </Content>
                  </Card.Content>
                </Card>
                {ptpStatus?.status !== 'FAILED' && (
                  <Card className='notification my-4 is-primary'>
                    <h1 className='title is-4'>Datos del pago</h1>
                    <Content>
                      <p>
                        <strong>Reference:</strong> {data?.ptp?.request?.payment?.reference}
                      </p>
                      <p>
                        <strong>Tipo de Documento:</strong>{' '}
                        {data?.ptp?.request?.payer?.documentType}
                      </p>
                      <p>
                        <strong>Número de Documento:</strong> {data?.ptp?.request?.payer?.document}
                      </p>
                      <p>
                        <strong>Monto del Pago:</strong>{' '}
                        {data?.ptp?.request?.payment?.amount?.total}{' '}
                        {data?.ptp?.request?.payment?.amount?.currency}
                      </p>
                      <p>
                        <strong>Nombre Completo:</strong> {data?.ptp?.request?.payer?.name}{' '}
                        {data?.ptp?.request?.payer?.surname}
                      </p>
                    </Content>
                  </Card>
                )}
              </div>
            </div>
          </section>
        </Container>
      )}
    </>
  );
};

export default StatusPTP;
