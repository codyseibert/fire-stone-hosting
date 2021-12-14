import { backupCompletePersistence } from '../persistence/backupCompletePersistence';

type backupCompleteInteractorOptions = {
  serverId: string;
};

export const backupCompleteInteractor = async ({
  serverId,
}: backupCompleteInteractorOptions) =>
  backupCompletePersistence({
    serverId,
  });
