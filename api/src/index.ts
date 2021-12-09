import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';

import { setupRoutes } from './routes';

const app = express();
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

setupRoutes(app);

app.listen(3333);
