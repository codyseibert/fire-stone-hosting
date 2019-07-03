/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const getSystemSpecs = require('./getSystemSpecs');
const registerAgent = require('./registerAgent.http');
const getServers = require('./getServers.http');
const runBackup = require('./runBackup');
const startServer = require('./startServer');
const stopServer = require('./stopServer');
const stopOrphanedServers = require('./stopOrphanedServers');

const nodeId = process.env.NODE_ID || 'abc123';

// TODO: start an http that listens for commands to send to the server

// TODO: find a way to pipe server logs to UI

(async function main() {
  setInterval(async () => {
    const systemSpecs = await getSystemSpecs();
    await registerAgent({
      nodeId,
      ...systemSpecs,
    });
  }, 5000);

  const agentTick = async () => {
    const servers = await getServers({ nodeId });

    await stopOrphanedServers({
      expectedServerIds: servers.map(s => s.id),
    });

    const { stdout } = await exec('docker ps');

    for (const server of servers) {
      if (server.running && stdout.indexOf(server.id) === -1) {
        console.time(`starting server ${server.id}`);
        await startServer({
          serverId: server.id,
          memory: server.memory,
          port: server.port,
        });
        console.timeEnd(`starting server ${server.id}`);
      } else if (!server.running && stdout.indexOf(server.id) !== -1) {
        console.time(`stopping server ${server.id}`);
        await stopServer({
          serverId: server.id,
        });
        console.timeEnd(`stopping server ${server.id}`);
      } else if (server.running && server.runBackup && stdout.indexOf(server.id) !== -1) { // if a sesrver is running an needs a backup
        console.time(`backup for ${server.id}`);
        await runBackup({
          serverId: server.id,
        });
        console.timeEnd(`backup for ${server.id}`);
      }
    }

    setTimeout(agentTick, 5000);
  };

  setTimeout(agentTick, 5000);
}());
