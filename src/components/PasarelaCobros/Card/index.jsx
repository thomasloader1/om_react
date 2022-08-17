/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import './Card.scss';
import IMAGES from '../../../img/pasarelaCobros/share'

function Card({ idElement, idBtnElement, srcImg, altImg, title }) {

  return (
    <div id={idElement} className="cardAsesor asesor-comerical">
      <div className="cardAsesor-img-overlay">
        <div className="overlay-color" />

        <picture>
          <source type="image/jpg" media="(max-width: 1920px)" srcSet={IMAGES[srcImg]} />
          <img src={IMAGES[srcImg]} alt={altImg} />
        </picture>

      </div>
      <h4 className="cardAsesor-title">{title}</h4>
      <button type='button' id={idBtnElement} className="button is-primary is-medium">Comenzar</button>
    </div>
  );
}

Card.propTypes = {
  idElement: PropTypes.string.isRequired,
  idBtnElement: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  srcImg: PropTypes.string.isRequired,
  altImg: PropTypes.string.isRequired,
};


export default Card;
