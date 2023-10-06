import React from 'react';
import { Container, Notification } from 'react-bulma-components';
import { Route, Routes } from 'react-router';
import PasarelaApp from '../PasarelaCobros/App';
import VentaPresencialApp from '../VentaPresencial/App';
import Checkout from '../PasarelaCobros/Checkout';
import Status from '../PasarelaCobros/Status';
import CheckoutPTP from '../PasarelaCobros/CheckoutPTP';

function App() {
  return (
    <Routes>
      <Route path='/:id' element={<PasarelaApp />} />
      <Route path='ptp/:id/renew' element={<PasarelaApp />} />
      <Route path='checkout/:so' element={<Checkout />} />
      <Route path='checkout/ptp/:so' element={<CheckoutPTP />} />
      <Route path='status/:payment_id' element={<Status />} />
      <Route exact path='/vp/:id' element={<PasarelaApp />} />
      <Route path='/ventapresencial' element={<VentaPresencialApp />} />
      <Route
        path='/vp/error'
        element={
          <main style={{ padding: '1rem' }}>
            <div>
              <Container>
                <Notification color='danger'>
                  No se pudo encontrar el proceso de compra o no tiene los pasos necesarios para
                  avanzar con el pago.
                </Notification>
              </Container>
            </div>
          </main>
        }
      />
      <Route
        path='*'
        element={
          <main style={{ padding: '1rem' }}>
            <div>
              <Container>
                <Notification color='danger'>
                  Para cobrar un contrato debe especificar un ID de contrato en la URL
                </Notification>
              </Container>
            </div>
          </main>
        }
      />
    </Routes>
  );
}

export default App;
