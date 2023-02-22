/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Navbar } from 'react-bulma-components';
import IMAGES from '../../../img/pasarelaCobros/share';
import { useToggle } from '../Hooks/useToggle';
import { motion } from 'framer-motion';

function Header() {
  const { logo } = IMAGES;
  const { expand, toggleState } = useToggle(false);
  const variantStyles = {
    open: {
      opacity: 0,
      transition: {
        type: 'spring',
        bounce: 0,
        duration: 0.3,
      },
    },
    closed: {
      opacity: 1,
      transition: {
        type: 'spring',
        bounce: 0,
        duration: 0.3,
      },
    },
  };
  return (
    <header
      className={`container is-max-widescreen py-5 ${
        expand ? 'is-expanded' : ''
      }`}
    >
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

      <Navbar transparent="true">
        <Navbar.Brand>
          <Navbar.Burger onClick={toggleState} />
          <Navbar.Item href="#">
            <motion.img
              animate={expand ? 'open' : 'closed'}
              variants={variantStyles}
              alt="Oceano Logo"
              height="auto"
              src={logo}
              width="100%"
            ></motion.img>
          </Navbar.Item>
        </Navbar.Brand>
      </Navbar>
    </header>
  );
}

export default Header;
