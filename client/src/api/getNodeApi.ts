import axios from 'axios';
import { API_URL } from './config';
import { ServerNode } from 'api/src/models/ServerNode';

export type getNodeOptions = {
  nodeId: string;
};

export interface IGetNode {
  (opts: getNodeOptions): Promise<ServerNode>;
}

export const getNodeApi: IGetNode = ({ nodeId }) => {
  return axios
    .get(`${API_URL}/nodes/${nodeId}`)
    .then((response) => response.data);
};
