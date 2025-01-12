import * as express from 'express';
import * as compression from 'compression';
import * as cors from 'cors';
//R <dont remove this line>
import { userRoutes } from './routes/user.routes';
import { env_vars } from './config';
import helmet from 'helmet';
import * as passport from 'passport';
import errHandler from './middlewares/errHandler';
import customResponses from './middlewares/custom.middleware';
import Logger from './core/Logger';

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();

    this.routes();
  }

  public routes(): void {
    this.app.use('/api/v1/users', userRoutes.router);
    //ROUTES <dont remove this line>
    this.app.use(errHandler);
  }

  public config(): void {
    this.app.use(customResponses);
    this.app.set('port', env_vars.port || 3000);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(compression());
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(passport.initialize());
  }

  public start(): void {
    this.app.listen(this.app.get('port'), () => {
      Logger.info(
        `API is running at http://localhost: ${this.app.get('port')}`,
      );
    });
  }
}

const server = new Server();

server.start();
