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

module.exports = () => ({
  persistence: {
    getServersForUser,
    getNodes,
    createNode,
    createServer,
    getServersOnNode,
    setFreeMemoryOnNode,
    startServer,
    stopServer,
    createUser,
  },
  interactors: {
    stopServerInteractor,
    startServerInteractor,
    getServersForUserInteractor,
    getNodesInteractor,
    getServersOnNodeInteractor,
    createNodeInteractor,
    registerInteractor,
    purchaseServerInteractor,
  },
  db,
});
