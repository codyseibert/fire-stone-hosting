import { ApplicationContext } from '../createApplicationContext';
import { deleteServerPersistence } from '../persistence/deleteServerPersistence';

type deleteServerOptions = {
  serverId: string;
  applicationContext: ApplicationContext;
};

export interface deleteServerInterface {
  (opts: deleteServerOptions): Promise<void>;
}

export const deleteServerInteractor: deleteServerInterface = async ({
  applicationContext,
  serverId,
}) =>
  deleteServerPersistence({
    applicationContext,
    serverId,
  });
