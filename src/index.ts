import { Request, Response } from 'express';

import Logger from './utils/logger';

import app from './app';

import 'dotenv/config';

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

/* Start Server */
const PORT: number = Number(process.env.PORT) || 8080;
app.listen(PORT, () => {
  Logger.info(`Server is running at http://localhost:${PORT}`);
});
