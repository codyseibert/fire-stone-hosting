import fs from 'fs';
import util from 'util';
import cp from 'child_process';
import path from 'path';

import { getServerProxy } from '../proxies/getServerProxy';

const exec = util.promisify(cp.exec);

type startServerOptions = {
  serverId: string;
};

interface startServerInterface {
  (opts: startServerOptions): Promise<any>;
}

export const startServerCommand: startServerInterface = async ({
  serverId,
}) => {
  const { memory, port, version } = await getServerProxy({ serverId });

  const serverVolumePath = path.join(process.env.SERVERS_DIR, `/${serverId}`);

  try {
    await new Promise<void>((resolve, reject) => {
      fs.access(serverVolumePath, fs.constants.F_OK, error => {
        if (error) reject(error);
        resolve();
      });
    });
  } catch (error) {
    console.log(`${serverId} - making directory`);

    await exec(`mkdir -p ${serverVolumePath}`);
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
      `-v ${serverVolumePath}:/data`,
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
