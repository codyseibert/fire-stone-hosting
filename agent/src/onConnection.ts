import { Socket } from 'socket.io';
import { Tail } from 'tail';
import path from 'path';
import fs from 'fs';

import { onCommand } from './ws/onCommand';
import { onDisconnect } from './ws/onDisconnect';

export const onConnection = (socket: Socket) => {
  try {
    console.log('user connected');

    const serverId: string = socket.handshake.query.serverId as string;

    const logsPath = path.join(
      process.env.SERVERS_DIR,
      `/${serverId}/logs/latest.log`,
    );

    try {
      // TODO: sometimes this crashes if the user
      // tries to access the server logs before the server is started
      // which means the user will never get the logs in their UI
      const tail = new Tail(logsPath);

      fs.readFile(logsPath, 'utf-8', (_, logs) => {
        socket.emit('logs', logs);

        tail.on('line', line => {
          socket.emit('line', `${line}\n`);
        });
      });

      onCommand(socket);
      onDisconnect(socket, tail);
    } catch (err) {
      console.error(err);
      // we should probably do some type of retry
    }
  } catch (err) {
    socket.disconnect();
  }
};
