import fetch from 'node-fetch';
import { Server } from 'api/src/models/Server';

type getServerProxyOptions = {
  serverId: string;
};

interface getServerProxyInterface {
  (opts: getServerProxyOptions): Promise<Server>;
}

export const getServerProxy: getServerProxyInterface = async ({ serverId }) => {
  const res = await fetch(
    `${process.env.MASTER_NODE_BASE_URL}/servers/${serverId}`,
  );

  const data = await res.json();

  return data as Server;
};
