import { ApplicationContext } from '../createApplicationContext';

type deleteServerPersistenceOptions = {
  applicationContext: ApplicationContext;
  serverId: string;
};
export interface deleteServerPersistenceInterface {
  (opts: deleteServerPersistenceOptions): Promise<any>;
}

export const deleteServerPersistence: deleteServerPersistenceInterface =
  async ({ applicationContext, serverId }) => {
    await applicationContext.db.servers.delete({
      where: {
        id: serverId,
      },
    });
  };
