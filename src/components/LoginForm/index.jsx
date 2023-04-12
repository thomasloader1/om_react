import axios from 'axios';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { AppContext } from '../PasarelaCobros/Provider/StateProvider';
import { useNavigate } from 'react-router';
import useToken from '../VentaPresencial/Hook/useToken';
import { useSwal } from '../VentaPresencial/Hook/useSwal';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setToken } = useToken();
  const { modalAlert } = useSwal();
  const { setIsAuthenticated, setTokenLogin } = useContext(AppContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const bodyParameters = {
        email: username,
        password,
        remember_me: true,
      };
      const response = await axios.post(
        '/api/login',
        bodyParameters /*config*/
      );

      setIsAuthenticated(true);

      setToken(response.data.access_token);

      setTokenLogin(`Bearer ${response.data.access_token}`);
      navigate('/ventapresencial/');
    } catch (error) {
      console.log('Error en login de axios: ', error);

      if (error.response && error.response.data) {
        modalAlert(error.response.data.messagge, 'error');
        localStorage.setItem('tokenLogin', ``);
        console.log('mensaje del server: ', error.response.data.messagge);
      } else {
        modalAlert('Error al intentar iniciar sesión', 'error');
      }
    }
  };

  // const handleSubmit = (event) => {
  // };

  return (
    <div className="hero-body">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-5-tablet is-4-desktop is-3-widescreen">
            <form action="" className="box" onSubmit={handleSubmit}>
              <h2 className="title is-4">Login Venta Presencial</h2>
              <div className="field">
                <label htmlFor="username" className="label">
                  Usuario:
                </label>
                <div className="control">
                  <input
                    id="username"
                    type="text"
                    value={username}
                    className="input"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="" className="label">
                  Contraseña
                </label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {/* <div className="control has-icons-left">
                  <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                  <span className="icon is-small is-left">
                    <i className="fa fa-lock"></i>
                  </span>
                </div> */}
              </div>
              {/* <div className="field">
                <label htmlFor='' className="checkbox">
                  <input type="checkbox"/>
                Remember me
                </label>
              </div> */}
              <div className="field">
                <button className="button is-success">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
