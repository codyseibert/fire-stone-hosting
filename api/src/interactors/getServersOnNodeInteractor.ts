import { ApplicationContext } from "../createApplicationContext";

type getServersOnNodeInteractorOptions = {
  nodeId: String;
  applicationContext: ApplicationContext;
};

export const getServersOnNodeInteractor = async ({ nodeId, applicationContext }: getServersOnNodeInteractorOptions) =>
  applicationContext.persistence.getServersOnNode({
    nodeId,
    applicationContext,
  });

