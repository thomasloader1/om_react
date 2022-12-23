import React from 'react';
import { MdOutlineEditNote, MdDeleteOutline } from 'react-icons/md';
import './SideItem.scss';

function SideItemCourses({
  currentStep,
  label,
  status,
  className,
  courseId,
  courseSelected,
  individualCost,
  totalCost
}) {
  const stepStatus = {
    current: `card current ${className}`,
    selection: `card current selection ${className}`,
    completed: `card completed ${className}`
  };
  const classNameStatus = status !== '' ? `${stepStatus[status]}` : className;

  return (
    <>
      <div className={`side-item courses ${classNameStatus}`}>
        <span className="side-item-info">
          <div className="numstep">{currentStep}</div>

          <div className="is-flex is-flex-direction-column is-align-items-flex-start">
            <h3 className="subtitle is-uppercase">
              {!label ? 'Label' : label}
            </h3>
            <h4 className="title is-6">X cursos seleccionados</h4>
          </div>
        </span>

        <button
          type="button"
          id={`editStep_${currentStep}`}
          className="button is-ghost"
          aria-label="Editar paso"
        >
          <MdOutlineEditNote className="is-size-3" />
        </button>
      </div>
      <div className="side-item-courses">
        <ul className="side-item-courses-list">
          <li className="side-item-courses-selected">
            <span id={courseId} style={{ display: 'none' }}>
              {individualCost}
            </span>
            <h4>{courseSelected}</h4>
            <button
              type="button"
              className="button is-ghost"
              aria-label="Eliminar curso"
            >
              <MdDeleteOutline className="is-size-3" />
            </button>
          </li>
          <li className="side-item-courses-selected">
            <span id={courseId} style={{ display: 'none' }}>
              {individualCost}
            </span>
            <h4>{courseSelected}</h4>
            <button
              type="button"
              className="button is-ghost"
              aria-label="Eliminar curso"
            >
              <MdDeleteOutline className="is-size-3" />
            </button>
          </li>
        </ul>
        <div className="side-item-courses-total">
          <span>COSTO TOTAL</span>
          <h3>${totalCost}</h3>
        </div>
      </div>
    </>
  );
}

export default SideItemCourses;
