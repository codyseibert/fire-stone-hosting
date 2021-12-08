import { setRestartDone } from "./proxies/setAsRunningProxy"
import util from 'util';
import cp from 'child_process';
const exec = util.promisify(cp.exec);

export const restartServer = async ({serverId}: {serverId: string}) => {
  try {
    await exec(`screen -S "${serverId}" -p 0 -X stuff "stop\r"`);
    await setRestartDone({serverId})
  } catch (err) {
    console.log(err);
  }
}