import React from 'react';
import { MdQueryBuilder } from 'react-icons/md';

import { Box } from 'react-bulma-components';

function CourseItem({ profession, specialty, hours, courseId, name, price }) {
  console.log({ profession, specialty, hours, courseId, name, price });

  const professionName = profession.map((p) => p.name);
  const specialtyName = Array.isArray(specialty)
    ? specialty.map((s) => s.name)
    : specialty.name;
  return (
    <>
      <Box className="course" key={courseId}>
        <div className="course-selection">
          <input id={courseId} type="checkbox" />
        </div>

        <div className="course-content">
          <div className="course-content-header">
            <h4 className={`tags course-profession tags-${professionName}`}>
              {professionName}
            </h4>
            <h4 className="course-specialty">{specialtyName}</h4>
            <span className="course-hours is-flex is-align-items-center">
              <MdQueryBuilder />
              {hours} horas
            </span>
          </div>
          <label htmlFor={courseId} className="course-name">
            <h3>{name}</h3>
          </label>
        </div>

        <div className="course-price">
          <h3>${price}</h3>
        </div>
      </Box>
    </>
  );
}

export default CourseItem;
