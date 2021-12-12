import fetch from 'node-fetch';
import { Server } from '../models/Server';
import { ServerNode } from '../models/ServerNode';
import { getAgentUrl } from './commandUtilities';

export const restartServerCommand = async ({
  node,
  server,
}: {
  node: ServerNode;
  server: Server;
}) => {
  await fetch(`${getAgentUrl(node)}/servers/${server.id}/restart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(({ json }) => json());
};
