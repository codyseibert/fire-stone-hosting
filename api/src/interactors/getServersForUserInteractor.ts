import { getServersForUserPersistence } from '../persistence/getServersForUserPersistence';

type getServersForUserInteractorOptions = {
  userId: string;
};

export const getServersForUserInteractor = async ({
  userId,
}: getServersForUserInteractorOptions) =>
  getServersForUserPersistence({
    userId,
  });
