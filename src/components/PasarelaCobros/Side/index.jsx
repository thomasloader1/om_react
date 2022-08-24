/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Side.scss';
import Button from '../Button';

function Side({ children, sideTitle }) {
  const [completeSteps] = useState(false);

  return (
    <div className="is-4 column side pl-6">
      <h2 className="title is-4">{sideTitle}</h2>
      <div className="side-body">
        {children}
        {completeSteps && (
          <>
            <Button
              className="bigger is-primary is-medium"
              label="Generar pago"
              fullwidth
            />
            <Button
              className="is-primary is-outlined"
              label="Volver"
              fullwidth
            />
          </>
        )}
      </div>
    </div>
  );
}

Side.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  sideTitle: PropTypes.string
};

Side.defaultProps = {
  sideTitle: 'Resumen del pago'
};

export default Side;
