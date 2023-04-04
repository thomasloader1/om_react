
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';

const { NODE_ENV, REACT_APP_API } = process.env;
const isProduction = NODE_ENV === 'production';

const apiTokenIsValid = isProduction
  ? `${REACT_APP_API}/api/tokenIsValid`
    : '/api/tokenIsValid';
  
export const useLogin = async () => {
  const ctx = useContext(AppContext);
      try {
          const apiResponse = await axios.get(
            apiTokenIsValid, { headers: { Authorization: localStorage.getItem('tokenLogin') } }
          );
        const { data } = apiResponse;
        console.log('isLogedIn',data);
          ctx.setIsAuthenticated(true);
      } catch (e) {
          console.log('error isLogedIn',{ e });
          ctx.setIsAuthenticated(false);
      }
};
