import React, { useContext } from 'react';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import { FormStep } from './MultiStep';
import { motion } from 'framer-motion';
import Spinner from '../../PasarelaCobros/Spinner';
import { Block, Notification } from 'react-bulma-components';
import withSpinner from '../Hoc/withSpinner';

const ResumeStep = ({ processContract, completeData }) => {
  const { appEnv } = useContext(AppContext);

  const contractNumber = completeData?.id
    ? completeData?.id
    : appEnv?.contract?.entity_id_crm;

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
          <motion.div
            className="modal-generated-link"
            animate={{ boxShadow: 'rgb(229 227 236) 0px 0px 8px 3px' }}
            transition={{ ease: 'easeOut', duration: 0.5 }}
          >
            <motion.h2 className="title is-4">¡Contrato Generado!</motion.h2>

            <div
              className=" mt-3"
              style={{
                textAlign: 'center',
              }}
            >
              Se genero el contrato <b>{contractNumber}</b> con pais{' '}
              <b>{appEnv?.country}</b> y esta listo para ser cobrado
            </div>
          </motion.div>
        )}
      </FormStep>
    </>
  );
};

export default withSpinner(ResumeStep);
