import Logger from './utils/logger';

import App from './app';

import 'dotenv/config';

const app = new App().app;

/* Start Server */
const PORT: number = Number(process.env.PORT) || 8080;
app.listen(PORT, () => {
  Logger.info(`Server is running at http://localhost:${PORT}`);
});
