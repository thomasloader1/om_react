/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { MdOutlineEditNote } from 'react-icons/md';
import './SideItem.scss';

function SideItem({
  currentStep,
  label,
  status,
  idElement,
  className,
  valueSelected
}) {
  const buttonStatus = {
    current: `card current ${className}`,
    completed: `card completed ${className}`
  };
  const classNameStatus = status !== '' ? `${buttonStatus[status]}` : className;
  // Botón default render
  return (
    <div
      id={`SideItem_${idElement}`}
      data-target={currentStep}
      className={`Side-item ${classNameStatus}`}
    >
      <span className="Side-item-info">
        <div className="numstep">{currentStep}</div>

        <div className="is-flex is-flex-direction-column is-align-items-flex-start">
          <h3 className="subtitle is-uppercase">{!label ? 'Label' : label}</h3>
          <h4 className="title is-5">
            {!valueSelected ? 'Sin seleccionar' : valueSelected}
          </h4>
        </div>
      </span>

      <button
        type="button"
        id={`editStep_${currentStep}`}
        className="button is-ghost"
        aria-label="User Profile"
      >
        <MdOutlineEditNote className="is-size-3" />
      </button>
    </div>
  );
}

SideItem.propTypes = {
  currentStep: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  status: PropTypes.string,
  className: PropTypes.string,
  idElement: PropTypes.string.isRequired,
  valueSelected: PropTypes.string.isRequired
};
SideItem.defaultProps = {
  status: '',
  className: ''
};
export default SideItem;
