import axios from 'axios';

const api = axios.create({
    baseURL: 'http://3.84.236.60:3333',
});

export default api;