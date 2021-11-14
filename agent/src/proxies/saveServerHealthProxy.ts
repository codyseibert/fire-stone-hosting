
import request from 'request-promise-native';

type saveServerHealthProxyOptions = {
    serverId: String,
    cpuPercent: String,
    memoryPercent: String,
}

interface saveServerHealthProxyInterface {
  (opts: saveServerHealthProxyOptions): Promise<any>
}

export const saveServerHealthProxy: saveServerHealthProxyInterface = async ({ serverId, cpuPercent, memoryPercent }) => request({
  method: 'post',
  json: true,
  url: `${process.env.MASTER_NODE_BASE_URL}/servers/${serverId}/health`,
  body: {
    cpuPercent,
    memoryPercent,
  },
});
