/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Navbar } from 'react-bulma-components';
import IMAGES from '../../../img/pasarelaCobros/share';
import { useToggle } from '../Hooks/useToggle';
import { motion } from 'framer-motion';

function Header() {
  const { logo } = IMAGES;
  const { expanded, toggleState } = useToggle(false);
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
    <header className={`container is-max-widescreen py-5 ${expanded ? 'is-expanded' : ''}`}>

      <Navbar transparent='true'>
        <Navbar.Brand>
          <Navbar.Burger onClick={toggleState} />
          <Navbar.Item href='#'>
            <motion.img
              animate={expanded ? 'open' : 'closed'}
              variants={variantStyles}
              alt='MSK Logo'
              height='auto'
              src={logo}
              width='130px'
            ></motion.img>
          </Navbar.Item>
        </Navbar.Brand>
      </Navbar>
    </header>
  );
}

export default Header;
