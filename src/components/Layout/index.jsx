import React from 'react';
import Header from '../PasarelaCobros/Header';


function Layout({ children }) {
    return (
        <div>
            <Header />
            <main className='container is-max-widescreen' >
                <div className='pasarela columns is-centered mt-3'>
                    {children}
                </div>
            </main>
        </div>
    );
}

export default Layout;
