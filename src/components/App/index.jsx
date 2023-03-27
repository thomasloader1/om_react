import React, { useEffect } from 'react';
import { Container, Notification } from 'react-bulma-components';
import { Route, Routes, useLocation } from 'react-router';
// import PasarelaApp from '../PasarelaCobros/App';
import VentaPresencialApp from '../VentaPresencial/App';
import LoginForm from '../LoginForm';
import { useState } from 'react';
const titles = {
  superpasarela: 'Pasarela de cobros',
  ventapresencial: 'Venta presencial',
};

function App() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (username, password) => {
    // TODO: Validar las credenciales y establecer el estado de autenticación
    if (username === 'admin' && password === '123456') {
      setIsAuthenticated(true);
    } else {
      alert("Usuario o contraseña no validos. Intente nuevamente.")
    }
  };

  useEffect(() => {
    const hasIncludeString = location.pathname.includes('superpasarela');
    const title = hasIncludeString
      ? titles.superpasarela
      : titles.ventapresencial;
    document.title = title ?? 'No controlled title';
  }, [location]);

  return (
    
    <Routes>
      {/* <Route path="/superpasarela/:id" element={<PasarelaApp />} /> */}
      {/* <Route
        exact
        path="ventapresencial/:id"
        element={<VentaPresencialApp />}
      /> */}
      {isAuthenticated ? (
        <Route exact path="/ventapresencial/:id" element={<VentaPresencialApp />} />
      ) : (
        <Route exact path="/ventapresencial/:id" element={<LoginForm onLogin={handleLogin} />} />
      )}

      {/* <Route exact path="/" element={<VentaPresencialApp />} /> */}
      {isAuthenticated ? (
        <Route exact path="/" element={<VentaPresencialApp />} />
      ) : (
        <Route exact path="/" element={<LoginForm onLogin={handleLogin} />} />
      )}

      <Route
        path="*"
        element={
          <main style={{ padding: '1rem' }}>
            <div>
              <Container>
                <Notification color="danger">
                  Para cobrar un contrato debe especificar un ID de contrato en
                  la URL
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
