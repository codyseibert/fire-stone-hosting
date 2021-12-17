import axios from 'axios';
import { API_URL } from './config';

export const deleteServerApi = (
  serverId: string,
  token: string
) =>
  axios
    .delete(`${API_URL}/servers/${serverId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
