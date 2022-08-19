/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import './LabelCountry.scss';
import IMAGES from '../../../img/pasarelaCobros/share'

function LabelCountry({ idElement, flag, title }) {

  return (
    <label id={idElement} htmlFor='pais_arg' className='gridCuartos-item button is-outlined'>
      <input id='pais_arg' className='paisSelect' type='radio' name='pais' value={title} />
      <img src={IMAGES[flag]} alt={title} />
      <h4 className='paisSelect_title'>{title}</h4>
    </label>
  );
}

LabelCountry.propTypes = {
  idElement: PropTypes.string.isRequired,
  flag: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default LabelCountry;
