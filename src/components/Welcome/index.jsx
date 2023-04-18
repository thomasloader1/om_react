/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import Layout from '../Layout';
import vpAppImg from '../../img/global/vp.png';
import api from '../VentaPresencial/Services/api';
import { useNavigate } from 'react-router';
import useToken from '../VentaPresencial/Hook/useToken';
import { AppContext } from '../PasarelaCobros/Provider/StateProvider';
import { Link } from 'react-router-dom';

const Welcome = () => {
  const { user, setUser } = useContext(AppContext);
  const [oldSales, setOldSales] = useState([])
  const { loading, validateToken } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    async function isAuth() {
      const tokenIsValid = await validateToken();
      if (!tokenIsValid.isValid) {
        navigate('/vp/login');
      }
      setUser(tokenIsValid.user)
      // console.log({ tokenIsValid, user });
      const oldSales = await api.getSalesByUser(tokenIsValid.user?.id)
      setOldSales(oldSales)
    }
    isAuth();
  }, []);

  return (
    <>
      {!loading && (
        <Layout>
          <div className="columns">
            <div className="column is-three-quarters-desktop is-two-thirds-tablet is-full-mobile">
              <div className="cardAsesor asesor-comerical ">
                <div className="cardAsesor-img-overlay">
                  <div className="overlay-color" />

                  <picture>
                    <source
                      type="image/jpg"
                      media="(max-width: 1920px)"
                      srcSet={vpAppImg}
                    />
                    <img src={vpAppImg} alt="Hola" />
                  </picture>
                </div>
                <h4 className="cardAsesor-title">Venta presencial</h4>
                <button
                  type="button"
                  className="button is-primary is-medium"
                  onClick={async () => {
                    const { id } = await api.createProgress(user.id);
                    navigate(`/ventapresencial/${id}`);
                  }}
                >
                  Comenzar
                </button>
              </div>
            </div>
          </div>
          {/*  <div className="columns">
            <div className="column">
              <h2 className='is-size-3'>Otras Ventas presenciales que generastes {user?.name}</h2>
              {oldSales.map(sale => (<Link key={sale.id} className='button is-primary mx-1 mt-2' to={`/ventapresencial/${sale.id}`}>{sale.id}</Link>))}
            </div>
          </div> */}
        </Layout>
      )}
    </>
  );
};

export default Welcome;
