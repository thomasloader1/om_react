import React, { useContext, useEffect, useState } from 'react';
import { MdOutlineEditNote, MdDeleteOutline } from 'react-icons/md';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';

function SideItemCourses({ currentStep, label, status, onDelete, className }) {
  const { selectedCourses, appEnv, stepNumberGlobal } = useContext(AppContext);
  const [totalPrice, setTotalPrice] = useState(0);

  const selectionCourses = stepNumberGlobal === 5 && selectedCourses.length > 0;

  useEffect(() => {
    if (selectedCourses.length > 0) {
      if (appEnv.products != null && typeof appEnv.products !== 'undefined') {
        const totalAmout = selectedCourses.reduce(
          (acc, current) => acc + Number(current.price),
          0
        );
        setTotalPrice(totalAmout);
      } else {
        setTotalPrice(0);
      }
    }
  }, [selectedCourses]);

  return (
    <>
      <div
        className={`side-item courses ${
          selectionCourses ? 'selection' : ''
        }  ${className}`}
      >
        <span className="side-item-info">
          <div className="numstep">{currentStep}</div>

          <div className="is-flex is-flex-direction-column is-align-items-flex-start">
            <h3 className="subtitle is-uppercase">
              {!label ? 'Label' : label}
            </h3>
            <h4 className="title is-6">
              {selectedCourses.length} cursos seleccionados
            </h4>
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
          {selectedCourses.map((course) => (
            <li key={course.id} className="side-item-courses-selected">
              <span id={course.id} style={{ display: 'none' }}>
                {course.price}
              </span>
              <h4>{course.title}</h4>
              <button
                type="button"
                className="button is-ghost"
                aria-label="Eliminar curso"
                onClick={() => onDelete(course.id)}
              >
                <MdDeleteOutline className="is-size-3" />
              </button>
            </li>
          ))}
        </ul>
        <div className="side-item-courses-total">
          <span>COSTO TOTAL</span>
          <h3>${totalPrice}</h3>
        </div>
      </div>
    </>
  );
}

export default SideItemCourses;
