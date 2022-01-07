import util from 'util';
import cp from 'child_process';
import path from 'path';

import { getRunningContainers } from './getRunningContainers';

const exec = util.promisify(cp.exec);

type stopOrphanedServersOptions = {
  expectedServerIds: string[];
};

interface stopOrphanedServersInterface {
  (opts: stopOrphanedServersOptions): Promise<any>;
}

export const stopOrphanedServers: stopOrphanedServersInterface = async ({
  expectedServerIds,
}) => {
  const runningServerIds = await getRunningContainers();
  const promises = [];

  console.log('runningServerIds', runningServerIds);
  for (const runningId of runningServerIds) {
    const mcRunningId = `mc-${runningId}`;
    console.log(mcRunningId);
    if (!expectedServerIds.find(expectedId => expectedId === runningId)) {
      const serverPath = path.join(process.env.SERVERS_DIR, `/${runningId}`);

      console.log('stopping orphaned server', serverPath);
      // eslint-disable-next-line no-await-in-loop
      promises.push(
        exec(`docker stop --time=30 ${runningId}`).then(() =>
          exec(`rm -rf ${serverPath}`),
        ),
      );
    }
  }

  await Promise.all(promises);
};
