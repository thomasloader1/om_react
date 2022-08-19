/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Primary UI component for user interaction
 */
function Card({ backgroundColor, size, title }) {
  return (
    <div className="card" style={{ width: size, backgroundColor }}>
      <div className="card-image">
        <figure className="image is-4by3">
          <img
            src="https://ar.oceanomedicina.tech/wp-content/uploads/2020/02/fotosecundaria-7.webp"
            alt=""
          />
        </figure>
      </div>

      <div className="card-content">
        <span className="tag is-link">Link</span>
        <div className="content">
          <p className="title is-4">{title}</p>
        </div>
      </div>

      <div className="card-info-footer">
        <p className="card-footer-item">
          <span>12 cuotas de $25</span>
        </p>
        <button
          type="button"
          className="button is-danger is-fullwidth card-footer-item"
        >
          Descubrir
        </button>
      </div>
    </div>
  );
}

Card.propTypes = {
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['20rem', '40rem', 'auto']),
  /**
   * Button contents
   */
  title: PropTypes.string.isRequired
};

Card.defaultProps = {
  backgroundColor: '#FFF',
  size: '20rem'
};

export default Card;
