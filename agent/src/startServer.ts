import fs from 'fs'
import util from 'util';
import cp from 'child_process';
import { spawn }from 'child_process';
const exec = util.promisify(cp.exec);

const out = fs.openSync('./out.log', 'a');
const err = fs.openSync('./out.log', 'a');

type startServerOptions = {
  serverId: string,
  port: number,
  memory: number,
}

interface startServerInterface {
  (opts: startServerOptions): Promise<any>
}

export const startServer: startServerInterface = async ({ serverId, memory, port }) => {
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
    await exec(`mkdir -p ../servers/${serverId}`);
    await exec(`cp ../server.properties ../servers/${serverId}`);
    await exec(`docker build -t minecraft -f ../minecraft.Dockerfile ../servers/${serverId}`);
  }
  
  // eslint-disable-next-line no-param-reassign
  // memory = 1024; // TODO: remove this
  const containerMemory = memory + 128;
  const subprocess = spawn('screen', [`-S ${serverId}`, '-d', '-m', 'docker', 'run', '--cpus="1"', '--rm', '-t', '-i', `--name ${serverId}`, `-m ${containerMemory}m`, `-e JAVA_OPTS:"-Xms${memory}m -Xmx${memory}m"`, `-p ${port}:25565`, `-v $(pwd)/../servers/${serverId}:/minecraft`, 'minecraft'], {
    detached: true,
    stdio: ['ignore', out, err],
    shell: true,
  });
  subprocess.unref();
};
