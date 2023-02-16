import React, { useContext } from 'react';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import { FormStep } from './MultiStep';
import { motion } from 'framer-motion';
import Spinner from '../../PasarelaCobros/Spinner';

const ResumeStep = ({ processContract, completeData }) => {
  const { appEnv } = useContext(AppContext);

  return (
    <>
      <FormStep stepNumber={5} stepName="Pago de contrato">
        {processContract ? (
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
        ) : (
          <p>
            Se genero el contrato <b>{completeData?.id}</b> con pais{' '}
            <b>{appEnv?.country}</b> y esta listo para ser cobrado
          </p>
        )}
      </FormStep>
    </>
  );
};

export default ResumeStep;
