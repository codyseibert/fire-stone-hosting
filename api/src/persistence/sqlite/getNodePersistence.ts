import { ApplicationContext } from '../../createApplicationContext';
import { ServerNode } from './getNodesPersistence';

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
  const serverNodes: ServerNode[] = await (await applicationContext.db).all(
    'SELECT * from `nodes` where id = ?',
    [nodeId],
  );
  return serverNodes.length ? serverNodes[0] : null;
};
