import axios from "axios"
import { useState, useEffect } from "react"

export const useContractZoho = (contractId) => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const body = new FormData();
  body.append('key', '9j9fj0Do204==3fja134')
  body.append('id', contractId)

  const URL = 'https://oceanomedicina.com.ar/suscripciontest/remote/obtaindata';

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(URL, body, {
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      console.log({ response })
      setData(response.data)
      setLoading(response.data.lenght > 0)
    }

    fetchData()
  }, [])

  return { data, loading, error }
}