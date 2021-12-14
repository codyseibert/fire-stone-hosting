import { ServerNode } from '../models/ServerNode';
import { db } from './db';

type getNodePersistenceOptions = {
  nodeId: string;
};
export interface getNodeInterface {
  (opts: getNodePersistenceOptions): Promise<ServerNode>;
}

export const getNodePersistence: getNodeInterface = async ({ nodeId }) => {
  return db.nodes.findUnique({
    where: {
      id: nodeId,
    },
  });
};
