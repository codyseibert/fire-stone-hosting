import { runBackupPersistence } from '../persistence/runBackupPersistence';

type runBackupInteractorOptions = {
  serverId: string;
};

export const runBackupInteractor = async ({
  serverId,
}: runBackupInteractorOptions) =>
  runBackupPersistence({
    serverId,
  });
