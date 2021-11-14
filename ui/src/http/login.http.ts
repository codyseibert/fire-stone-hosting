import axios from 'axios';
import { API_URL } from './config';

export default ({ email, password }) =>
  axios
    .post(`${API_URL}/login`, { email, password })
    .then(response => response.data);
