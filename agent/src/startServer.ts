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
  const { memory, port } = server;

  try {
    await new Promise<void>((resolve, reject) => {
      fs.access(`../servers/${serverId}`, fs.constants.F_OK, (error: Error) => {
        return error ? reject(error) : resolve();
      });
    });
  } catch (error) {
    console.log(`${serverId} - making directory`);
    await exec(`mkdir -p ../servers/${serverId}`);
    console.log(`${serverId} - copying server.properties`);
    await exec(`cp ../server.properties ../servers/${serverId}`);
    console.log(`${serverId} - building container`);
    await exec(
      `docker build -t ${serverId} -f ../minecraft.Dockerfile ../servers/${serverId}`,
    );
  }

  try {
    const command = [
      'docker',
      'run',
      '--restart unless-stopped',
      '--cpus="1"',
      '-itd',
      `--name ${serverId}`,
      `-m ${memory}m`,
      `-e JAVA_OPTS="-Xmn${Math.ceil(
        memory / 4,
      )}M -Xms${memory}M -Xmx${memory}M -XX:SoftMaxHeapSize=${Math.ceil(
        memory / 2,
      )}M"`,
      `-p ${port}:25565`,
      `-v $(pwd)/../servers/${serverId}:/minecraft`,
      serverId,
    ].join(' ');
    console.log('command', command);
    await exec(command);
  } catch (err) {
    await exec(`docker start ${serverId}`);
  }
};
