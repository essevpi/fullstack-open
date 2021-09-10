import axios from 'axios';

const baseUrl = '/api/login';

const logIn = async (credentials) => {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
};

const exports = { logIn };

export default exports;