import fetch from 'node-fetch';
import { Specs } from '../getSystemSpecs';

interface registerAgentInterface {
  (opts: Specs): Promise<any>;
}

export const registerAgentProxy: registerAgentInterface = async ({
  nodeId,
  ip,
  totalMemory,
  freeMemory,
}) => {
  await fetch(`${process.env.MASTER_NODE_BASE_URL}/nodes`, {
    method: 'POST',
    body: JSON.stringify({
      ip,
      id: nodeId,
      totalMemory,
      freeMemory,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
};
