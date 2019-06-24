/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const request = require('request-promise-native');
const publicIp = require('public-ip');
const os = require('os');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const nodeId = process.env.NODE_ID || 'abc123';

const { spawn } = require('child_process');

(async function main() {
  const ip = await publicIp.v4();
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();

  await request({
    method: 'post',
    body: {
      nodeId,
      ip,
      totalMemory,
      freeMemory,
    },
    json: true,
    url: 'http://localhost:3333/nodes',
  });

  setInterval(async () => {
    const servers = await request({
      method: 'get',
      json: true,
      url: `http://localhost:3333/nodes/${nodeId}/servers`,
    });


    const { stdout: namesStdout } = await exec("docker ps --format '{{.Names}}'");
    console.log('namesStdout', namesStdout);
    const names = namesStdout.trim().split('\n').filter(n => n.length);
    console.log('names', names);
    const { stdout } = await exec('docker ps');
    console.log(servers);
    for (const name of names) {
      if (!servers.find(server => server.id === name)) {
        await exec(`docker stop ${name}`);
      }
    }

    for (const server of servers) {
      if (server.running && stdout.indexOf(server.id) === -1) {
        await exec(`mkdir -p ../servers/${server.id}`);
        await exec(`cp ../server.properties ../servers/${server.id}`);
        await exec(`docker build -t minecraft-stub -f ../minecraft-stub.Dockerfile ../servers/${server.id}`);

        const subprocess = spawn('docker', ['run', '--rm', `--name ${server.id}`, `-p ${server.port}:25565`, `-v $(pwd)/../servers/${server.id}:/minecraft`, 'minecraft-stub'], {
          detached: true,
          stdio: 'ignore',
          shell: true,
        });
        subprocess.unref();
      } else if (!server.running && stdout.indexOf(server.id) !== -1) {
        await exec(`docker stop ${server.id}`);
      }
    }
  }, 5000);
}());
