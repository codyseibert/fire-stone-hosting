import axios from 'axios';
import { API_URL } from './config';

export default (payload, token) =>
  axios
    .post(`${API_URL}/existing-user-purchase`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => response.data);
