import { Socket } from 'socket.io';
import { Tail } from 'tail';

export const onDisconnect = (socket: Socket, tail: Tail) => {
  socket.on('disconnect', () => {
    console.log('user disconnected');
    tail.unwatch();
  });
};
