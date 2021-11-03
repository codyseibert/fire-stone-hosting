import { ApplicationContext } from "../createApplicationContext";

type getServersForUserInteractorOptions = {
  userId: string;
  applicationContext: ApplicationContext;
};

export const getServersForUserInteractor = async ({ userId, applicationContext }: getServersForUserInteractorOptions) =>
  applicationContext.persistence.getServersForUser({
    userId,
    applicationContext,
  });
