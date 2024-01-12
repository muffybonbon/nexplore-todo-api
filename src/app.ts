import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

import morganMiddleware from './middlewares/morgan';

import { NodeEnvEnum } from './enums/NodeEnvEnum';

class App {
  public app: Application;
  private whitelist = [process.env.UI_PATH];

  constructor() {
    /* Initialize Express Server */
    this.app = express();
    this.initializeMiddlewares();
  }

  protected initializeMiddlewares(): void {
    // Network Logger
    this.app.use(morganMiddleware);

    // Network
    this.app.use(cors(process.env.NODE_ENV === NodeEnvEnum.DEVELOPMENT ? {} : this.getCORSOptions()));

    // Security
    this.app.use(helmet());

    // Body Parser
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
  }

  protected getCORSOptions(): cors.CorsOptions {
    return {
      origin: (origin: string | undefined, callback: (error: Error | null, allow: boolean) => void) => {
        if (this.whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'), false);
        }
      },
    };
  }
}

export default new App().app;
