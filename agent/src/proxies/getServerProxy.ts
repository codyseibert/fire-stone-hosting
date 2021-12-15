import request from 'request-promise-native';
import { Server } from 'api/src/models/Server';

type getServerProxyOptions = {
  serverId: string;
};

interface getServerProxyInterface {
  (opts: getServerProxyOptions): Promise<Server>;
}

export const getServerProxy: getServerProxyInterface = async ({ serverId }) =>
  request({
    method: 'get',
    json: true,
    url: `${process.env.MASTER_NODE_BASE_URL}/servers/${serverId}`,
  });
