/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import axios from 'axios';

export const getContractCRM = (soNumber = '2000339000483253046') => {

    const request = axios.get(`https://oceanomedicina.net/laravel-foclis/zoho/test/contrato/${soNumber}`);
    const contractData = request.then( res => res.data ).catch( err => console.error({err}))
    return contractData
  }