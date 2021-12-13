import { ServerNode } from '../models/ServerNode';
import { ApplicationContext } from '../createApplicationContext';

type getNodesPersistenceOptions = {
  applicationContext: ApplicationContext;
};
export interface getNodesInterface {
  (opts: getNodesPersistenceOptions): Promise<ServerNode[]>;
}

export const getNodesPersistence: getNodesInterface = async ({
  applicationContext,
}) => {
  return applicationContext.db.nodes.findMany();
};
