import { ApplicationContext } from "../createApplicationContext";

type createNodeInteractorOptions = {
  node: object;
  applicationContext: ApplicationContext;
};

export const createNodeInteractor = async ({ applicationContext, node }: createNodeInteractorOptions) =>
  applicationContext.persistence.createNode({
    applicationContext,
    node,
  });
