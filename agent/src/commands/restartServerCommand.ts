import util from 'util';
import cp from 'child_process';

const exec = util.promisify(cp.exec);

export const restartServerCommand = async ({
  serverId,
}: {
  serverId: string;
}) => {
  return exec(`docker restart mc-${serverId} --time=60`);
};
