const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const getServersForUserRoute = require('./routes/getServersForUser.route');
const getNodesRoute = require('./routes/getNodes.route');
const getServersOnNodeRoute = require('./routes/getServersOnNode.route');
const createNodeRoute = require('./routes/createNode.route');
const startServerRoute = require('./routes/startServer.route');
const stopServerRoute = require('./routes/stopServer.route');
const createAccountAndPurchaseServerRoute = require('./routes/createAccountAndPurchaseServer.route');
const purchaseServerRoute = require('./routes/purchaseServer.route');
const registerRoute = require('./routes/register.route');
const loginRoute = require('./routes/login.route');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/nodes', getNodesRoute);
app.get('/nodes/:nodeId/servers', getServersOnNodeRoute);
app.get('/users/:userId/servers', getServersForUserRoute);
app.post('/register', registerRoute);
app.post('/login', loginRoute);
app.post('/nodes', createNodeRoute);
app.post('/servers/:serverId/stop', stopServerRoute);
app.post('/servers/:serverId/start', startServerRoute);
app.post('/new-user-purchase', createAccountAndPurchaseServerRoute);
app.post('/existing-user-purchase', purchaseServerRoute);

app.listen(3333);
