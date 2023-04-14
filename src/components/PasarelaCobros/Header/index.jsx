/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Button, Navbar } from 'react-bulma-components';
import IMAGES from '../../../img/pasarelaCobros/share';
import { useToggle } from '../Hooks/useToggle';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { AppContext } from '../Provider/StateProvider';
import { BiLogOut } from 'react-icons/bi';
import api from '../../VentaPresencial/Services/api';
import useToken from '../../VentaPresencial/Hook/useToken';

function Header() {
  const { logo } = IMAGES;
  const { expand, toggleState } = useToggle(false);
  const { user } = useContext(AppContext);
  const { getTokenFromLS, validateToken } = useToken();

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

  const handleLogout = async () => {
    // hacer logout aquí
    const token = getTokenFromLS();
    const response = await api.logout('/api/logout', {
      token,
      user_id: user.id,
    });
    console.log('Logout', { response });
    validateToken();
  };

  return (
    <header
      className={`container is-max-widescreen py-5 ${
        expand ? 'is-expanded' : ''
      }`}
    >
      <Navbar
        transparent="true"
        className="is-flex is-justify-content-space-between	"
      >
        <Navbar.Brand>
          <Navbar.Burger
            className="is-hidden-tablet-only"
            onClick={toggleState}
          />
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
        {user && (
          <div className="is-flex is-align-items-center">
            <p className="mr-3">Bienvenido, {user.name}</p>

            <Button color="primary" onClick={handleLogout}>
              <BiLogOut />
            </Button>
          </div>
        )}
      </Navbar>
    </header>
  );
}

export default Header;
