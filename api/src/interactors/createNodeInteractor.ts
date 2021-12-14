import { createNodePersistence } from '../persistence/createNodePersistence';
import { ServerNode } from '../models/ServerNode';

type createNodeInteractorOptions = {
  node: ServerNode;
};

export interface createNodeInteractorInterface {
  (opts: createNodeInteractorOptions): Promise<void>;
}

export const createNodeInteractor: createNodeInteractorInterface = async ({
  node,
}) =>
  createNodePersistence({
    node,
  });
