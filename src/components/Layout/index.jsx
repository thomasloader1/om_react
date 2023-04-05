import React from 'react';
import Header from '../PasarelaCobros/Header';


function Layout({ children }) {
    return (
        <div>
            <Header />
            <main className='container is-max-widescreen h-100vh'>{children}</main>
        </div>
    );
}

export default Layout;
