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
    socket.disconnect();
  }
};
