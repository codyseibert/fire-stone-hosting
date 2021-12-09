import express from 'express';
import httpFn from 'http';
import { Server as SocketServer, Socket } from 'socket.io';

import util from 'util';
import { Tail } from 'tail';
import path from 'path';

import cp from 'child_process';
import fs from 'fs';
import { getSystemSpecs } from './getSystemSpecs';
import { registerAgentProxy } from './proxies/registerAgentProxy';
import { getServersProxy } from './proxies/getServersProxy';
import { runBackup } from './runBackup';
import { startServer } from './startServer';
import { saveServerHealthProxy } from './proxies/saveServerHealthProxy';
import { runCommand } from './runCommand';
import { stopServer } from './stopServer';
import { stopOrphanedServers } from './stopOrphanedServers';
import { getServerHealth } from './getServerHealth';
import dotenv from 'dotenv';
import { Server } from '../../api/src/models/Server';
import { restartServer } from './restartServer';
import cors from 'cors';

dotenv.config();

const serverMap: {
  [key: string]: any
} = {};

const app = express();
app.use(cors());
app.get('/servers/:serverId/configuration', (req, res) => {
  const serverId = req.params.serverId;
  const filePath = path.join(process.env.SERVERS_DIR, `${serverId}/server.properties`);
  res.sendFile(filePath)
})
app.post('/servers/:serverId/configuration', express.text({type: 'text/*'}), (req, res) => {
  const serverId = req.params.serverId;
  const filePath = path.join(process.env.SERVERS_DIR, `${serverId}/server.properties`);
  console.log(req.body);
  fs.writeFile(filePath, req.body, (err) => {
    res.send('success');
  });
})
app.listen(4444);
console.log('http server started on port 4444');

// const http = httpFn.createServer(app);
const io = new SocketServer(5000, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
const exec = util.promisify(cp.exec);

const POLL_INTERVAL = 5000;

io.on('connection', (socket: Socket) => {
  console.log('user connected');
  const serverId: string = socket.handshake.query.serverId as string;

  try {
    const tail = new Tail(`../servers/${serverId}/logs/latest.log`);

    fs.readFile(
      `../servers/${serverId}/logs/latest.log`,
      'utf-8',
      (err, logs) => {
        socket.emit('logs', logs);

        tail.on('line', line => {
          socket.emit('line', `${line}\n`);
        });
      },
    );

    socket.on('command', command => {
      console.log('command', command, serverId);
      runCommand({
        serverId,
        command,
      });
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
      tail.unwatch();
    });
  } catch (err) {
    socket.disconnect();
  }
});

// http.listen(5000, () => {
//   console.log('This agent is running and listening on port 5000');
// });

const nodeId = process.env.NODE_ID;

// TODO: find a way to pipe server logs to UI

const sendSystemSpecs = async () => {
  const systemSpecs = await getSystemSpecs();
  try {
    await registerAgentProxy({
      nodeId,
      ...systemSpecs,
    });
  } catch (err) {
    console.error(
      "this agent was unable to send it's system stats to the master node",
    );
  }
};

const setIntervalAndRun = (fn: Function, interval: number) => {
  fn();
  return setInterval(fn, interval);
};

const sendContainerHealth = async () => {
  let servers: Server[] = [];

  try {
    servers = await getServersProxy({ nodeId });
  } catch (err) {
    console.error(
      "unable to fetch this node's server list from the master node",
    );
  }

  for (const server of servers) {
    if (server.running) {
      let memoryPercent, cpuPercent;

      try {
        ({ memoryPercent, cpuPercent } = await getServerHealth({
          serverId: server.id,
        }));
      } catch (e) {
        console.error(
          'expected container to be running, but it was not (maybe it is about to start?)',
        );
        continue;
      }

      try {
        await saveServerHealthProxy({
          serverId: server.id,
          cpuPercent,
          memoryPercent,
        });
      } catch (err) {
        console.error(
          `unable to update the health of ${server.id} to master node`,
        );
      }
    }
  }
};


const runAgentLogic = async () => {
  let servers: Server[] = [];
  try {
    servers = await getServersProxy({ nodeId });
  } catch (err) {
    console.error(
      'unable to fetch the list of servers this agent should be running',
    );
  }

  stopOrphanedServers({
    expectedServerIds: servers.map(({ id }) => id),
  });

  const { stdout } = await exec('docker ps');

  for (const server of servers) {
    const serverId: string = server.id;
    if (server.running && stdout.indexOf(server.id) === -1 && !serverMap[serverId]) {
      serverMap[serverId] = true;
      console.time(
        `starting server ${server.id}, ${server.memory}M, P ${server.port}`,
      );
      startServer({
        serverId: server.id,
        memory: server.memory,
        port: server.port,
      }).then(() => {
        console.timeEnd(
          `starting server ${server.id}, ${server.memory}M, P ${server.port}`,
        );
      });
    } else if (!server.running && stdout.indexOf(server.id) !== -1) {
      delete serverMap[serverId];
      console.time(`stopping server ${server.id}`);
      await stopServer({
        serverId: server.id,
      });
      console.timeEnd(`stopping server ${server.id}`);
    } else if (server.restart && stdout.indexOf(server.id) !== -1) {
      console.time(`restart server ${server.id}`);
      await restartServer({
        serverId: server.id,
      });
      console.timeEnd(`restart server ${server.id}`);
    } else if (
      server.running &&
      server.runBackup &&
      stdout.indexOf(server.id) !== -1
    ) {
      // if a sesrver is running an needs a backup
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
  setIntervalAndRun(runAgentLogic, POLL_INTERVAL);
})();
