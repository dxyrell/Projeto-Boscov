import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // ou onde seu backend estiver
});

export const setAuthToken = (token) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default api;
