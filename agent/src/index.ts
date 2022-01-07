import 'dotenv/config';
import express from 'express';
import { Server as SocketServer } from 'socket.io';
import util from 'util';
import cp from 'child_process';
import cors from 'cors';

import { Server } from 'api/src/models/Server';
import { getSystemSpecs } from './getSystemSpecs';

import { registerAgentProxy } from './proxies/registerAgentProxy';
import { getServersProxy } from './proxies/getServersProxy';
import { saveServerHealthProxy } from './proxies/saveServerHealthProxy';

import { startServerCommand } from './commands/startServerCommand';
import { stopOrphanedServers } from './commands/stopOrphanedServers';
import { getServerHealth } from './commands/getServerHealth';

import { setupRoutes } from './routes';
import { onConnection } from './onConnection';

const app = express();

app.use(cors());
app.use(express.json());

setupRoutes(app);

app.listen(4444, () => {
  console.log('[AGENT] server listening on http://localhost:4444');
});

const io = new SocketServer(5000, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', onConnection);

const exec = util.promisify(cp.exec);

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

  return setInterval(() => fn(), interval);
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

  if (!servers || servers.length === 0) return;

  stopOrphanedServers({
    expectedServerIds: servers.map(({ id }) => id),
  });

  const { stdout } = await exec('docker ps');

  for (const server of servers) {
    const isServerRunningInDocker = stdout.indexOf(`mc-${server.id}`) !== -1;
    const shouldStartServer = server.running && !isServerRunningInDocker;

    if (shouldStartServer) {
      console.time(
        `starting server ${server.id}, ${server.memory}M, P ${server.port}`,
      );
      startServerCommand({
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
