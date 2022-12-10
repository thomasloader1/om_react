import axios from "axios"
import { useState, useEffect } from "react"

const { REACT_APP_OCEANO_OBTAINDATA, NODE_ENV } = process.env

export const useContractZoho = (contractId) => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const body = new FormData();
  body.append('key', '9j9fj0Do204==3fja134')
  body.append('id', contractId)
//https://oceanomedicina.com.ar/suscripciontest/remote/obtaindata
  const URL = NODE_ENV === "production" ? REACT_APP_OCEANO_OBTAINDATA : '/proxy/proxy2.php?url=https://oceanomedicina.com.ar/suscripciontest/remote/obtaindata' ;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(URL, {
        method: 'POST',
        body
      })
      const data = await response.json()
      console.log({ data })
        
      setData(data)
      setLoading(data.lenght > 0)
      /* await axios.post(URL, body, {
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }) */
      // console.log({ response, data })

    }

    fetchData()
  }, [])

  return { data, loading, error }
}