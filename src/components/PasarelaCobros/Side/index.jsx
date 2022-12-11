/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import './Side.scss';
import Button from '../Button';
import SideItem from '../SideItem';

function Side({ options, sideTitle, stepStateNumber, formikInstance }) {
  const [completeSteps] = useState(false);

  return (
    <div className="is-4 column side pl-6">
      <h2 className="title is-4">{sideTitle}</h2>
      <div className="side-body">
        {options.map(
          ({ step, label, status, value }) => (
            <SideItem
              key={step}
              currentStep={step}
              label={label}
              status={status}
              valueSelected={value}
              stepStateNumber={stepStateNumber}
              formikInstance={formikInstance}
            />
          )
        )}

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

Side.defaultProps = {
  sideTitle: 'Resumen del pago'
};

export default Side;
