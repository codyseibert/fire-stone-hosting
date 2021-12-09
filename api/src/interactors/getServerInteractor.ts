import { ApplicationContext } from "../createApplicationContext";
import { getServerPersistence } from '../persistence/sqlite/getServerPersistence';

type getServerInteractorOptions = {
  serverId: String;
  applicationContext: ApplicationContext;
};

export const getServerInteractor = async ({ serverId, applicationContext }: getServerInteractorOptions) =>
  getServerPersistence({
    serverId,
    applicationContext,
  });
