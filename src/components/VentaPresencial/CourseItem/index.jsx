import React from 'react';
import { MdQueryBuilder } from 'react-icons/md';
import { Box } from 'react-bulma-components';
import { useField } from 'formik';

function CourseItem({
  profession,
  specialty,
  hours,
  courseId,
  name,
  id,
  title,
  price,
  checked,
  onSelectedCourse,
}) {
  const professionName = profession.map((p) => p.name);
  const specialtyName = Array.isArray(specialty)
    ? specialty.map((s) => s.name)
    : specialty.name;

  const professionClassName = professionName.includes('medicos')
    ? 'medicina'
    : 'enfermeria';

  const [field, meta] = useField({ name, id });

  return (
    <>
      <Box className={`course ${checked ? 'selected' : ''}`} key={courseId}>
        <div className="course-selection">
          <input
            id={courseId}
            type="checkbox"
            checked={checked}
            onClick={() => onSelectedCourse(courseId)}
            {...field}
            {...meta}
          />
        </div>

        <div className="course-content">
          <div className="course-content-header">
            <h4
              className={`tags course-profession tags-${professionClassName}`}
            >
              {professionClassName.includes('medicina')
                ? 'Medicina'
                : 'Enfermeria'}
            </h4>
            <h4 className="course-specialty">{specialtyName}</h4>
            <span className="course-hours is-flex is-align-items-center">
              <MdQueryBuilder />
              {hours} <span className="d-desktop"> horas</span>
              <span className="d-mobile"> hs</span>
            </span>
          </div>
          <label htmlFor={courseId} className="course-name">
            <h3>{title}</h3>
          </label>
        </div>

        <div className="course-price">
          <h3>${price.toLocaleString('es',
            {
              useGrouping: true, minimumIntegerDigits: 1
            })}</h3>
        </div>
      </Box>
    </>
  );
}

export default CourseItem;
