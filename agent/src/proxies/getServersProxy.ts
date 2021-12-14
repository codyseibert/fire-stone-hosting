import request from 'request-promise-native';
import { Server } from 'api/src/models/Server';

type getServersProxyOptions = {
  nodeId: string;
};

interface getServersProxyInterface {
  (opts: getServersProxyOptions): Promise<Server[]>;
}

export const getServersProxy: getServersProxyInterface = async ({ nodeId }) =>
  request({
    method: 'get',
    json: true,
    url: `${process.env.MASTER_NODE_BASE_URL}/nodes/${nodeId}/servers`,
  });
