import { ApplicationContext } from "../../createApplicationContext";
import { Server } from "./createServerPersistence";

type getServersOnNodePersistenceOptions = {
  nodeId: String;
  applicationContext: ApplicationContext;
};

interface getServersOnNodePersistenceInterface {
  (opts: getServersOnNodePersistenceOptions): Promise<Server[]>
}

export const getServersOnNodePersistence: getServersOnNodePersistenceInterface = async ({ applicationContext, nodeId }) => {
  return (await applicationContext.db).all(
    'SELECT * from `servers` WHERE `nodeId` = ?',
    [nodeId],
  );
};
