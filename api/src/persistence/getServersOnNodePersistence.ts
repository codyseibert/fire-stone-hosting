import { ApplicationContext } from '../createApplicationContext';
import { Server } from '../models/Server';

type getServersOnNodePersistenceOptions = {
  nodeId: string;
  applicationContext: ApplicationContext;
};

interface getServersOnNodePersistenceInterface {
  (opts: getServersOnNodePersistenceOptions): Promise<Server[]>;
}

export const getServersOnNodePersistence: getServersOnNodePersistenceInterface =
  async ({ applicationContext, nodeId }) => {
    return applicationContext.db.servers.findMany({
      where: {
        nodeId,
      },
    });
  };
