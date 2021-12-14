import { db } from './db';

type deleteServerPersistenceOptions = {
  serverId: string;
};
export interface deleteServerPersistenceInterface {
  (opts: deleteServerPersistenceOptions): Promise<any>;
}

export const deleteServerPersistence: deleteServerPersistenceInterface =
  async ({ serverId }) => {
    await db.servers.delete({
      where: {
        id: serverId,
      },
    });
  };
