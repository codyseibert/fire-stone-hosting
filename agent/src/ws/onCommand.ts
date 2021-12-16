import { Socket } from 'socket.io';
import { runCommand } from '../runCommand';

export const onCommand = (socket: Socket) => {
  const serverId: string = socket.handshake.query.serverId as string;

  socket.on('command', command => {
    console.log('command', command, serverId);

    runCommand({
      serverId,
      command,
    });
  });
};
