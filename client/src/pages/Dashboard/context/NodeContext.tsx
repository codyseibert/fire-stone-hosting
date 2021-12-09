import React from 'react';
import { ServerNode } from '../../../../../api/src/persistence/sqlite/getNodesPersistence';

export interface INodeContext {
  node: ServerNode | undefined;
  setNode: React.Dispatch<
    React.SetStateAction<ServerNode | undefined>
  >;
}

export const NodeContext =
  React.createContext<INodeContext | null>(null);
