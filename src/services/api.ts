import axios from 'axios';

const api = axios.create({
  baseURL: 'https://developers.themoviedb.org/3/',
});

export default api;
