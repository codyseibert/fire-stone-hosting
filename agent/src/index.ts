import express from 'express';
import { Server as SocketServer, Socket } from 'socket.io';

import util from 'util';
import { Tail } from 'tail';
import path from 'path';

import cp from 'child_process';
import fs from 'fs';
import { getSystemSpecs } from './getSystemSpecs';
import { registerAgentProxy } from './proxies/registerAgentProxy';
import { getServersProxy } from './proxies/getServersProxy';
import { startServer } from './startServer';
import { saveServerHealthProxy } from './proxies/saveServerHealthProxy';
import { runCommand } from './runCommand';
import { stopServer } from './stopServer';
import { stopOrphanedServers } from './stopOrphanedServers';
import { getServerHealth } from './getServerHealth';
import dotenv from 'dotenv';
import { Server } from 'api/src/models/Server';
import { restartServer } from './restartServer';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());

app.get('/servers/:serverId/configuration', (req, res) => {
  const serverId = req.params.serverId;
  const filePath = path.join(
    process.env.SERVERS_DIR,
    `${serverId}/server.properties`,
  );
  res.sendFile(filePath);
});

app.post(
  '/servers/:serverId/configuration',
  express.text({ type: 'text/*' }),
  (req, res) => {
    const serverId = req.params.serverId;
    const filePath = path.join(
      process.env.SERVERS_DIR,
      `${serverId}/server.properties`,
    );
    console.log(req.body);
    fs.writeFile(filePath, req.body, err => {
      res.send('success');
    });
  },
);

app.post('/servers/:serverId/restart', async (req, res) => {
  const serverId = req.params.serverId;
  console.log('restarting', serverId);
  await restartServer({ serverId });
  res.json({ message: 'server restarting' });
});

app.post('/servers/:serverId/stop', async (req, res) => {
  const serverId = req.params.serverId;
  console.log('stopping', serverId);
  await stopServer({ serverId });
  res.json({ message: 'server stopped' });
});

app.post('/servers/:serverId/start', async (req, res) => {
  const serverId = req.params.serverId;
  console.log('starting', serverId);
  await startServer({ serverId });
  res.json({ message: 'server started' });
});

app.listen(4444, () => {
  console.log('[AGENT] server listening on http://localhost:4444');
});

// const http = httpFn.createServer(app);
const io = new SocketServer(5000, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
const exec = util.promisify(cp.exec);

const POLL_INTERVAL = 10000;

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

    // socket.on('start', () => {
    //   console.log('start', serverId);
    //   startServer({
    //     serverId,
    //   });
    // });

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

const startRunningServers = async () => {
  const servers = await getServersProxy({ nodeId });
  console.log('servers', servers);

  stopOrphanedServers({
    expectedServerIds: servers.map(({ id }) => id),
  });

  const { stdout } = await exec('docker ps');

  for (const server of servers) {
    const isServerRunningInDocker = stdout.indexOf(server.id) === -1;
    if (server.running && isServerRunningInDocker) {
      console.time(
        `starting server ${server.id}, ${server.memory}M, P ${server.port}`,
      );
      startServer({
        serverId: server.id,
      }).then(() => {
        console.timeEnd(
          `starting server ${server.id}, ${server.memory}M, P ${server.port}`,
        );
      });
    }
  }
};

(async function main() {
  setIntervalAndRun(sendSystemSpecs, 5000);
  // setIntervalAndRun(sendContainerHealth, 5000);
  // setIntervalAndRun(runAgentLogic, POLL_INTERVAL);
  startRunningServers();
})();
