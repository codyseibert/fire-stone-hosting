import * as sqlite from 'sqlite';

import { db } from './persistence/sqlite/db';

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
} from './persistence/sqlite/getNodesPersistence';
import { createNodePersistence } from './persistence/sqlite/createNodePersistence';
import { getServersOnNodePersistence } from './persistence/sqlite/getServersOnNodePersistence';
import { getServersForUserPersistence } from './persistence/sqlite/getServersForUserPersistence';
import { setFreeMemoryOnNodePersistence } from './persistence/sqlite/setFreeMemoryOnNodePersistence';
import { createServerPersistence } from './persistence/sqlite/createServerPersistence';
import { stopServerPersistence } from './persistence/sqlite/stopServerPersistence';
import { startServerPersistence } from './persistence/sqlite/startServerPersistence';
import { createUserPersistence } from './persistence/sqlite/createUserPersistence';
import { getUserPersistence } from './persistence/sqlite/getUserPersistence';
import { runBackupPersistence } from './persistence/sqlite/runBackupPersistence';
import { backupCompletePersistence } from './persistence/sqlite/backupCompletePersistence';
import { setServerHealthPersistence } from './persistence/sqlite/setServerHealthPersistence';
import { getServerPersistence } from './persistence/sqlite/getServerPersistence';

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
  db: Promise<sqlite.Database>;
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
