import React, { useState, useEffect } from 'react';
import Spinner from '../../PasarelaCobros/Spinner';
import { motion } from 'framer-motion';

const withSpinner = (ComponentToLoad) => {
  return function WithSpinnerComponent(props) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      import(ComponentToLoad)
        .then(() => setIsLoading(false))
        .catch((err) => {
          console.log(err);
        });
    }, []);

    if (isLoading || props.loading) {
      // <--- Agregamos props.loading en la condición
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          exit={{ opacity: 0 }}
          style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Spinner />
        </motion.div>
      );
    }

    return <ComponentToLoad {...props} />;
  };
};

export default withSpinner;
