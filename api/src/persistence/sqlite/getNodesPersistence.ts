import { ApplicationContext } from "../../createApplicationContext";

export type ServerNode = {
  id: string;
  ip: string;
  totalMemory: number;
  freeMemory: number;
}

type getNodesPersistenceOptions = {
  applicationContext: ApplicationContext;
};
export interface getNodesInterface {
  (opts: getNodesPersistenceOptions): Promise<ServerNode[]>
}

export const getNodesPersistence: getNodesInterface = async ({ applicationContext }) => {
  const serverNodes: ServerNode[] = await (await applicationContext.db).all('SELECT * from `nodes`')
  return serverNodes;
}
  
