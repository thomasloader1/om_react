/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import axios from 'axios';
import qs from 'qs';
import { fireToast } from './useSwal';
// proxy https://oceanomedicina.net/proxy/proxy2.php?url=
export const getContractCRM = async (soNumber) => {
  const data = { key: '9j9fj0Do204==3fja134', id: soNumber };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data),
    url: 'https://oceanomedicina.com.ar/suscripciontest/remote/obtaindata',
  };
  console.log({ soNumber })
  const request = axios(options);
  const contractData = await request.then(res => res.data).catch(err => {
    fireToast("Error en la peticion")
    console.error({ err })
  })

  localStorage.setItem("contract", JSON.stringify(contractData));

  return contractData
}