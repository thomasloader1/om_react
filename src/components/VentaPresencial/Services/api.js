import axios from "axios";
const { NODE_ENV, REACT_APP_API } = process.env;
const isProduction = NODE_ENV === 'production';

const apiProgressURL = isProduction
    ? `${REACT_APP_API}/api/progress`
    : '/api/progress';


class ApiService {
    baseUrl = apiProgressURL;
    token = localStorage.getItem("tokenLogin");

    async get(endpoint) {
        const response = await axios.get(`${this.baseUrl}/${endpoint}`, { headers: { Authorization: `Bearer ${this.token}` } });
        return response;
    }

    async post(endpoint, body) {
        const response = await axios.post(`${this.baseUrl}${endpoint}`, {
            body
        });
        return response;
    }

    async createProgress(user_id) {
        try {
            const { data } = await axios.post(this.baseUrl, { step_number: 1, user_id });
            return data
        } catch (e) {
            return e
        }
    };

    // Aquí puedes agregar más métodos según tus necesidades

}

export default new ApiService();
