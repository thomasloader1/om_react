# Tutorial Venta Presencial

> Este es un documento donde se explican las dudas sobre la implementacion y funcionamiento de la Venta Presencial

## Antes de comenzar

La Venta Presencial funciona y comunica ***`Variables Globales`*** mediante una configuracion previa situada en `src/config/config.js`

Donde las variables mas relevantes del proyecto son `countryOptions`,  `paymentOptions`, `sideItemOptionsVP`

Esta configuracion se comparte mediante un Provider (`src/components/PasarelaCobros/Provider/StateProvider.jsx`) que usa el hook de react `useContext`

Ya teniendo esta base se puede manipular gran parte de la aplicacion para modificar y mostrar resultados segun la nececidad

### Variables Globales
~~~javascript
const [options, setOptions] = useState({
    countryOptions,
    paymentOptions,
    paymentMethodOptions,
    paymentModeOptions,
    sideItemOptionsVP,
    sideItemOptions,
  });

  const [formikValues, setFormikValues] = useState(null);
  const [userInfo, setUserInfo] = useState(userFlow);
  const [stepNumberGlobal, setStepNumberGlobal] = useState(0);
  const [stripeRequest, setStripeRequest] = useState(null);
  const [checkoutLink, setCheckoutLink] = useState('');
  const [appEnv, setAppEnv] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const appRef = useRef(null);
  const formRef = useRef(null);

  return (
    <AppContext.Provider
      value={{
        options,
        setOptions,
        formikValues,
        setFormikValues,
        userInfo,
        setUserInfo,
        stepNumberGlobal,
        setStepNumberGlobal,
        stripeRequest,
        setStripeRequest,
        checkoutLink,
        setCheckoutLink,
        appRef,
        formRef,
        appEnv,
        setAppEnv,
        fetchProfessions,
        professions,
        fetchSpecialties,
        specialties,
        fetchMethods,
        methods,
        products,
        setProducts,
        selectedCourses,
        setSelectedCourses,
      }}
    />
~~~

# Manejando estados de Formik
Formik es una libreria para manipular el comportamiento y la informacion que tiene un formulario, nosotros incorporamos Yup para sumarle validaciones en español cuando un atributo no es valido 

Para poder manipular el estado de formik o mejor dicho usar el objeto de formik se puede hacer lo siguiente:

- Partiendo del componente MultiStep (`src/components/VentaPresencial/Stepper/MultiStep.jsx`) se puede acceder al objeto de Formik mediante un custom hook de la propia libreria (`useFormikContext()`) siempre que el componente sea HIJO / CHILDREN de MultiStep

### Formas de uso
> _Recordar que esto es valido siempre que desde donde se llame __tiene que ser hijo / children de MultiStep__, de lo contrario dispara un warning dicendo que el contexto de formik no esta instanciado o accesible desde donde se requiera._

Como un objeto comun: 

`const formik = useFormikContext()`

Usando destructuring de lo que se necesita:

 `const { values, setFieldValue, ...formik } = useFormikContext()`

 # Funcionamiento de RadioButton
 > Tener en cuenta que cada interaccion con este componente va a modificar o deberia el Estado de la aplicacion (Provider / Contexto)

 El RadioButton que se usa en la Venta Presencial realmente es ButtonField que tambien lo usa la Super Pasarela (`src/components/PasarelaCobros/RadioButton/ButtonField.jsx`) 

 Por lo general, hablando de la aplicacion, se recorren las variables del provider y se le pasan los atributos al componente para que se muestre con las caracteristicas que necesita tener

 Ejemplo partiendo desde `SelectCountryStep.jsx`

 ~~~javascript
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

 const mappingButtons = countryOptions.map(({ ...props }) => (
          <ButtonField
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
        ))
 ~~~

 En este ejemplo se le asignan los valores que tienen las opciones y algunas se harcodean para que se mueste distinto, aca la magia lo hace el `handleClick` que lo que hace es decirle que en el Step especifico le asigna el valor que se clickeo y ademas actualiza otra variable global `userInfo` para almacenar datos mas espeficos que se usan mas adelante para comprobar que metodos de pagos tiene el pais que se selecciono

 Por necesidad de persistir los datos seleccionados en la memoria del navegador se modifican las variables globales haciendo el ***Spread Operator*** para darle todo lo que ya tenia y en caso de que dentro de ese objeto haya un arreglo/objeto se indica explicitamente el nombre del atributo y se asigna con sixtaxis de JSON el valor de ese atributo indicado, tal como muestra el ejemplo dentro de la implementacion del handleClick

 # El uso que se le da a useEffect