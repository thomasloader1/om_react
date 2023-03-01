import React from 'react';
import PropTypes from 'prop-types';
import { MdOutlineEditNote } from 'react-icons/md';
import './SideItem.scss';
import { useContext } from 'react';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import SideItemCourses from '../SideItemCourses';
import { motion } from 'framer-motion';

function SideItem({
  currentStep,
  label,
  status,
  className,
  valueSelected,
  stepStateNumber,
  formikInstance,
  disableEdit,
}) {
  const variantStyles = {
    open: {
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.5,
      },
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const stepStatus = {
    current: `card current ${className}`,
    completed: `card completed ${className}`,
  };

  const { setStepNumber } = stepStateNumber;
  const {
    options,
    setOptions,
    formikValues,
    setFormikValues,
    userInfo,
    setUserInfo,
    setStepNumberGlobal,
    products,
    selectedCourses,
    setSelectedCourses,
  } = useContext(AppContext);

  const classNameStatus = status !== '' ? `${stepStatus[status]}` : className;
  const titleCurrentStep =
    currentStep > 1 && !valueSelected
      ? 'Sin completar'
      : !valueSelected
      ? 'Sin seleccionar'
      : valueSelected;

  const editStep = (stepNumber) => {
    console.log({ formikInstance, formikValues, stepNumber });

    switch (stepNumber) {
      case 1: {
        const { country, ...rest } = formikInstance.values;

        Object.entries(rest).forEach(([key]) => {
          formikInstance.setFieldValue(key, '');
          formikInstance.setTouched({});
        });

        userInfo.stepFive.value = '';
        userInfo.stepFour.value = '';
        userInfo.stepThree.value = '';
        userInfo.stepTwo.value = '';

        setUserInfo({ ...userInfo });
        setFormikValues({ ...formikInstance.values });

        console.log({ rest, formikInstance, userInfo });
        break;
      }
      case 2: {
        const { country, payment_method, ...rest } = formikInstance.values;

        Object.entries(rest).forEach(([key]) => {
          formikInstance.setFieldValue(key, '');
          formikInstance.setTouched({});
        });

        userInfo.stepFive.value = '';
        userInfo.stepFour.value = '';
        userInfo.stepThree.value = '';

        setUserInfo({ ...userInfo });
        setFormikValues({ ...formikInstance.values });

        console.log({ rest, formikInstance, userInfo });
        break;
      }
      case 3: {
        const { country, payment_method, contractId, mod, quotes, ...rest } =
          formikInstance.values;

        Object.entries(rest).forEach(([key]) => {
          formikInstance.setFieldValue(key, '');
          formikInstance.setTouched({});
        });

        userInfo.stepFive.value = '';
        userInfo.stepFour.value = '';

        setUserInfo({ ...userInfo });
        setFormikValues({ ...formikInstance.values });

        console.log({ rest, formikInstance, userInfo });
        break;
      }
      case 4: {
        const {
          country,
          payment_method,
          contractId,
          mod,
          quotes,
          checkContract,
          ...rest
        } = formikInstance.values;

        Object.entries(rest).forEach(([key]) => {
          formikInstance.setFieldValue(key, '');
          formikInstance.setTouched({});
        });

        userInfo.stepFive.value = '';

        setUserInfo({ ...userInfo });
        setFormikValues({ ...formikInstance.values });

        console.log({ rest, formikInstance, userInfo });
        break;
      }
      default: {
        console.log('default case editStep()');
        break;
      }
    }

    options.sideItemOptionsVP.forEach((stepObject, index) => {
      if (stepNumber === stepObject.step) {
        options.sideItemOptions[stepNumber - 1].status = 'current';
      } else if (stepNumber < stepObject.step) {
        options.sideItemOptions[index].status = '';
        options.sideItemOptions[index].value = '';
      }
    });

    setOptions({ ...options });
    setStepNumber(stepNumber - 1);
    setStepNumberGlobal(stepNumber - 1);
  };

  const handleDeleteCourse = (courseId) => {
    const [courseSelected] = products.filter(
      (product) => product.id === courseId
    );

    const courseIndex = selectedCourses.findIndex(
      (course) => course.id === courseId
    );

    if (courseIndex !== -1) {
      setSelectedCourses((prevState) => {
        prevState.splice(courseIndex, 1);
        return [...prevState];
      });
    } else {
      setSelectedCourses((prevState) => [...prevState, courseSelected]);
    }
  };

  if (currentStep === 4) {
    return (
      <div className="side-body">
        <SideItemCourses
          currentStep={currentStep}
          label="seleccion de cursos"
          status={classNameStatus}
          onDelete={handleDeleteCourse}
          className={classNameStatus}
        />
      </div>
    );
  }

  return (
    <motion.div className={`side-item ${classNameStatus}`}>
      <motion.span className="side-item-info">
        <div className="numstep">{currentStep}</div>

        <motion.div
          className="is-flex is-flex-direction-column is-align-items-flex-start"
          initial={{
            opacity: 0,
            transition: {
              delay: 0.5,
              duration: 0.5,
            },
          }}
          animate={{
            opacity: 1,
            transition: {
              delay: 0.5,
              duration: 0.5,
            },
          }}
        >
          <h3 className="subtitle is-uppercase">{!label ? 'Label' : label}</h3>
          <h4 className="title is-6">{titleCurrentStep}</h4>
        </motion.div>
      </motion.span>

      <button
        type="button"
        id={`editStep_${currentStep}`}
        className="button is-ghost"
        aria-label="User Profile"
        disabled={disableEdit}
      >
        <MdOutlineEditNote
          className="is-size-3"
          onClick={() => {
            if (!disableEdit) {
              editStep(currentStep);
            }
          }}
        />
      </button>
    </motion.div>
  );
}

SideItem.propTypes = {
  currentStep: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  status: PropTypes.string,
  className: PropTypes.string,
  valueSelected: PropTypes.string.isRequired,
};

SideItem.defaultProps = {
  status: '',
  className: '',
};

export default SideItem;
