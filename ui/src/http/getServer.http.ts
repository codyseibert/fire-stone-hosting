import axios from 'axios';
import { API_URL } from './config';

export default ({ serverId }) =>
  axios.get(`${API_URL}/servers/${serverId}`).then(response => response.data);
