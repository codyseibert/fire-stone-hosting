import request from 'request-promise-native';

type backupCompleteProxyOptions = {
  serverId: string,
}

interface backupCompleteProxyInterface {
  (opts: backupCompleteProxyOptions): Promise<any>
}

export const backupCompleteProxy: backupCompleteProxyInterface = async ({ serverId }) => request({
  method: 'post',
  json: true,
  url: `${process.env.MASTER_NODE_BASE_URL}/servers/${serverId}/backup-complete`,
});
