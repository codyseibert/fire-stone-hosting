import axios from "axios";
import { API_URL } from "./config";
import { ServerNode } from '../../../api/src/persistence/sqlite/getNodesPersistence';

export type getNodeOptions = {
  nodeId: string;
};

export interface IGetNode {
  (opts: getNodeOptions): Promise<ServerNode>;
}

const getNode: IGetNode = ({ nodeId }) => {
  return axios
    .get(`${API_URL}/nodes/${nodeId}`)
    .then((response) => response.data);
};

export default getNode;
