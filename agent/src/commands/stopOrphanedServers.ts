/* eslint-disable no-restricted-syntax */
import util from 'util';
import cp from 'child_process';

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

  for (const runningId of runningServerIds) {
    if (!expectedServerIds.find(expectedId => expectedId === runningId)) {
      // eslint-disable-next-line no-await-in-loop
      promises.push(
        exec(`docker stop --time=30 ${runningId}`).then(() =>
          exec(`rm -rf ../../servers/${runningId}`),
        ),
      );
    }
  }

  await Promise.all(promises);
};
