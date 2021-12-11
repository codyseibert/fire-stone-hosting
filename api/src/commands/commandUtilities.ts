import { ServerNode } from '../persistence/sqlite/getNodesPersistence';

export const getAgentUrl = (node: ServerNode) => {
  return `http://${node.ip}:4444`;
};
