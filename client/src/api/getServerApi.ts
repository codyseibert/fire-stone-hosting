import axios from 'axios';
import { Server } from 'api/src/models/Server';
import { API_URL } from './config';

export type getServerOptions = {
  serverId: string;
};

export interface getServerInterface {
  (opts: getServerOptions): Promise<Server>;
}

export const getServerApi: getServerInterface = ({
  serverId,
}) => {
  return axios
    .get(`${API_URL}/servers/${serverId}`)
    .then((response) => response.data);
};
