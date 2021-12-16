import fetch from 'node-fetch';
import request from 'node-fetch';

type saveServerHealthProxyOptions = {
  serverId: String;
  cpuPercent: String;
  memoryPercent: String;
};

interface saveServerHealthProxyInterface {
  (opts: saveServerHealthProxyOptions): Promise<any>;
}

export const saveServerHealthProxy: saveServerHealthProxyInterface = async ({
  serverId,
  cpuPercent,
  memoryPercent,
}) => {
  fetch(`${process.env.MASTER_NODE_BASE_URL}/servers/${serverId}/health`, {
    method: 'POST',
    body: JSON.stringify({
      cpuPercent,
      memoryPercent,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
};
