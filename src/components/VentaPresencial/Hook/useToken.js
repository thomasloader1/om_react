import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../../PasarelaCobros/Provider/StateProvider";

const { NODE_ENV, REACT_APP_API } = process.env;
const isProduction = NODE_ENV === 'production';

const apiTokenURL = isProduction
    ? `${REACT_APP_API}/api/tokenIsValid`
    : '/api/tokenIsValid';

const useToken = () => {
    const { setIsAuthenticated, setUser } = useContext(AppContext)

    const setToken = (token) => {
        localStorage.setItem('tokenLogin', token);
    }

    const getTokenFromLS = () => {
        const tokenFromLS = localStorage.getItem('tokenLogin');
        return tokenFromLS

    }

    const validateToken = async () => {
        try {
            const token = getTokenFromLS();

            if (typeof token !== 'undefined' && token != null) {
                const apiResponse = await axios.get(
                    apiTokenURL, { headers: { Authorization: `Bearer ${token}` } }
                );

                const { data } = apiResponse;
                setIsAuthenticated(data.isValid);
                console.log('isLogedIn', { data });
                setUser(data.user)
                return true
            }

        } catch (e) {
            console.log('error isLogedIn', { e });
            setIsAuthenticated(false)
            return false
        }
    }

    return { setToken, getTokenFromLS, validateToken }
}

export default useToken