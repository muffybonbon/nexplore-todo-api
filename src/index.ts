import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

import morganMiddleware from './middlewares/morgan';

import { NodeEnvEnum } from './enums/NodeEnvEnum';

import Logger from './utils/logger';

import 'dotenv/config';

const whitelist = [process.env.UI_PATH];

/* Initialize Express Server */
const app = express();

/* Middleware Stages */
// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Network Logger
app.use(morganMiddleware);

// Security
app.use(helmet());

// CORS
const corsOptions = {
  origin: (origin: string | undefined, callback: (error: Error | null, allow: boolean) => void) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
};
app.use(cors(process.env.NODE_ENV === NodeEnvEnum.DEVELOPMENT ? {} : corsOptions));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

/* Start Server */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  Logger.info(`Server is running at http://localhost:${PORT}`);
});
