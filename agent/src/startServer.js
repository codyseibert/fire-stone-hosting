/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const { spawn } = require('child_process');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');

const out = fs.openSync('./out.log', 'a');
const err = fs.openSync('./out.log', 'a');

module.exports = async ({ serverId, memory, port }) => {
  // TODO: make a user for FTP
  // await exec('useradd bob');
  // await exec('echo bob:123 | chpasswd');

  // TODO: we should actually be using the user's FTP folder for all of this
  await exec(`mkdir -p ../servers/${serverId}`);
  await exec(`cp ../server.properties ../servers/${serverId}`);
  await exec(`docker build -t minecraft -f ../minecraft.Dockerfile ../servers/${serverId}`);
  // eslint-disable-next-line no-param-reassign
  memory = 1 * 1024 * 1024 * 1024; // TODO: remove this
  const subprocess = spawn('screen', [`-S ${serverId}`, '-d', '-m', 'docker', 'run', '--cpus="1"', '--rm', '-t', '-i', `--name ${serverId}`, `-m ${memory}b`, `-e JAVA_OPTS:"-Xms${memory}b -Xmx${memory}b"`, `-p ${port}:25565`, `-v $(pwd)/../servers/${serverId}:/minecraft`, 'minecraft'], {
    detached: true,
    stdio: ['ignore', out, err],
    shell: true,
  });
  subprocess.unref();
};
