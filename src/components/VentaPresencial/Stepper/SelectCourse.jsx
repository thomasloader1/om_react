import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import CourseItem from '../CourseItem';
import { FormStep } from './MultiStep';
import ReactPaginate from 'react-paginate';
import { useIsoCodes } from '../Hook/useIsoCodes';
import { useProducts } from '../Hook/useProducts';
import { useFormikContext } from 'formik';
import MotionSpinner from '../../PasarelaCobros/Spinner/MotionSpinner';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import withSpinner from '../Hoc/withSpinner';

const { NODE_ENV, REACT_APP_API } = process.env;
const isProduction = NODE_ENV === 'production';

const apiProducts = isProduction
  ? `${REACT_APP_API}/api/products/`
  : '/api/products/';

const SelectCourseStep = () => {
  const isMobile = window.innerWidth < 768;
  const marginPagesDisplayed = isMobile ? 0 : 2;

  const formik = useFormikContext();
  const { getIsoCodeFromSide } = useIsoCodes(formik.values?.country);
  const { iso } = getIsoCodeFromSide();
  const countryParam = iso != null ? iso.toLowerCase() : 'cl';
  const { fetching, products } = useProducts(
    `${apiProducts}${countryParam}`,
    formik.values?.country
  );

  const {
    toggleSelectedCourses,
    expandSelectCourses,
    selectedCourses,
    setSelectedCourses,
    appEnv,
    setAppEnv,
  } = useContext(AppContext);
  const elementsRenderPerMQ = isMobile ? 10 : 6;

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [elementsPerPage] = useState(elementsRenderPerMQ);

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
        newState.splice(courseIndex, 1).filter(Boolean);

        setAppEnv((prevState) => ({
          ...prevState,
          products: [...newState],
        }));

        formik.values.products = newState;

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

        formik.values.products = newState;

        return newState;
      });
    }

    // console.log({ courseIndex, courseId, FormikValues: formik.values, selectedCourses })

    setAppEnv((prevState) => ({
      ...prevState,
    }));
  };

  const handleSelectCourseGift = (courseId) => {
    const [courseSelected] = products.filter(
      (product) => product.product_code === courseId
    );

    const courseIndex = selectedCourses.findIndex(
      (course) => course.product_code === courseId
    );

    console.log({
      courseSelected,
      selectedCourse: selectedCourses[courseIndex],
    });
    const { price } = courseSelected;

    selectedCourses[courseIndex].gift = !selectedCourses[courseIndex].gift;
    selectedCourses[courseIndex].price = selectedCourses[courseIndex].gift
      ? 0
      : price;

    console.log({ selectedCourses });

    setSelectedCourses((prevState) => {
      const newState = [...prevState];

      setAppEnv((prevState) => ({
        ...prevState,
        products: [...newState],
      }));

      formik.values.products = newState;

      return newState;
    });
  };

  const productsWithPrice = products.filter((product) => product.price !== 0);

  const filteredProducts = productsWithPrice.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const elementsToShow = filteredProducts
    .filter(Boolean)
    .slice(currentPage * elementsPerPage, (currentPage + 1) * elementsPerPage);

  const previousLabel = isMobile ? (
    <button className="button is-primary is-inverted is-small">
      <IoMdArrowDropleft />
    </button>
  ) : (
    <button className="button is-primary">Anterior</button>
  );

  const nextLabel = isMobile ? (
    <button className="button is-primary is-inverted is-small">
      <IoMdArrowDropright />
    </button>
  ) : (
    <button className="button is-primary">Siguiente</button>
  );

  useEffect(() => {
    if (appEnv.products != null && typeof appEnv.products !== 'undefined') {
      setSelectedCourses(appEnv.products);
      formik.setFieldValue('products', appEnv.products);
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
            {isMobile && !expandSelectCourses ? (
              <div
                className="is-flex is-justify-content-space-between is-align-items-center"
                style={{
                  fontSize: '11px',
                  marginTop: '-0.25rem',
                  marginBottom: '0.75rem',
                }}
              >
                <p className="" style={{ fontSize: '11px' }}>
                  {selectedCourses.length}
                  {selectedCourses.length === 0 || selectedCourses.length >= 1
                    ? ' cursos seleccionados'
                    : ' curso seleccionado'}
                </p>
                <div
                  className="has-text-primary is-uppercase"
                  style={{ fontSize: '11px' }}
                  onClick={toggleSelectedCourses}
                >
                  {selectedCourses.length > 0 ? 'ver selección' : ''}
                </div>
              </div>
            ) : (
              ''
            )}
            <div
              className="field"
              style={{
                zIndex: expandSelectCourses ? 10 : '',
                display: isMobile && !expandSelectCourses ? 'none' : 'block',
                marginBottom: isMobile && expandSelectCourses ? '0.5rem' : '0',
              }}
            >
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
            <div
              id="medModPago_grid"
              className={'courses-grid'}
              style={{
                zIndex: isMobile && expandSelectCourses ? '2' : '',
              }}
            >
              {elementsToShow.map((product) => {
                const isChecked = selectedCourses
                  .filter(Boolean)
                  .some((course) => {
                    return product.product_code === Number(course.product_code);
                  });

                const isGift = selectedCourses
                  .filter(Boolean)
                  .some((course) => {
                    return (
                      product.product_code === Number(course.product_code) &&
                      Boolean(product?.gift)
                    );
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
                    onSelectedCourseGift={handleSelectCourseGift}
                    checked={isChecked}
                    gift={isGift}
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
            breakLabel={
              <button className="button is-info break-me">...</button>
            }
            breakClassName={'break-me'}
            pageCount={Math.ceil(filteredProducts.length / elementsPerPage)}
            onPageChange={handlePageClick}
            initialPage={0}
            forcePage={currentPage}
            marginPagesDisplayed={marginPagesDisplayed}
            pageRangeDisplayed={3}
            containerClassName={'pagination-container'}
            pageClassName={'pagination-item'}
            activeClassName={'is-current is-primary'}
          />
          {/* <pre>{JSON.stringify(formik.values, null, 2)}</pre> */}
        </>
      )}
    </>
  );
};

export default withSpinner(SelectCourseStep);
