import { Express } from 'express';

import { getServersForUserRoute } from './routes/getServersForUserRoute';
import { getServerRoute } from './routes/getServerRoute';
import { getNodesRoute } from './routes/getNodesRoute';
import { getServersOnNodeRoute } from './routes/getServersOnNodeRoute';
import { createNodeRoute } from './routes/createNodeRoute';
import { startServerRoute } from './routes/startServerRoute';
import { stopServerRoute } from './routes/stopServerRoute';
import { createAccountAndPurchaseServerRoute } from './routes/createAccountAndPurchaseServerRoute';
import { purchaseServerRoute } from './routes/purchaseServerRoute';
import { registerRoute } from './routes/registerRoute';
import { loginRoute } from './routes/loginRoute';
import { runBackupRoute } from './routes/runBackupRoute';
import { backupCompleteRoute } from './routes/backupCompleteRoute';
import { setServerHealthRoute } from './routes/setServerHealthRoute';
import { isAuthenticated } from './middleware/isAuthenticated';
import { deleteServerRoute } from './routes/deleteServerRoute';
import { getPlansRoute } from './routes/getPlansRoute';
import { restartServerRoute } from './routes/restartServerRoute';
import { getNodeRoute } from './routes/getNodeRoute';
import { getMCVersionsRoute } from './routes/getMCVersionsRoute';

export const setupRoutes = (app: Express) => {
  app.get('/plans', getPlansRoute);

  app.get('/nodes', getNodesRoute);
  app.post('/nodes', createNodeRoute);
  app.get('/nodes/:nodeId', getNodeRoute);
  app.get('/nodes/:nodeId/servers', getServersOnNodeRoute);
  app.get('/users/:userId/servers', getServersForUserRoute);

  app.post('/register', registerRoute);
  app.post('/login', loginRoute);

  app.get('/servers/:serverId', getServerRoute);
  app.delete('/servers/:serverId', isAuthenticated, deleteServerRoute);
  app.post('/servers/:serverId/stop', stopServerRoute);
  app.post('/servers/:serverId/start', startServerRoute);
  app.post('/servers/:serverId/restart', restartServerRoute);
  app.post('/servers/:serverId/health', setServerHealthRoute);
  app.post('/servers/:serverId/run-backup', runBackupRoute);
  app.post('/servers/:serverId/backup-complete', backupCompleteRoute);

  app.post('/new-user-purchase', createAccountAndPurchaseServerRoute);
  app.post('/existing-user-purchase', isAuthenticated, purchaseServerRoute);

  app.get('/versions', getMCVersionsRoute);
};
