/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import './LabelPayment.scss';
//  import IMAGES from '../../../img/pasarelaCobros/share'


function LabelPayment({ title, image, idInputElement, className }) {
  return (
    <label htmlFor={idInputElement} className="gridCuartos-item button is-outlined">
      <input
        className={className}
        type="radio"
        name="metPago"
        id={idInputElement}
        value={title}
      />
      <img
        src={image}
        alt={title}
      />
    </label>
  )
}

LabelPayment.propTypes = {
  idInputElement: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};


export default LabelPayment;
