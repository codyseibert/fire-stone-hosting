import { ApplicationContext } from "../../createApplicationContext";

type setFreeMemoryOnNodePersistenceOptions = {
  nodeId: String;
  freeMemory: String;
  applicationContext: ApplicationContext;
};

export const setFreeMemoryOnNodePersistence = async ({ applicationContext, freeMemory, nodeId }: setFreeMemoryOnNodePersistenceOptions) => {
  const statement = await (await applicationContext.db).prepare(
    'UPDATE `nodes` SET `freeMemory` = ? WHERE `id` = ?',
  );
  await statement.run(freeMemory, nodeId);
  await statement.finalize();
};
