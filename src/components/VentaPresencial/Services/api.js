import axios from 'axios';
const { NODE_ENV, REACT_APP_API } = process.env;
const isProduction = NODE_ENV === 'production';

const apiProgressURL = isProduction
  ? `${REACT_APP_API}/api/progress`
  : '/api/progress';

class ApiService {

  constructor() {
    this.baseUrl = apiProgressURL;
    this.token = localStorage.getItem('tokenLogin');
    this.axiosConfig = { headers: { Authorization: `Bearer ${this.token}` } };
  }

  async get(endpoint) {
    const response = await axios.get(`${this.baseUrl}/${endpoint}`);
    return response;
  }

  async getSalesByUser(userId) {
    const { data } = await axios.get(`${this.baseUrl}?user=${userId}`);
    return data;
  }

  async post(endpoint, body) {
    const URL = `${this.baseUrl}${endpoint}`;

    const response = await axios.post(
      URL,
      {
        body,
      },
      this.axiosConfig
    );
    return response;
  }

  async logout(endpoint, body) {
    const URL = `${endpoint}`;

    const { data } = await axios.post(URL, body, this.axiosConfig);
    //localStorage.removeItem('tokenLogin');
    return data;
  }

  async getApiResource(URL) {
    return axios.get(URL, this.axiosConfig)

  }

  async createProgress(user_id) {
    try {
      const { data } = await axios.post(this.baseUrl, {
        step_number: 1,
        user_id,
      });
      return data;
    } catch (e) {
      return e;
    }
  }

  async createContractCRM(URL, body) {
    try {
      const { data } = await axios.post(
        URL,
        body,
        this.axiosConfig
      );

      return data

    } catch (e) {
      return e
    }

  }
}

export default new ApiService();
