import axios from "axios"
import { useContext,useState, useEffect } from "react"
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';

const { PHP_LARAVEL_APIPAYMENTS,REACT_APP_OCEANO_URL, REACT_APP_OCEANO_OBTAINDATA, NODE_ENV } = process.env

export const useContractZoho = (lead) => {

  const {tokenLogin} = useContext(AppContext);

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const body = new FormData();
  body.append('key', '9j9fj0Do204==3fja134')
  body.append('id', lead.id)
  body.append('id', lead.name)
  body.append('id', lead.username)
  body.append('id', lead.email)
  body.append('id', lead.telephone)
  body.append('id', lead.profession)
  body.append('id', lead.speciality)
  body.append('id', lead.method_contact)

  // const URL = NODE_ENV === "production" ? (`${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_OBTAINDATA}`) : PHP_LARAVEL_APIPAYMENTS ;

  useEffect(() => {
    const fetchData = async () => {
      debugger;//9
      const response = await axios.post("http://127.0.0.1:8000/api/db/stepCreateLead", body, {
      // const response = await axios.post(URL, body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': tokenLogin
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