import React from 'react';
import PropTypes from 'prop-types';
import { MdQueryBuilder } from 'react-icons/md';

import { Box } from 'react-bulma-components';

const PROFESSION = {
  Medicina: 'medicina',
  Enfermeria: 'enfermeria',
};
function CourseItem({ ...props }) {
  return (
    <>
      <Box className="course">
        <div className="course-selection">
          <input id={props.courseId} type="checkbox" />
        </div>

        <div className="course-content">
          <div className="course-content-header">
            <h4 className={`tags course-profession tags-${props.profession}`}>
              {props.profession}
            </h4>
            <h4 className="course-specialty">{props.specialty}</h4>
            <span className="course-hours is-flex is-align-items-center">
              <MdQueryBuilder />
              {props.hours} <span className="d-desktop">horas</span>
              <span className="d-mobile">hs</span>
            </span>
          </div>
          <label htmlFor={props.courseId} className="course-name">
            <h3>{props.name}</h3>
          </label>
        </div>

        <div className="course-price">
          <h3>${props.price}</h3>
        </div>
      </Box>
    </>
  );
}
CourseItem.propTypes = {
  profession: PropTypes.oneOf(Object.values(PROFESSION)),
};
export default CourseItem;
