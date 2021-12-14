import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { setupRoutes } from './routes';

const app = express();
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

setupRoutes(app);

app.listen(3333, () => {
  console.log('[API] server listening on http://localhost:3333');
});
