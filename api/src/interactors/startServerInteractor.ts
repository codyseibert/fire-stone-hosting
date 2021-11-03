import { ApplicationContext } from "../createApplicationContext";

type startServerInteractorOptions = {
  serverId: String;
  applicationContext: ApplicationContext;
};

export const startServerInteractor = async ({ applicationContext, serverId }: startServerInteractorOptions) =>
  applicationContext.persistence.startServer({
    applicationContext,
    serverId,
  });
