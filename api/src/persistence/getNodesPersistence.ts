import { ServerNode } from '../models/ServerNode';
import { db } from './db';

export interface getNodesInterface {
  (): Promise<ServerNode[]>;
}

export const getNodesPersistence: getNodesInterface = async () => {
  return db.nodes.findMany();
};
