import axios from 'axios';

const api = axios.create({
  baseURL: 'http://34.46.59.178:8080'
});

export default api;
