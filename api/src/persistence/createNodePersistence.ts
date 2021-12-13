import { ApplicationContext } from '../createApplicationContext';
import { ServerNode } from '../models/ServerNode';

type createNodePersistenceOptions = {
  node: ServerNode;
  applicationContext: ApplicationContext;
};

export interface createNodePersistenceInterface {
  (opts: createNodePersistenceOptions): Promise<void>;
}

export const createNodePersistence: createNodePersistenceInterface = async ({
  applicationContext,
  node,
}) => {
  const { id, ip, totalMemory, freeMemory } = node;

  await applicationContext.db.nodes.upsert({
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
