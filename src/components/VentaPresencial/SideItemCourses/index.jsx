/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import {
  MdOutlineEditNote,
  MdDeleteOutline,
} from 'react-icons/md';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import { Box } from 'react-bulma-components';

function SideItemCourses({ currentStep, label, status, onDelete, className }) {
  const { selectedCourses, appEnv, stepNumberGlobal, expandSelectedCourses } =
    useContext(AppContext);
  const [totalPrice, setTotalPrice] = useState(0);

  const selectionCourses = stepNumberGlobal === 3 && selectedCourses.length > 0;
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    if (selectedCourses.length > 0) {
      if (appEnv.products != null && typeof appEnv.products !== 'undefined') {
        const totalAmout = selectedCourses.filter(Boolean).reduce(
          (acc, current) => acc + Number(current.price),
          0
        );
        setTotalPrice(totalAmout);
      } else {
        setTotalPrice(0);
      }
    }
  }, [selectedCourses]);

  // console.log({ selectedCourses })

  return (
    <>
      <div
        className={`side-item courses ${selectionCourses ? 'selection' : ''
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
      <div
        className={`side-item-courses ${isMobile &&
          (expandSelectedCourses && selectedCourses.length > 0
            ? 'is-flex'
            : 'hidden')
          } `}
      >
        <ul className="side-item-courses-list">
          {selectedCourses.filter(Boolean).map((course) =>

            isMobile ? (
              <Box
                className={`course `}
                key={`box_${course.product_code}`}
                style={{ position: 'relative' }}
              >
                <div className="course-content">
                  <label htmlFor={course.product_code} className="course-name">
                    <h3>{course.title}</h3>
                  </label>
                </div>

                <div className="course-price">
                  <h3>${course.price.toLocaleString('es',
                    {
                      useGrouping: true, minimumIntegerDigits: 1
                    })}</h3>
                  <MdDeleteOutline
                    className="is-size-3 delete-selection"
                    onClick={() => onDelete(course.product_code)}
                  />
                </div>
              </Box>
            ) : (
              <li
                key={`li_${course.product_code}`}
                className="side-item-courses-selected is-justify-content-space-between"
              >
                <span id={course.product_code} style={{ display: 'none' }}>
                  {course.price.toLocaleString('es',
                    {
                      useGrouping: true, minimumIntegerDigits: 1
                    })}
                </span>
                <h4>{course.title}</h4>
                <button
                  type="button"
                  className="button is-ghost"
                  aria-label="Eliminar curso"
                  onClick={() => onDelete(course.product_code)}
                >
                  <MdDeleteOutline className="is-size-3" />
                </button>
              </li>
            )

          )}
        </ul>
        <div className="side-item-courses-total">
          <span>COSTO TOTAL</span>
          <h3>${totalPrice.toLocaleString('es',
            {
              useGrouping: true, minimumIntegerDigits: 1
            })}</h3>
        </div>
      </div>
    </>
  );
}

export default SideItemCourses;
