import { setServerHealthPersistence } from '../persistence/setServerHealthPersistence';

type setServerHealthInteractorOptions = {
  memoryPercent: string;
  cpuPercent: string;
  serverId: string;
};

export const setServerHealthInteractor = async ({
  serverId,
  memoryPercent,
  cpuPercent,
}: setServerHealthInteractorOptions) =>
  setServerHealthPersistence({
    serverId,
    memoryPercent,
    cpuPercent,
  });
