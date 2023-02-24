import React from 'react';
import Spinner from '.';
import { motion } from 'framer-motion';

const MotionSpinner = ({ text, viewHeight }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0 }}
      style={{
        height: viewHeight ? viewHeight : '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Spinner />
      {text && <motion.h2 className="mt-2 is-2">{text}</motion.h2>}
    </motion.div>
  );
};

export default MotionSpinner;
