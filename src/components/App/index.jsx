import React from 'react';
import { Container, Notification } from 'react-bulma-components';
import { Route, Routes } from 'react-router';
import PasarelaApp from '../PasarelaCobros/App';
import VentaPresencialApp from '../VentaPresencial/App';

function App() {
  return (
    <Routes>
      <Route path="/superpasarela/:id" element={<PasarelaApp />} />
      <Route path="/ventapresencial" element={<VentaPresencialApp />} />

      <Route
        path="*"
        element={
          <main style={{ padding: '1rem' }}>
            <div>
              <Container>
                <Notification color="danger">
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
