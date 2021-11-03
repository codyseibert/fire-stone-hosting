import { ApplicationContext } from "../../createApplicationContext";

type getNodesPersistenceOptions = {
  applicationContext: ApplicationContext;
};


export const getNodesPersistence = async ({ applicationContext }: getNodesPersistenceOptions) =>
  (await applicationContext.db).all('SELECT * from `nodes`');
