import React, { useContext,useEffect } from 'react';
import { Container, Notification } from 'react-bulma-components';
import { Route, Routes, useLocation } from 'react-router';
// import PasarelaApp from '../PasarelaCobros/App';
import VentaPresencialApp from '../VentaPresencial/App';
import LoginForm from '../LoginForm';
import { useState } from 'react';
import Axios from 'axios';
import { AppContext } from '../PasarelaCobros/Provider/StateProvider';

const titles = {
  superpasarela: 'Pasarela de cobros',
  ventapresencial: 'Venta presencial',
};

function App() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { tokenLogin,setTokenLogin } = useContext(AppContext);

  // const handleLogin = (username, password) => {
  //   // TODO: Validar las credenciales y establecer el estado de autenticación
  //   if (username === 'admin' && password === '123456') {
  //     setIsAuthenticated(true);
  //   } else {
  //     alert("Usuario o contraseña no validos. Intente nuevamente.")
  //   }
  // };

  const handleLogin = (username, password) => {
    // event.preventDefault();
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const bodyParameters = {
      email: username, password
    };
    Axios.post(
      'http://127.0.0.1:8000/api/login2',
      bodyParameters,
      config
    )
    .then(response => {
      console.log("Respuesta con token del login: ",response);
      // Aquí puedes hacer algo con la respuesta del servidor
      setIsAuthenticated(true);
      setTokenLogin(`Bearer ${response.data.access_token}`);
      console.log('token state: ', tokenLogin);
    })
    .catch(error => {
      console.log("Error en login de axios: ",error);
      // setError('Error al intentar iniciar sesión');
      if (error.response && error.response.data) {
        alert(error.response.data.messagge);
        console.log("mensaje del server: ",error.response.data.messagge);
      } else {
        alert('Error al intentar iniciar sesión');
      }
    });
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
