import { useFormikContext } from 'formik';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import CourseItem from '../CourseItem';
import { FormStep } from './MultiStep';
import ReactPaginate from 'react-paginate';

const SelectCourseStep = () => {
  const { fetchProducts, products, setSelectedCourses } =
    useContext(AppContext);
  const { id } = useParams();
  const formik = useFormikContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [elementsPerPage, setElementsPerPage] = useState(3);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleSelectCourse = () => {};

  const productsWithPrice = products.filter((product) => product.precio !== 0);

  const filteredProducts = productsWithPrice.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const elementsToShow = filteredProducts.slice(
    currentPage * elementsPerPage,
    (currentPage + 1) * elementsPerPage
  );

  return (
    <>
      <FormStep stepNumber={3} stepName="Seleccion de Curso">
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Buscar producto por nombre"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
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
              onSelectedCourse={handleSelectCourse}
            />
          ))}
        </div>
      </FormStep>
      <ReactPaginate
        previousLabel={<button className="button is-primary">Anterior</button>}
        nextLabel={<button className="button is-primary">Siguente</button>}
        breakLabel={<button className="button is-info break-me">...</button>}
        breakClassName={'break-me'}
        pageCount={Math.ceil(products.length / elementsPerPage)}
        onPageChange={handlePageClick}
        initialPage={0}
        forcePage={currentPage}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        containerClassName={'pagination-container'}
        pageClassName={'pagination-item'}
        activeClassName={'is-current'}
      />
    </>
  );
};

export default SelectCourseStep;
