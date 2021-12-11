import * as request from 'request-promise-native';
import { Server } from '../models/Server';
import { ServerNode } from '../persistence/sqlite/getNodesPersistence';
import { getAgentUrl } from './commandUtilities';

export const stopServerCommand = async ({
  node,
  server,
}: {
  node: ServerNode;
  server: Server;
}) => {
  await request({
    method: 'post',
    json: true,
    url: `${getAgentUrl(node)}/servers/${server.id}/stop`,
  });
};
