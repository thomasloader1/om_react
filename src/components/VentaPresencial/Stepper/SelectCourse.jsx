import { useFormikContext } from 'formik';
import React, { useContext } from 'react';
import { useParams } from 'react-router';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import CourseItem from '../CourseItem';
import { FormStep } from './MultiStep';
import Pagination from 'react-paginate';

const SelectCourseStep = () => {
  const { fetchProducts, products } = useContext(AppContext);
  const { id } = useParams();
  const formik = useFormikContext();

  const [currentPage, setCurrentPage] = React.useState(0);
  const [elementsPerPage, setElementsPerPage] = React.useState(10);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const elementsToShow = products.slice(
    currentPage * elementsPerPage,
    (currentPage + 1) * elementsPerPage
  );

  return (
    <>
      <FormStep stepNumber={3} stepName="Seleccion de Curso">
        <div id="medModPago_grid" className={'courses-grid'}>
          {elementsToShow.map((product) => (
            <CourseItem
              key={product.id}
              profession={product.tags}
              specialty={product.area}
              hours={product.horas}
              courseId={product.id}
              name={product.title}
              price={product.precio}
            />
          ))}
        </div>
      </FormStep>
      <Pagination
        pageCount={Math.ceil(products.length / elementsPerPage)}
        onPageChange={handlePageClick}
        initialPage={0}
        forcePage={currentPage}
      />
    </>
  );
};

export default SelectCourseStep;
