import fs from 'fs';
import util from 'util';
import cp from 'child_process';
import { spawn } from 'child_process';
const exec = util.promisify(cp.exec);

const out = fs.openSync('./out.log', 'a');
const err = fs.openSync('./out.log', 'a');

type startServerOptions = {
  serverId: string;
  port: number;
  memory: number;
};

interface startServerInterface {
  (opts: startServerOptions): Promise<any>;
}

export const startServer: startServerInterface = async ({
  serverId,
  memory,
  port,
}) => {
  // TODO: make a user for FTP
  // await exec('useradd bob');
  // await exec('echo bob:123 | chpasswd');

  // TODO: we should actually be using the user's FTP folder for all of this
  try {
    await new Promise<void>((resolve, reject) => {
      fs.access(`../servers/${serverId}`, fs.constants.F_OK, (error: Error) => {
        return error ? reject(error) : resolve();
      });
    });
  } catch (error) {
    console.log(`${serverId} - making directory`)
    await exec(`mkdir -p ../servers/${serverId}`);
    console.log(`${serverId} - copying server.properties`)
    await exec(`cp ../server.properties ../servers/${serverId}`);
    console.log(`${serverId} - building container`)
    await exec(
      `docker build -t ${serverId} -f ../minecraft.Dockerfile ../servers/${serverId}`,
    );
  }

  const subprocess = spawn(
    'screen',
    [
      `-S ${serverId}`,
      '-d',
      '-m',
      'docker',
      'run',
      '--cpus="1"',
      '--rm',
      '-t',
      '-i',
      `--name ${serverId}`,
      `-m ${memory}m`,
      `-e JAVA_OPTS="-Xmn${Math.ceil(
        memory / 4,
      )}M -Xms${memory}M -Xmx${memory}M -XX:SoftMaxHeapSize=${Math.ceil(
        memory / 2,
      )}M"`,
      `-p ${port}:25565`,
      `-v $(pwd)/../servers/${serverId}:/minecraft`,
      serverId
    ],
    {
      detached: true,
      stdio: ['ignore', out, err],
      shell: true,
    },
  );
  subprocess.unref();
};
