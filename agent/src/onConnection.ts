import { Socket } from 'socket.io';
import { Tail } from 'tail';
import path from 'path';
import fs from 'fs';

import { onCommand } from './ws/onCommand';
import { onDisconnect } from './ws/onDisconnect';

export const getServerLastestLog = (serverId: string) =>
  path.resolve(__dirname, `../servers/${serverId}/logs/latest.log`);

export const onConnection = (socket: Socket) => {
  try {
    console.log('user connected');

    const serverId: string = socket.handshake.query.serverId as string;

    const logsPath = getServerLastestLog(serverId);

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
