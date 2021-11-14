import axios from 'axios';
import { API_URL } from './config';

export default ({ serverId }, token) =>
  axios
    .post(`${API_URL}/servers/${serverId}/stop`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => response.data);
