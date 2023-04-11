import axios from 'axios';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { AppContext } from '../PasarelaCobros/Provider/StateProvider';
import { useNavigate } from 'react-router';
import useToken from '../VentaPresencial/Hook/useToken';
import { useSwal } from '../VentaPresencial/Hook/useSwal'

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setToken } = useToken()
  const { setIsAuthenticated, setTokenLogin } = useContext(AppContext);
  const { modalAlert } = useSwal()

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
      const response = await axios.post('/api/login', bodyParameters,/*config*/);
      console.log("Respuesta con token del login: ", response);
      setIsAuthenticated(true);

      setToken(response.data.access_token);

      setTokenLogin(`Bearer ${response.data.access_token}`);
      navigate("/ventapresencial/")
    } catch (error) {
      modalAlert('Las credenciales son invalidas', 'error')

      if (error.response && error.response.data) {
        localStorage.setItem('tokenLogin', ``);
        console.log("mensaje del server: ", { error }, error.response.data.messagge);
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
            <h2 className="title is-4">Login Venta Presencial</h2>
            <form action="" className="box" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="username" className="label">Usuario:</label>
                <div className="control">
                  <input id='username' type="text" value={username} className="input" onChange={(e) => setUsername(e.target.value)} required />
                </div>
              </div>
              <div className="field">
                <label htmlFor='' className="label">Contraseña</label>
                <div className="control">
                  <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} required />
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
                <button className="button is-success">
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
