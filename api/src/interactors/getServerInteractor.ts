import { getServerPersistence } from '../persistence/getServerPersistence';

type getServerInteractorOptions = {
  serverId: String;
};

export const getServerInteractor = async ({
  serverId,
}: getServerInteractorOptions) =>
  getServerPersistence({
    serverId,
  });
