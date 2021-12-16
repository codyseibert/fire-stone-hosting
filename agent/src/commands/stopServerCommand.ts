import util from 'util';
import cp from 'child_process';

const exec = util.promisify(cp.exec);

type stopServerOptions = {
  serverId: string;
};

interface stopServerInterface {
  (opts: stopServerOptions): Promise<any>;
}

export const stopServerCommand: stopServerInterface = async ({ serverId }) => {
  return exec(`docker stop mc-${serverId}`);
};
