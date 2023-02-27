import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import CourseItem from '../CourseItem';
import { FormStep } from './MultiStep';
import ReactPaginate from 'react-paginate';
import { useMediaQSmall } from '../Hook/useMediaQuery';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';
import { useIsoCodes } from '../Hook/useIsoCodes';
import { useProducts } from '../Hook/useProducts';
import { useFormikContext } from 'formik';
import MotionSpinner from '../../PasarelaCobros/Spinner/MotionSpinner';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

const { NODE_ENV, REACT_APP_API } = process.env;
const isProduction = NODE_ENV === 'production';

const apiProducts = isProduction
  ? `${REACT_APP_API}/api/products/`
  : '/api/products/';

const SelectCourseStep = () => {
  const formik = useFormikContext();
  const { getIsoCodeFromSide } = useIsoCodes(formik.values?.country);
  const { iso } = getIsoCodeFromSide();
  const countryParam = iso != null ? iso.toLowerCase() : 'cl';

  const { fetching, products } = useProducts(
    `${apiProducts}${countryParam}`,
    formik.values?.country
  );
  // console.log({ iso }, { fetching, products });

  const { selectedCourses, setSelectedCourses, appEnv, setAppEnv } =
    useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [elementsPerPage, setElementsPerPage] = useState(6);
  const isMediaQSmall = useMediaQSmall();

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleSelectCourse = (courseId) => {
    const [courseSelected] = products.filter(
      (product) => product.product_code === courseId
    );

    const { product_code, price, title } = courseSelected;

    const courseIndex = selectedCourses.findIndex(
      (course) => course.product_code === courseId
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
          { product_code, price, title, quantity: 1, discount: 0 },
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

    // console.log({ selectedCourses });
  };

  const productsWithPrice = products.filter((product) => product.price !== 0);

  const filteredProducts = productsWithPrice.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const elementsToShow = filteredProducts.slice(
    currentPage * elementsPerPage,
    (currentPage + 1) * elementsPerPage
  );
  let pageCount = products.length / elementsPerPage;
  const isMobile = window.innerWidth < 768;
  const marginPagesDisplayed = isMobile ? 0 : 2;
  const previousLabel = isMobile ? (
    <button className="button is-primary">
      <AiOutlineArrowLeft />
    </button>
  ) : (
    <button className="button is-primary">Anterior</button>
  );

  const nextLabel = isMobile ? (
    <button className="button is-primary">
      <AiOutlineArrowRight />
    </button>
  ) : (
    <button className="button is-primary">Siguiente</button>
  );

  useEffect(() => {
    if (appEnv.products != null && typeof appEnv.products !== 'undefined') {
      setSelectedCourses(appEnv.products);
    }

    return () => null;
  }, []);

  return (
    <>
      {fetching ? (
        <MotionSpinner text="Solicitando productos" viewHeight="50vh" />
      ) : (
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
                const isChecked = selectedCourses.some((course) => {
                  return product.product_code === Number(course.product_code);
                });

                return (
                  <CourseItem
                    key={product.product_code}
                    profession={product.tags}
                    specialty={product.area}
                    hours={product.horas}
                    courseId={product.product_code}
                    title={product.title}
                    price={product.price}
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
            previousLabel={previousLabel}
            nextLabel={nextLabel}
            previousClassName={'prev'}
            nextClassName={'next'}
            breakLabel={
              <button className="button is-info break-me">...</button>
            }
            breakClassName={'break-me'}
            pageCount={Math.ceil(products.length / elementsPerPage)}
            onPageChange={handlePageClick}
            initialPage={0}
            forcePage={currentPage}
            marginPagesDisplayed={marginPagesDisplayed}
            pageRangeDisplayed={3}
            containerClassName={'pagination-container'}
            pageClassName={'pagination-item'}
            activeClassName={'is-current'}
          />
        </>
      )}
    </>
  );
};

export default SelectCourseStep;
