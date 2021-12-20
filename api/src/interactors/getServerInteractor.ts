import { getServerPersistence } from '../persistence/getServerPersistence';

type getServerInteractorOptions = {
  serverId: string;
};

export const getServerInteractor = async ({
  serverId,
}: getServerInteractorOptions) =>
  getServerPersistence({
    serverId,
  });
