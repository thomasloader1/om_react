import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdClose } from 'react-icons/md';
import { useToggle } from '../../PasarelaCobros/Hooks/useToggle';

function SelectCourseOverlay() {
  const [searchTerm, setSearchTerm] = useState('');
  const { expand, toggleState } = useToggle();
  const variantStyles = {
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };
  return (
    <motion.div
      className={`searchcourses-overlay ${expand ? 'is-expanded' : ''}`}
      variants={variantStyles}
      initial="closed"
      animate={expand ? 'open' : 'closed'}
    >
      <h2 className="title has-text-white is-4">
        Buscar por
        <MdClose className="is-size-4" onClick={toggleState} />
      </h2>
      <div>
        <div className="field searchbar-mobile">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Buscar curso por nombre"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SelectCourseOverlay;
