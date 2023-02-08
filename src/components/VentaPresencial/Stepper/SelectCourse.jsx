import React, { useContext, useState } from 'react';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import CourseItem from '../CourseItem';
import { FormStep } from './MultiStep';
import ReactPaginate from 'react-paginate';

const SelectCourseStep = () => {
  const { fetchProducts, products, selectedCourses, setSelectedCourses } =
    useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [elementsPerPage, setElementsPerPage] = useState(3);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleSelectCourse = (courseId) => {
    const [courseSelected] = products.filter(
      (product) => product.id === courseId
    );
console.log({courseSelected})
    const {id,precio} = courseSelected

    const courseIndex = selectedCourses.findIndex(
      (course) => course.id === courseId
    );

    if (courseIndex !== -1) {
      setSelectedCourses((prevState) => {
        prevState.splice(courseIndex, 1);

        return [...prevState];
      });
    } else {
      setSelectedCourses((prevState) => [...prevState, {id,precio,quantity: 1,discount: 0}]);
    }

    console.log({ selectedCourses });
  };
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
          {elementsToShow.map((product) => {
            const isChecked = selectedCourses.some(
              (course) => product.id === course.id
            );

            return (
              <CourseItem
                key={product.id}
                profession={product.tags}
                specialty={product.area}
                hours={product.horas}
                courseId={product.id}
                name={product.title}
                price={product.precio}
                onSelectedCourse={handleSelectCourse}
                checked={isChecked}
              />
            );
          })}
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
