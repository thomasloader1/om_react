import { useEffect, useState } from 'react';

const useStripeEnv = (country) => {
  const [fetching, setFetching] = useState(true)
  const [pk, setPk] = useState('')
  //const { formikValues } = useContext(AppContext);
  const {
    NODE_ENV,
    REACT_APP_STRIPE_PK_TEST_OM,
    REACT_APP_STRIPE_PK_TEST_MX,
    REACT_APP_STRIPE_PK_PROD_OM,
    REACT_APP_STRIPE_PK_PROD_MX,
  } = process.env;

  const stripeInit = (country) => {
    const isMX = country === 'México'

    if (NODE_ENV === 'development') {
      const publicTestKey = isMX ? REACT_APP_STRIPE_PK_TEST_MX : REACT_APP_STRIPE_PK_TEST_OM
      console.log({ publicTestKey, country, isMX });

      setPk(publicTestKey);
      setFetching(false)

    } else {

      const publicProdKey = isMX ? REACT_APP_STRIPE_PK_PROD_MX : REACT_APP_STRIPE_PK_PROD_OM;
      setPk(publicProdKey);
      setFetching(false)
    }
  }


  useEffect(() => {
    function setting() {
      const isCountryString = (typeof country !== 'undefined' || country != null) || typeof country === 'string'

      if (isCountryString) {
        stripeInit(country)
      }
    }
    setting()
  }, [country])

  return { fetching, pk }

};

export default useStripeEnv;
