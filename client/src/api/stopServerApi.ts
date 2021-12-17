import axios from 'axios';
import { API_URL } from './config';

export const stopServerApi = (
  { serverId }: { serverId: string },
  token: string
) =>
  axios
    .post(`${API_URL}/servers/${serverId}/stop`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
