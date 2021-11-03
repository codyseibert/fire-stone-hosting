import { ApplicationContext } from "../../createApplicationContext";

type getServersOnNodePersistenceOptions = {
  nodeId: String;
  applicationContext: ApplicationContext;
};

export const getServersOnNodePersistence = async ({ applicationContext, nodeId }: getServersOnNodePersistenceOptions) => {
  return (await applicationContext.db).all(
    'SELECT * from `servers` WHERE `nodeId` = ?',
    [nodeId],
  );
};
