import util from 'util';
import cp from 'child_process';
const exec = util.promisify(cp.exec);

type runCommandOptions = {
  serverId: string,
  command: string,
}

interface runCommandInterface {
  (opts: runCommandOptions): Promise<any>
}

export const runCommand: runCommandInterface = async ({ serverId, command }) => {
  await exec(`screen -S "${serverId}" -p 0 -X stuff "${command}\r"`);
};
