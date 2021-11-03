const db = require('./persistence/sqlite/db');
const getNodes = require('./persistence/sqlite/getNodes.persistence');
const createNode = require('./persistence/sqlite/createNode.persistence');
const getServersOnNode = require('./persistence/sqlite/getServersOnNode.persistence');
const getServersForUser = require('./persistence/sqlite/getServersForUser.persistence');
const getServersForUserInteractor = require('./interactors/getServersForUser.interactor');
const getNodesInteractor = require('./interactors/getNodes.interactor');
const createNodeInteractor = require('./interactors/createNode.interactor');
const getServersOnNodeInteractor = require('./interactors/getServersOnNode.interactor');
const purchaseServerInteractor = require('./interactors/purchaseServer.interactor');
const setFreeMemoryOnNode = require('./persistence/sqlite/setFreeMemoryOnNode.persistence');
const createServer = require('./persistence/sqlite/createServer.persistence');
const stopServerInteractor = require('./interactors/stopServer.interactor');
const startServerInteractor = require('./interactors/startServer.interactor');
const stopServer = require('./persistence/sqlite/stopServer.persistence');
const startServer = require('./persistence/sqlite/startServer.persistence');
const createUser = require('./persistence/sqlite/createUser.persistence');
const registerInteractor = require('./interactors/register.interactor');
const getUser = require('./persistence/sqlite/getUser.persistence');
const loginInteractor = require('./interactors/login.interactor');
const runBackupInteractor = require('./interactors/runBackup.interactor');
const backupCompleteInteractor = require('./interactors/backupComplete.interactor');
const createAccountAndPurchaseServerInteractor = require('./interactors/createAccountAndPurchaseServer.interactor');
const runBackup = require('./persistence/sqlite/runBackup.persistence');
const backupComplete = require('./persistence/sqlite/backupComplete.persistence');
const setServerHealthInteractor = require('./interactors/setServerHealth.interactor');
const setServerHealth = require('./persistence/sqlite/setServerHealth.persistence');
const getServerInteractor = require('./interactors/getServer.interactor');
const getServer = require('./persistence/sqlite/getServer.persistence');

module.exports = () => ({
  persistence: {
    getServersForUser,
    getNodes,
    createNode,
    createServer,
    getServersOnNode,
    setFreeMemoryOnNode,
    startServer,
    getServer,
    stopServer,
    createUser,
    getUser,
    runBackup,
    setServerHealth,
    backupComplete,
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
