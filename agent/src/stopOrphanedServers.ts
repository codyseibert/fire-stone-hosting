/* eslint-disable no-restricted-syntax */
import * as util from 'util';
import * as cp from 'child_process';
const exec = util.promisify(cp.exec);

const {getRunningContainers} = require('./getRunningContainers');

type stopOrphanedServersOptions = {
  expectedServerIds: string[],
}

interface stopOrphanedServersInterface {
  (opts: stopOrphanedServersOptions): Promise<any>
}

export const stopOrphanedServers: stopOrphanedServersInterface = async ({ expectedServerIds }) => {
  const runningServerIds = await getRunningContainers();

  for (const runningId of runningServerIds) {
    if (!expectedServerIds.find(expectedId => expectedId === runningId)) {
      // eslint-disable-next-line no-await-in-loop
      exec(`docker stop ${runningId}`);
    }
  }
};
