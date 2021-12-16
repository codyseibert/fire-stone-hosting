import fetch from 'node-fetch';

type backupCompleteProxyOptions = {
  serverId: string;
};

interface backupCompleteProxyInterface {
  (opts: backupCompleteProxyOptions): Promise<any>;
}

export const backupCompleteProxy: backupCompleteProxyInterface = async ({
  serverId,
}) =>
  fetch(
    `${process.env.MASTER_NODE_BASE_URL}/servers/${serverId}/backup-complete`,
    {
      method: 'POST',
    },
  );
