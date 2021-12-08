
import request from 'request-promise-native';

export const setRestartDone = async ({ serverId }: {serverId: string}) => request({
  method: 'delete',
  url: `${process.env.MASTER_NODE_BASE_URL}/servers/${serverId}/restart`,
});
