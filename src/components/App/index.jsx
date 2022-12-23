import React, { useEffect } from 'react';
import { Container, Notification } from 'react-bulma-components';
import { Route, Routes, useLocation } from 'react-router';
import PasarelaApp from '../PasarelaCobros/App';
import VentaPresencialApp from '../VentaPresencial/App';

const titles = {
  'superpasarela': 'Pasarela de cobros',
  '/ventapresencial': 'Venta presencial',
}

function App() {
  const location = useLocation()
  useEffect(
    () => {
      const title = location.pathname.includes('superpasarela') ? titles.superpasarela :  titles[location.pathname]
      document.title = title ?? 'No controlled title'
    },
    [location]
  )

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
