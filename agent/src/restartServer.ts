import util from 'util';
import cp from 'child_process';
const exec = util.promisify(cp.exec);

export const restartServer = async ({ serverId }: { serverId: string }) => {
  return exec(`docker restart ${serverId} --time=60`);
};
