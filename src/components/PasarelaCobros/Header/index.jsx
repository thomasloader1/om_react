/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Navbar } from 'react-bulma-components';
import IMAGES from '../../../img/pasarelaCobros/share';

function Header() {
  const { logo } = IMAGES;
  return (
    <header className="container is-max-widescreen py-5">
      {/*       <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a className="navbar-item" href="">
            <img src={logo} alt="Oceano Logo" width="100%" height="auto" />
          </a>
        </div>
      </nav> */}

      <Navbar active="true" transparent="true">
        <Navbar.Brand>
          <Navbar.Item href="#">
            <img alt="Oceano Logo" height="auto" src={logo} width="100%" />
          </Navbar.Item>
          <Navbar.Burger />
        </Navbar.Brand>
      </Navbar>
    </header>
  );
}

export default Header;
