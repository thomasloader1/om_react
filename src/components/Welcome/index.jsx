import React, { useContext, useEffect } from 'react'
import Layout from '../Layout'
import vpAppImg from '../../img/global/vp.png'
import api from '../VentaPresencial/Services/api'
import { useNavigate } from 'react-router'
import useToken from '../VentaPresencial/Hook/useToken'
import { AppContext } from '../PasarelaCobros/Provider/StateProvider'

const Welcome = () => {
    const { user } = useContext(AppContext)
    const { validateToken } = useToken()
    const navigate = useNavigate();

    useEffect(() => {
        async function isAuth() {
            const tokenIsValid = await validateToken()
            if (!tokenIsValid) {
                navigate("/vp/login")
            }
            console.log({ tokenIsValid, user })
        }
        isAuth()
    }, [])

    return (
        <Layout>
            <div className='columns'>
                <div className='column is-three-quarters-desktop is-two-thirds-tablet is-full-mobile' >
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
                                navigate(`/ventapresencial/${id}`)
                            }}
                        >
                            Comenzar
                        </button>
                    </div>
                </div>
            </div>

        </Layout >
    )
}

export default Welcome