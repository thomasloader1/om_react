import { useFormikContext } from 'formik';
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import ButtonField from '../../PasarelaCobros/RadioButton/ButtonField';
import { FormStep } from './MultiStep';
import { motion } from 'framer-motion';
import axios from 'axios';

const visibilityVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};
const itemVisibilityVariant = {
  hidden: { y: 4, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const hacerLlamadaAxios = (tokenLogin) => {
  console.log("llamando al progress que requiere auntenticacion, este el el token: ", tokenLogin)
  axios.get('http://localhost:8000/api/progress/16',
        { headers: { Authorization: tokenLogin } }
      )
    .then(response => {
      // Manejar la respuesta de la llamada Axios
      console.log("hacerLlamadaAxios, exito")
    })
    .catch(error => {
      // Manejar el error de la llamada Axios
      console.log("hacerLlamadaAxios, error: ",error)
      
    });
}
function SelectCountryStep() {
  const { options, setOptions, userInfo, setUserInfo, formikValues, appEnv } =
    useContext(AppContext);
  const { countryOptions, sideItemOptionsVP } = options;
  const { stepOne } = userInfo;
  const { setFieldValue, ...formik } = useFormikContext();
  const { tokenLogin } = useContext(AppContext);

  useEffect(() => {
    if (
      appEnv != null &&
      appEnv?.country !== null &&
      formikValues?.country !== null
    ) {
      setFieldValue('country', appEnv.country);
      //console.log({ formik });
    }
  }, [appEnv?.country, formikValues?.country]);

  const handleClick = (propsOfContryOptions) => {
    const { value, idElement } = propsOfContryOptions;
    sideItemOptionsVP[0].value = value;
    stepOne.isoRef = idElement;
    stepOne.value = value;

    setOptions({
      ...options,
      sideItemOptionsVP: [...sideItemOptionsVP],
    });

    setUserInfo({
      ...userInfo,
    });
  };

  return (
    <FormStep stepNumber={1} stepName="Selecciona un país">
      <motion.div
        variants={visibilityVariants}
        initial="hidden"
        animate="visible"
        id="pais-grid"
        className="grid-country"
      >
        {countryOptions.map(({ ...props }) => (
          <ButtonField
            variants={visibilityVariants}
            initial="hidden"
            animate="visible"
            {...props}
            className={`grid-country-item button ${
              props.value === stepOne.value && 'active'
            }`}
            showText={true}
            id={props.idElement}
            name="country"
            key={props.idElement}
            onClick={() => {
              handleClick(props);
            }}
          />
        ))}

        <button onClick={hacerLlamadaAxios(tokenLogin)}>Hacer llamada Axios</button>

      </motion.div>
    </FormStep>
  );
}

export default SelectCountryStep;
