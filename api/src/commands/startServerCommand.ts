import fetch from 'node-fetch';
import { Server } from '../models/Server';
import { ServerNode } from '../models/ServerNode';
import { getAgentUrl } from './commandUtilities';

interface startServerCommandOptions {
  node: ServerNode;
  serverId: Server['id'];
}

export const startServerCommand = async ({
  node,
  serverId,
}: startServerCommandOptions) => {
  const response = await fetch(
    `${getAgentUrl(node)}/servers/${serverId}/start`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response.json();
};
