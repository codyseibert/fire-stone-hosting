import fetch from 'node-fetch';
import { Server } from '../models/Server';
import { ServerNode } from '../models/ServerNode';
import { getAgentUrl } from './commandUtilities';

interface stopServerCommandOptions {
  node: ServerNode;
  serverId: Server['id'];
}

export const stopServerCommand = async ({
  node,
  serverId,
}: stopServerCommandOptions) => {
  await fetch(`${getAgentUrl(node)}/servers/${serverId}/stop`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(({ json }) => json());
};
