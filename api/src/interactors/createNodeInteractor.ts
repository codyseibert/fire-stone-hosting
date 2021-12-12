import { ApplicationContext } from '../createApplicationContext';
import { createNodePersistence } from '../persistence/sqlite/createNodePersistence';
import { ServerNode } from '../models/ServerNode';

type createNodeInteractorOptions = {
  node: ServerNode;
  applicationContext: ApplicationContext;
};

export interface createNodeInteractorInterface {
  (opts: createNodeInteractorOptions): Promise<void>;
}

export const createNodeInteractor: createNodeInteractorInterface = async ({
  applicationContext,
  node,
}) =>
  createNodePersistence({
    applicationContext,
    node,
  });
