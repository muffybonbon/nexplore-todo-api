import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

import morganMiddleware from './middlewares/morgan';
import errorMiddleware from './middlewares/errorMiddleware';

import RoutesManager from './routers/base/RoutesManager';

import { HTTPStatusEnum } from './enums/HTTPStatusEnum';
import { NodeEnvEnum } from './enums/NodeEnvEnum';

class App {
  public app: Application;
  private whitelist = [process.env.UI_PATH];

  constructor() {
    /* Initialize Express Server */
    this.app = express();
    this.initializeMiddlewares();
    this.initializeHealthCheckRoutes();
    RoutesManager.init(this.app);
    this.initializeErrorHandling();
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

  protected initializeHealthCheckRoutes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      res.status(HTTPStatusEnum.OK).send({ message: 'Server is healthy' });
    });
  }

  protected initializeErrorHandling(): void {
    this.app.use(errorMiddleware);
  }
}

export default App;
