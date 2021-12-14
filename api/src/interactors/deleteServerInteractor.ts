import { deleteServerPersistence } from '../persistence/deleteServerPersistence';

type deleteServerOptions = {
  serverId: string;
};

export interface deleteServerInterface {
  (opts: deleteServerOptions): Promise<void>;
}

export const deleteServerInteractor: deleteServerInterface = async ({
  serverId,
}) =>
  deleteServerPersistence({
    serverId,
  });
