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
  console.log(memory, port, version);

  const serverVolumePath = path.join(process.env.SERVERS_DIR, `/${serverId}`);

  try {
    await new Promise<void>((resolve, reject) => {
      fs.access(serverVolumePath, fs.constants.F_OK, error => {
        if (error) reject(error);
        resolve();
      });
    });
  } catch (error) {
    await exec(`mkdir -m777 -p ${serverVolumePath}`);
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
    console.log('container already exists, starting it');
    await exec(`docker start mc-${serverId}`);
    await exec(`docker update --restart unless-stopped mc-${serverId}`);
  }

  const ftpPortMin = (port - 25565) * 10 + 21100 + 1;
  const ftpPortMax = ftpPortMin + 8;

  try {
    const command = [
      'docker',
      'run',
      '-d',
      `-v ${serverVolumePath}:/home/vsftpd/admin`,
      `-p ${ftpPortMin - 1}:21`,
      `-p ${ftpPortMin}-${ftpPortMax}:${ftpPortMin}-${ftpPortMax}`,
      '-e PASV_ADDR_RESOLVE=YES',
      '-e LOG_STDOUT=YES',
      '-e FTP_USER=admin',
      '-e FTP_PASS=admin',
      '-e PASV_ADDRESS=10.0.0.166',
      `-e PASV_MIN_PORT=${ftpPortMin}`,
      `-e PASV_MAX_PORT=${ftpPortMax}`,
      `--name ftp-${serverId}`,
      '--restart unless-stopped',
      'fauria/vsftpd',
    ].join(' ');
    await exec(command);
  } catch (err) {
    if (err.message.includes('is already in use by container')) {
      await exec(`docker start ftp-${serverId}`);
    } else {
      console.log(err);
    }
  }
};
