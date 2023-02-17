import React, { useContext } from 'react';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import { FormStep } from './MultiStep';
import { motion } from 'framer-motion';
import Spinner from '../../PasarelaCobros/Spinner';
import { Block, Notification } from 'react-bulma-components';

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
              height: '50vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Spinner />
            <p>Creando nuevo contrato, espere porfavor</p>
          </motion.div>
        ) : (
          <Block style={{ margin: '1rem 0' }}>
            <Notification color="success" light="true">
              <p>
                Se genero el contrato <b>{completeData?.id}</b> con pais{' '}
                <b>{appEnv?.country}</b> y esta listo para ser cobrado
              </p>
            </Notification>
          </Block>
        )}
      </FormStep>
    </>
  );
};

export default ResumeStep;
