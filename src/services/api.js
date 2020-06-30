import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.16.1.30:2006'
});

export default api;
