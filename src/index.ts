import express, { Request, Response } from 'express';

import morganMiddleware from './middlewares/morgan';

import Logger from './utils/logger';

import 'dotenv/config';

const { PORT } = process.env;

/* Initialize Express Server */
const app = express();

/* Middleware Stages */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

/* Start Server */
app.listen(PORT, () => {
  Logger.info(`Server is running at http://localhost:${PORT}`);
});
