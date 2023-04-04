import axios from 'axios';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { AppContext } from '../PasarelaCobros/Provider/StateProvider';
import { useNavigate } from 'react-router';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated, setTokenLogin, tokenLogin } = useContext(AppContext);

  const handleLogin = async (username, password) => {

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // TODO: Validar las credenciales y llamar a la función onLogin si son correctas
    // event.preventDefault();
    // const config = {
    //   headers: { Authorization: `Bearer ${token}` }
    // };
    try {
      const bodyParameters = {
        email: username, password, remember_me: true
      };
      const response = await axios.post(
        '/api/login',
        bodyParameters,
        // config
      );
      console.log("Respuesta con token del login: ", response);
      setIsAuthenticated(true);
      localStorage.setItem('tokenLogin', `Bearer ${response.data.access_token}`);
      setTokenLogin(`Bearer ${response.data.access_token}`);
      console.log('token state: ', tokenLogin);
      navigate("/")
    } catch (error) {
      console.log("Error en login de axios: ", error);

      if (error.response && error.response.data) {
        alert(error.response.data.messagge);
        localStorage.setItem('tokenLogin', ``);
        console.log("mensaje del server: ", error.response.data.messagge);
      } else {
        alert('Error al intentar iniciar sesión');
      }
    }
  };

  // const handleSubmit = (event) => {
  // };

  return (
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-3-widescreen">
            <form action="" class="box" onSubmit={handleSubmit}>
              <h2 className="title is-4">Login Venta Presencial</h2>
              <div class="field">
                <label for="" class="label">Usuario:</label>
                <div class="control">
                  <input type="text" value={username} class="input" onChange={(e) => setUsername(e.target.value)} required />
                </div>
              </div>
              <div class="field">
                <label for="" class="label">Contraseña</label>
                <div class="control">
                  <input type="password" class="input" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {/* <div class="control has-icons-left">
                  <input type="password" class="input" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                </div> */}
              </div>
              {/* <div class="field">
                <label for="" class="checkbox">
                  <input type="checkbox"/>
                Remember me
                </label>
              </div> */}
              <div class="field">
                <button class="button is-success">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
