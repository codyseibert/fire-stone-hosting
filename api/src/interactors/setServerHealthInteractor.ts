import { ApplicationContext } from "../createApplicationContext";

type setServerHealthInteractorOptions = {
  memoryPercent: String;
  cpuPercent: String;
  serverId: String;
  applicationContext: ApplicationContext;
};

export const setServerHealthInteractor = async ({
  applicationContext,
  serverId,
  memoryPercent,
  cpuPercent,
}: setServerHealthInteractorOptions) =>
  applicationContext.persistence.setServerHealth({
    applicationContext,
    serverId,
    memoryPercent,
    cpuPercent,
  });
