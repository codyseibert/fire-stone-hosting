import request from 'request-promise-native';

type registerAgentOptions = {
  nodeId: string,
  ip: string,
  totalMemory: string,
  freeMemory: string,
}

interface registerAgentInterface {
  (opts: registerAgentOptions): Promise<any>
}


export const registerAgentProxy: registerAgentInterface = async ({
  nodeId,
  ip,
  totalMemory,
  freeMemory,
}) => {
  await request({
    method: 'post',
    body: {
      ip,
      id: nodeId,
      totalMemory,
      freeMemory,
    },
    json: true,
    url: `${process.env.MASTER_NODE_BASE_URL}/nodes`,
  });
};
