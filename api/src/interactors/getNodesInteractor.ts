import { ApplicationContext } from "../createApplicationContext";

type getNodesInteractorOptions = {
  applicationContext: ApplicationContext;
};

export const getNodesInteractor = async ({ applicationContext }: getNodesInteractorOptions) =>
  applicationContext.persistence.getNodes({
    applicationContext,
  });
