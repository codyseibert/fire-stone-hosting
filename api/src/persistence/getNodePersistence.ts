import { ApplicationContext } from '../createApplicationContext';
import { ServerNode } from '../models/ServerNode';

type getNodePersistenceOptions = {
  applicationContext: ApplicationContext;
  nodeId: string;
};
export interface getNodeInterface {
  (opts: getNodePersistenceOptions): Promise<ServerNode>;
}

export const getNodePersistence: getNodeInterface = async ({
  applicationContext,
  nodeId,
}) => {
  return applicationContext.db.nodes.findUnique({
    where: {
      id: nodeId,
    },
  });
};
