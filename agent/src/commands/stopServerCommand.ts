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
  try {
    await exec(`docker update --restart=no mc-${serverId}`);
    await exec(`docker exec mc-${serverId} mc-send-to-console /stop`);
  } catch (err) {
    if (
      !err.message.includes('is not running') &&
      !err.message.includes('No such container')
    ) {
      throw err;
    }
  }
};
