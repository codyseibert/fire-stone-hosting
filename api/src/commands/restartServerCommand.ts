import fetch from 'node-fetch';
import { Server } from '../models/Server';
import { ServerNode } from '../models/ServerNode';
import { getAgentUrl } from './commandUtilities';

interface restartServerCommandOptions {
  node: ServerNode;
  serverId: Server['id'];
}

export const restartServerCommand = async ({
  node,
  serverId,
}: restartServerCommandOptions) => {
  await fetch(`${getAgentUrl(node)}/servers/${serverId}/restart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(({ json }) => json());
};
