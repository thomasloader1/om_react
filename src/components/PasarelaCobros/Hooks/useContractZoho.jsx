import axios from "axios"
import { useState, useEffect } from "react"

const { REACT_APP_OCEANO_URL, REACT_APP_OCEANO_OBTAINDATA, NODE_ENV } = process.env

export const useContractZoho = (contractId) => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const body = new FormData();
  body.append('key', '9j9fj0Do204==3fja134')
  body.append('id', contractId)
  const URL = NODE_ENV === "production" ? (`${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_OBTAINDATA}`) : REACT_APP_OCEANO_OBTAINDATA ;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(URL, body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      console.log({ response })
        
      setData(response.data)
      setLoading(response.data.lenght > 0)
       
      // console.log({ response, data })

    }

    fetchData()
  }, [])

  return { data, loading, error }
}