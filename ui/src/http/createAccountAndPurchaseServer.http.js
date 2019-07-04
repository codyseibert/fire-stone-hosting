import axios from 'axios';
import { API_URL } from './config';

export default payload =>
  axios
    .post(`${API_URL}/new-user-purchase`, payload)
    .then(response => response.data);