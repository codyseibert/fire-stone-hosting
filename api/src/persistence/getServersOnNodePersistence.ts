import { Server } from '../models/Server';
import { db } from './db';

type getServersOnNodePersistenceOptions = {
  nodeId: string;
};

interface getServersOnNodePersistenceInterface {
  (opts: getServersOnNodePersistenceOptions): Promise<Server[]>;
}

export const getServersOnNodePersistence: getServersOnNodePersistenceInterface =
  async ({ nodeId }) => {
    return await db.servers.findMany({
      where: {
        nodeId,
      },
    });
  };
