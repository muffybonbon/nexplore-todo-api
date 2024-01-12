import { Application } from 'express';

import TodoRouter from '../TodoRouter';

class RoutesManager {
  protected static API_V1_PATH = '/api/v1';

  static init(app: Application): void {
    app.use(this.API_V1_PATH, TodoRouter);
  }
}

export default RoutesManager;
