import { ApplicationContext } from '../createApplicationContext';

type setFreeMemoryOnNodePersistenceOptions = {
  nodeId: string;
  freeMemory: number;
  applicationContext: ApplicationContext;
};

export const setFreeMemoryOnNodePersistence = async ({
  applicationContext,
  freeMemory,
  nodeId,
}: setFreeMemoryOnNodePersistenceOptions) => {
  await applicationContext.db.nodes.update({
    where: {
      id: nodeId,
    },
    data: {
      freeMemory,
    },
  });
};
