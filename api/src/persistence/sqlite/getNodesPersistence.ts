import { ServerNode } from '../../models/ServerNode';
import { ApplicationContext } from '../../createApplicationContext';

type getNodesPersistenceOptions = {
  applicationContext: ApplicationContext;
};
export interface getNodesInterface {
  (opts: getNodesPersistenceOptions): Promise<ServerNode[]>;
}

export const getNodesPersistence: getNodesInterface = async ({
  applicationContext,
}) => {
  const serverNodes: ServerNode[] = await (await applicationContext.db).all(
    'SELECT * from `nodes`',
  );
  return serverNodes;
};
