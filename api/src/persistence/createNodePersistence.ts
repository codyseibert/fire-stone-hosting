import { ServerNode } from '../models/ServerNode';
import { db } from './db';

type createNodePersistenceOptions = {
  node: ServerNode;
};

export interface createNodePersistenceInterface {
  (opts: createNodePersistenceOptions): Promise<void>;
}

export const createNodePersistence: createNodePersistenceInterface = async ({
  node,
}) => {
  const { id, ip, totalMemory, freeMemory } = node;

  await db.nodes.upsert({
    where: {
      id,
    },
    create: {
      id,
      ip,
      totalMemory,
      freeMemory,
    },
    update: {
      ip,
      totalMemory,
      freeMemory,
    },
  });
};
