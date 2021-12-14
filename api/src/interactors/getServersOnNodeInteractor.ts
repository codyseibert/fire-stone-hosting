import { getServersOnNodePersistence } from '../persistence/getServersOnNodePersistence';

type getServersOnNodeInteractorOptions = {
  nodeId: string;
};

export const getServersOnNodeInteractor = async ({
  nodeId,
}: getServersOnNodeInteractorOptions) =>
  getServersOnNodePersistence({
    nodeId,
  });
