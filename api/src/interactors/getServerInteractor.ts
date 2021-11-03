import { ApplicationContext } from "../createApplicationContext";

type getServerInteractorOptions = {
  serverId: String;
  applicationContext: ApplicationContext;
};

export const getServerInteractor = async ({ serverId, applicationContext }: getServerInteractorOptions) =>
  applicationContext.persistence.getServer({
    serverId,
    applicationContext,
  });
