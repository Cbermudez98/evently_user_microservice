import express, { Application } from 'express';
import morgan from 'morgan';
import Logger from '../utils/Logger';
import { UserAdapter } from '../modules/user/adapter/User.adapter';
import { AuthAdapter } from '../modules/auth/adapter/Auth.adapter';

class App {
  private readonly _app: Application;

  constructor() {
    this._app = express();
    this.setMiddlewares();
    this.initRoutes();
  }

  getApp(): Application {
    return this._app;
  }

  listen(port: number) {
    this._app.listen(port, () => {
      Logger.info(`Server running at port ${port}`);
    });
  }

  private initRoutes() {
    this._app.use('/user', new UserAdapter().initRoute());
    this._app.use('/auth', new AuthAdapter().initRoute());
  }

  private setMiddlewares() {
    this._app.use(express.json());
    this._app.use(morgan('dev'));
  }
}

export default new App();