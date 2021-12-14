import { db } from './db';

type setFreeMemoryOnNodePersistenceOptions = {
  nodeId: string;
  freeMemory: number;
};

export const setFreeMemoryOnNodePersistence = async ({
  freeMemory,
  nodeId,
}: setFreeMemoryOnNodePersistenceOptions) => {
  await db.nodes.update({
    where: {
      id: nodeId,
    },
    data: {
      freeMemory,
    },
  });
};
