import { loadStripe } from "@stripe/stripe-js";
import { useContext } from "react";
import { AppContext } from "../Provider/StateProvider";

const useStripeEnv = () => {
    const { formikValues } = useContext(AppContext)
    const { REACT_APP_ENV, REACT_APP_STRIPE_PK_TEST_OM, REACT_APP_STRIPE_PK_TEST_MX, REACT_APP_STRIPE_PK_PROD_OM, REACT_APP_STRIPE_PK_PROD_MX } = process.env
   
    console.log({REACT_APP_ENV})
    if(REACT_APP_ENV === "test"){
        const publicTestKey = formikValues.country !== "Mexico" ? REACT_APP_STRIPE_PK_TEST_OM  : REACT_APP_STRIPE_PK_TEST_MX
        const stripePromise = loadStripe(publicTestKey);
        console.log({publicTestKey, stripePromise})
        return { stripePromise }
    }else{
        const publicProdKey = formikValues.country !== "Mexico" ? REACT_APP_STRIPE_PK_PROD_OM  : REACT_APP_STRIPE_PK_PROD_MX
        const stripePromise = loadStripe(publicProdKey);
        console.log({publicProdKey, stripePromise})
        return { stripePromise }
    }

}

export default useStripeEnv