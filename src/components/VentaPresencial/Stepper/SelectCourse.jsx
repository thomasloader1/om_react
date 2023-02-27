import React, { useContext, useState } from 'react';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import CourseItem from '../CourseItem';
import { FormStep } from './MultiStep';
import ReactPaginate from 'react-paginate';
import { useMediaQSmall } from '../Hook/useMediaQuery';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';

const SelectCourseStep = () => {
  const {
    fetchProducts,
    products,
    selectedCourses,
    setSelectedCourses,
    setAppEnv,
  } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [elementsPerPage, setElementsPerPage] = useState(6);
  const isMediaQSmall = useMediaQSmall();

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleSelectCourse = (courseId) => {
    const [courseSelected] = products.filter(
      (product) => product.id === courseId
    );

    const { id, precio, title } = courseSelected;

    const courseIndex = selectedCourses.findIndex(
      (course) => course.id === courseId
    );

    if (courseIndex !== -1) {
      setSelectedCourses((prevState) => {
        const newState = [...prevState];
        newState.splice(courseIndex, 1);

        setAppEnv((prevState) => ({
          ...prevState,
          products: [...newState],
        }));

        return newState;
      });
    } else {
      setSelectedCourses((prevState) => {
        const newState = [
          ...prevState,
          { id, precio, title, quantity: 1, discount: 0 },
        ];
        setAppEnv((prevState) => ({
          ...prevState,
          products: [...newState],
        }));

        return newState;
      });
    }

    setAppEnv((prevState) => ({
      ...prevState,
    }));

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
  let pageCount = products.length / elementsPerPage;

  const isMobile = window.innerWidth < 768 ? 0 : 2;

  return (
    <>
      <FormStep stepNumber={4} stepName="Seleccionar cursos">
        <div className="field searchbar-desktop">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Buscar curso por nombre"
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
                title={product.title}
                price={product.precio}
                onSelectedCourse={handleSelectCourse}
                checked={isChecked}
                name="products"
                id="products"
              />
            );
          })}
        </div>
      </FormStep>
      <ReactPaginate
        previousLabel={
          <button className="button is-primary is-outlined">
            {isMediaQSmall ? <MdArrowLeft /> : 'Anterior'}
          </button>
        }
        nextLabel={
          <button className="button is-primary is-outlined">
            {isMediaQSmall ? <MdArrowRight /> : 'Siguiente'}
          </button>
        }
        breakLabel={<button className="button is-info break-me">...</button>}
        breakClassName={'break-me'}
        previousClassName={'prev'}
        nextClassName={'next'}
        pageCount={Math.ceil(products.length / elementsPerPage)}
        onPageChange={handlePageClick}
        disablePrevButton={currentPage === 0}
        disableNextButton={currentPage === pageCount}
        initialPage={0}
        forcePage={currentPage}
        marginPagesDisplayed={isMobile}
        pageRangeDisplayed={3}
        disableInitialCallback={currentPage > 4}
        containerClassName={'pagination-container'}
        pageClassName={'pagination-item'}
        activeClassName={'is-current'}
      />
    </>
  );
};

export default SelectCourseStep;
