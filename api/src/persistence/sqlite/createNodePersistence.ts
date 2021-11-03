import { ApplicationContext } from "../../createApplicationContext";

type Node = {
  nodeId: String;
  ip: String;
  totalMemory: String;
  freeMemory: String;
}

type createNodePersistenceOptions = {
  node: Node;
  applicationContext: ApplicationContext;
};

export const createNodePersistence = async ({ applicationContext, node }: createNodePersistenceOptions) => {
  const { nodeId, ip, totalMemory, freeMemory } = node;
  const statement = await (await applicationContext.db).prepare(
    'REPLACE INTO `nodes` (`id`, `ip`, `total_memory`, `free_memory`) VALUES (?, ?, ?, ?)',
  );
  await statement.run(nodeId, ip, totalMemory, freeMemory);
  await statement.finalize();
};
