/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const util = require('util');
const { Tail } = require('tail');

const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const getSystemSpecs = require('./getSystemSpecs');
const registerAgent = require('./registerAgent.http');
const getServers = require('./getServers.http');
const runBackup = require('./runBackup');
const startServer = require('./startServer');
const saveServerHealth = require('./saveServerHealth.http');
const runCommand = require('./runCommand');
const stopServer = require('./stopServer');
const stopOrphanedServers = require('./stopOrphanedServers');
const getServerHealth = require('./getServerHealth');

io.on('connection', (socket) => {
  console.log('a user connected');
  // TODO: work in progress
  const tail = new Tail('../servers/c02f528d-52c3-42b9-82cb-7039d1e04a0c/logs/latest.log');

  fs.readFile('../servers/c02f528d-52c3-42b9-82cb-7039d1e04a0c/logs/latest.log', 'utf-8', (err, logs) => {
    socket.emit('logs', logs);

    tail.on('line', (line) => {
      socket.emit('line', `${line}\n`);
    });
  });

  socket.on('command', (command) => {
    console.log('command', command);
    runCommand({
      serverId: 'c02f528d-52c3-42b9-82cb-7039d1e04a0c',
      command,
    });
  });

  socket.on('disconnect', () => {
    tail.unwatch();
  });
});

http.listen(5000, () => {
  console.log('listening on *:5000');
});

const nodeId = process.env.NODE_ID || 'abc123';

// TODO: start an http that listens for commands to send to the server

// TODO: find a way to pipe server logs to UI

const sendSystemSpecs = async () => {
  const systemSpecs = await getSystemSpecs();
  await registerAgent({
    nodeId,
    ...systemSpecs,
  });
};

const setIntervalAndRun = (fn, interval) => {
  fn();
  return setInterval(fn, interval);
};

const sendContainerHealth = async () => {
  const servers = await getServers({ nodeId });

  for (const server of servers) {
    if (server.running) {
      try {
        const { memoryPercent, cpuPercent } = await getServerHealth({ serverId: server.id });
        await saveServerHealth({ serverId: server.id, cpuPercent, memoryPercent });
      } catch (e) {
        console.error('expected container to be running, but it was not (maybe it is about to start?)');
      }
    }
  }
};


const runAgentLogic = async () => {
  const servers = await getServers({ nodeId });

  stopOrphanedServers({
    expectedServerIds: servers.map(s => s.id),
  });

  const { stdout } = await exec('docker ps');

  for (const server of servers) {
    if (server.running && stdout.indexOf(server.id) === -1) {
      console.time(`starting server ${server.id}`);
      startServer({
        serverId: server.id,
        memory: server.memory,
        port: server.port,
      }).then(() => {
        console.timeEnd(`starting server ${server.id}`);
      });
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
};

(async function main() {
  setIntervalAndRun(sendSystemSpecs, 5000);
  setIntervalAndRun(sendContainerHealth, 5000);
  setIntervalAndRun(runAgentLogic, 5000);
}());
