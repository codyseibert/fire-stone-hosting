import fetch from 'node-fetch';
import { Server } from 'api/src/models/Server';

type getServersProxyOptions = {
  nodeId: string;
};

interface getServersProxyInterface {
  (opts: getServersProxyOptions): Promise<Server[]>;
}

export const getServersProxy: getServersProxyInterface = async ({ nodeId }) => {
  const res = await fetch(
    `${process.env.MASTER_NODE_BASE_URL}/nodes/${nodeId}/servers`,
  );

  const data = await res.json();

  return data as Server[];
};
