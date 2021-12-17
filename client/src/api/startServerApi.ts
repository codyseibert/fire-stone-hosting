import axios from 'axios';
import { API_URL } from './config';

export const startServerApi = (
  { serverId }: { serverId: string },
  token: string
) =>
  axios
    .post(`${API_URL}/servers/${serverId}/start`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
