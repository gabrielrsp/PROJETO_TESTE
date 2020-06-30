import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apiurl.com'
});

export default api;
