/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import './StepPasarelaCobros.scss';
import IMAGES from '../../img/pasarelaCobros/share'

function StepPasarelaCobros({ idElement, idBtnElement, srcImg, altImg, title }) {

  return (
    <div id="seleccion_pais" class="pasarela-1 seleccion-pais invisible">
    <h2 class="title is-4"><img src="{{ asset('img/icon/paso-1.svg') }}" alt=""> Seleccione país
    </h2>
    <div id="pais-grid" class="gridCuartos">
      {{-- EJEMPLO PAIS
         <label id="pais_arg_label" for="pais_arg" class="gridCuartos-item button is-outlined"><input id="pais_arg"
          class="paisSelect" type="radio" name="pais" value="Argentina"><img
          src="img/country-flags/argentina.svg">
        <h4 class="paisSelect_title">Argentina</h4>
      </label> --}}

    </div>
  </div>
  );
}

StepPasarelaCobros.propTypes = {
   idElement: PropTypes.string.isRequired,
   idBtnElement: PropTypes.string.isRequired,
   title: PropTypes.string.isRequired,
   srcImg: PropTypes.string.isRequired,
   altImg: PropTypes.string.isRequired,
};


export default StepPasarelaCobros;
