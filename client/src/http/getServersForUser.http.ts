import axios from 'axios';
import { API_URL } from './config';

export default ({ userId }) =>
  axios
    .get(`${API_URL}/users/${userId}/servers`)
    .then(response => response.data);
