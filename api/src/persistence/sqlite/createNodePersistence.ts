import { ApplicationContext } from "../../createApplicationContext";
import { ServerNode } from "./getNodesPersistence";

type createNodePersistenceOptions = {
  node: ServerNode;
  applicationContext: ApplicationContext;
};

export interface createNodePersistenceInterface {
  (opts: createNodePersistenceOptions): Promise<void>;
}

export const createNodePersistence: createNodePersistenceInterface = async ({ applicationContext, node }) => {
  const { id, ip, totalMemory, freeMemory } = node;
  const statement = await (await applicationContext.db).prepare(
    'REPLACE INTO `nodes` (`id`, `ip`, `totalMemory`, `freeMemory`) VALUES (?, ?, ?, ?)',
  );
  await statement.run(id, ip, totalMemory, freeMemory);
  await statement.finalize();
};
