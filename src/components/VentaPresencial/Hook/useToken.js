import axios from 'axios';
import { useContext, useState } from 'react';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import { useNavigate } from 'react-router';

const { NODE_ENV, REACT_APP_API } = process.env;
const isProduction = NODE_ENV === 'production';

const apiTokenURL = isProduction
  ? `${REACT_APP_API}/api/tokenIsValid`
  : '/api/tokenIsValid';

const useToken = () => {
  const { setIsAuthenticated, setUser } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const setToken = (token) => {
    localStorage.setItem('tokenLogin', token);
  };

  const getTokenFromLS = () => {
    const tokenFromLS = localStorage.getItem('tokenLogin');
    return tokenFromLS;
  };

  const validateToken = async () => {
    setLoading(true);
    try {
      const token = getTokenFromLS();

      if (typeof token !== 'undefined' && token != null) {
        const apiResponse = await axios.get(apiTokenURL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { data } = apiResponse;
        setIsAuthenticated(data.isValid);
        console.log('isLogedIn', { data });
        setUser(data.user);
        setLoading(false);

        return true;
      } else {
        throw new Error('No token');
      }
    } catch (e) {
      console.log('error isLogedIn', { e });
      setIsAuthenticated(false);
      navigate('/vp/login');
      setLoading(false);

      return false;
    }
  };

  return { setToken, getTokenFromLS, validateToken, loading };
};

export default useToken;
