import fs from 'fs';
import util from 'util';
import cp from 'child_process';
import { spawn } from 'child_process';
import { getServerProxy } from './proxies/getServerProxy';
const exec = util.promisify(cp.exec);

const out = fs.openSync('./out.log', 'a');
const err = fs.openSync('./out.log', 'a');

type startServerOptions = {
  serverId: string;
};

interface startServerInterface {
  (opts: startServerOptions): Promise<any>;
}

export const startServer: startServerInterface = async ({ serverId }) => {
  const server = await getServerProxy({ serverId });
  const { memory, port, version } = server;

  try {
    await new Promise<void>((resolve, reject) => {
      fs.access(`../servers/${serverId}`, fs.constants.F_OK, (error: Error) => {
        return error ? reject(error) : resolve();
      });
    });
  } catch (error) {
    console.log(`${serverId} - making directory`);
    await exec(`mkdir -p ../servers/${serverId}`);
  }

  try {
    const command = [
      'docker',
      'run',
      '--restart unless-stopped',
      '--cpus="1"',
      '-itd',
      `--name mc-${serverId}`,
      `-p ${port}:25565`,
      `-m ${memory}m`,
      `-v $(pwd)/../servers/${serverId}:/data`,
      '-e EULA=TRUE',
      `-e VERSION=${version}`,
      `-e MEMORY=${memory}M`,
      `itzg/minecraft-server`,
    ].join(' ');
    console.log('command', command);
    await exec(command);
  } catch (err) {
    await exec(`docker start mc-${serverId}`);
  }
};
