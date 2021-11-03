import { ApplicationContext } from "../../createApplicationContext";

type setServerHealthPersistenceOptions = {
  serverId: String;
  cpuPercent: String;
  memoryPercent: String;
  applicationContext: ApplicationContext;
};

export const setServerHealthPersistence = async ({
  applicationContext,
  serverId,
  cpuPercent,
  memoryPercent,
}: setServerHealthPersistenceOptions) => {
  const statement = await (await applicationContext.db).prepare(
    'UPDATE `servers` SET `cpuPercent` = ?, `memoryPercent` = ? WHERE `id` = ?',
  );
  await statement.run(cpuPercent, memoryPercent, serverId);
  await statement.finalize();
};
