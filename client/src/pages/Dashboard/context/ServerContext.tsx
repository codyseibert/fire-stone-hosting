import React from 'react';
import { Server } from '../../../../../api/src/models/Server';

export interface IServerContext {
  server: Server | undefined;
  setServer: React.Dispatch<
    React.SetStateAction<Server | undefined>
  >;
}

export const ServerContext =
  React.createContext<IServerContext | null>(null);
