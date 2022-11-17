import { useState, useEffect } from "react"
import qs from 'qs';
import axios from "axios";

const useContractZoho = (contractId) => {
    const [data, setData] = useState(null)
    const body = { key: '9j9fj0Do204==3fja134', id: contractId };
    
    useEffect(() => {
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(body),
            url: 'https://oceanomedicina.com.ar/suscripciontest/remote/obtaindata',
          };
         
          axios(options).then( res => setData(res.data)).catch( err => console.error("useContractZoho",{err}))
    },[contractId])

    return [data]
}

export default useContractZoho