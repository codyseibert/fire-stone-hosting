import axios from 'axios';
import { API_URL } from './config';

export const restartServerApi = (
  { serverId }: { serverId: string },
  token: string
) => {
  return axios
    .post(`${API_URL}/servers/${serverId}/restart`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};
