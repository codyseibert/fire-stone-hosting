import util from 'util';
import cp from 'child_process';
import { startServerCommand } from './startServerCommand';

const exec = util.promisify(cp.exec);

export const restartServerCommand = async ({
  serverId,
}: {
  serverId: string;
}) => {
  try {
    console.log('sending /stop to server');
    await exec(`docker exec mc-${serverId} mc-send-to-console /stop`);
  } catch (err) {
    if (err.message.includes('is not running')) {
      await startServerCommand({
        serverId,
      });
    }
  }
};
