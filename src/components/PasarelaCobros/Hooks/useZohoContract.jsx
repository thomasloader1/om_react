/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */

import { useContext } from 'react';
import axios from 'axios';
import qs from 'qs';
import { fireToast } from './useSwal';
import { AppContext } from '../Provider/StateProvider';
// proxy https://oceanomedicina.net/proxy/proxy2.php?url=
export const useContractCRM = async (soNumber) => {
  const [state, setState] = useContext(AppContext);
  const data = { key: '9j9fj0Do204==3fja134', id: soNumber };
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data),
    url: 'https://oceanomedicina.com.ar/suscripciontest/remote/obtaindata',
  };
 // console.log({ soNumber })
  try{
    const resp = axios(options);
    let { data } = resp
    return data
  }catch(err){
    console.error({err})
  }
 /*  const contractData = await request.then(res => res.data).catch(err => {
    fireToast("Error en la peticion")
    console.error({ err })
  }) */

 // localStorage.setItem("contract", JSON.stringify(contractData));

  //return contractData
}