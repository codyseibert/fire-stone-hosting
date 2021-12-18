import { Express } from 'express';

import { getServerConfiguration } from './routes/getServerConfiguration';
import { updateServerConfiguration } from './routes/updateServerConfiguration';
import { restartServer } from './routes/restartServer';
import { stopServer } from './routes/stopServer';
import { startServer } from './routes/startServer';

export const setupRoutes = (app: Express) => {
  app.get('/servers/:serverId/configuration', getServerConfiguration);
  app.post('/servers/:serverId/configuration', updateServerConfiguration);
  app.post('/servers/:serverId/restart', restartServer);
  app.post('/servers/:serverId/stop', stopServer);
  app.post('/servers/:serverId/start', startServer);
};
