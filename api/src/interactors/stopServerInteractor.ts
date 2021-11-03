import { ApplicationContext } from "../createApplicationContext";

type stopServerInteractorOptions = {
  serverId: String;
  applicationContext: ApplicationContext;
};

export const stopServerInteractor = async ({ applicationContext, serverId }: stopServerInteractorOptions) =>
  applicationContext.persistence.stopServer({
    applicationContext,
    serverId,
  });
