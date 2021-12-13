import { PrismaClient } from '@prisma/client';

import { db } from './persistence/db';

import { getServersForUserInteractor } from './interactors/getServersForUserInteractor';
import { getNodesInteractor } from './interactors/getNodesInteractor';
import { createNodeInteractor } from './interactors/createNodeInteractor';
import { getServersOnNodeInteractor } from './interactors/getServersOnNodeInteractor';
import { purchaseServerInteractor } from './interactors/purchaseServerInteractor';
import { stopServerInteractor } from './interactors/stopServerInteractor';
import { startServerInteractor } from './interactors/startServerInteractor';
import { registerInteractor } from './interactors/registerInteractor';
import { loginInteractor } from './interactors/loginInteractor';
import { runBackupInteractor } from './interactors/runBackupInteractor';
import { backupCompleteInteractor } from './interactors/backupCompleteInteractor';
import { createAccountAndPurchaseServerInteractor } from './interactors/createAccountAndPurchaseServerInteractor';
import { setServerHealthInteractor } from './interactors/setServerHealthInteractor';
import { getServerInteractor } from './interactors/getServerInteractor';

import {
  getNodesInterface,
  getNodesPersistence,
} from './persistence/getNodesPersistence';
import { createNodePersistence } from './persistence/createNodePersistence';
import { getServersOnNodePersistence } from './persistence/getServersOnNodePersistence';
import { getServersForUserPersistence } from './persistence/getServersForUserPersistence';
import { setFreeMemoryOnNodePersistence } from './persistence/setFreeMemoryOnNodePersistence';
import { createServerPersistence } from './persistence/createServerPersistence';
import { stopServerPersistence } from './persistence/stopServerPersistence';
import { startServerPersistence } from './persistence/startServerPersistence';
import { createUserPersistence } from './persistence/createUserPersistence';
import { getUserPersistence } from './persistence/getUserPersistence';
import { runBackupPersistence } from './persistence/runBackupPersistence';
import { backupCompletePersistence } from './persistence/backupCompletePersistence';
import { setServerHealthPersistence } from './persistence/setServerHealthPersistence';
import { getServerPersistence } from './persistence/getServerPersistence';

export type ApplicationContext = {
  persistence: {
    getServersForUser: Function;
    getNodes: getNodesInterface;
    createNode: Function;
    createServer: Function;
    getServersOnNode: Function;
    setFreeMemoryOnNode: Function;
    startServer: Function;
    getServer: Function;
    stopServer: Function;
    createUser: Function;
    getUser: Function;
    runBackup: Function;
    setServerHealth: Function;
    backupComplete: Function;
  };
  interactors: {
    loginInteractor: Function;
    stopServerInteractor: Function;
    runBackupInteractor: Function;
    setServerHealthInteractor: Function;
    backupCompleteInteractor: Function;
    startServerInteractor: Function;
    getServerInteractor: Function;
    getServersForUserInteractor: Function;
    getNodesInteractor: Function;
    getServersOnNodeInteractor: Function;
    createNodeInteractor: Function;
    registerInteractor: Function;
    createAccountAndPurchaseServerInteractor: Function;
    purchaseServerInteractor: Function;
  };
  db: PrismaClient;
};

export const createApplicationContext = (): ApplicationContext => ({
  persistence: {
    getServersForUser: getServersForUserPersistence,
    getNodes: getNodesPersistence,
    createNode: createNodePersistence,
    createServer: createServerPersistence,
    getServersOnNode: getServersOnNodePersistence,
    setFreeMemoryOnNode: setFreeMemoryOnNodePersistence,
    startServer: startServerPersistence,
    getServer: getServerPersistence,
    stopServer: stopServerPersistence,
    createUser: createUserPersistence,
    getUser: getUserPersistence,
    runBackup: runBackupPersistence,
    setServerHealth: setServerHealthPersistence,
    backupComplete: backupCompletePersistence,
  },
  interactors: {
    loginInteractor,
    stopServerInteractor,
    runBackupInteractor,
    setServerHealthInteractor,
    backupCompleteInteractor,
    startServerInteractor,
    getServerInteractor,
    getServersForUserInteractor,
    getNodesInteractor,
    getServersOnNodeInteractor,
    createNodeInteractor,
    registerInteractor,
    createAccountAndPurchaseServerInteractor,
    purchaseServerInteractor,
  },
  db,
});
