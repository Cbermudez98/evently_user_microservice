import 'reflect-metadata';
import { Container } from 'inversify';
import { Types } from './Types';
import { IManagerRouter } from '../interfaces/IManager.router';
import { ManagerRouter } from '../helper/ManagerRouter';
import { IUserController } from '../modules/user/interfaces/controller/IUserController';
import { UserController } from '../modules/user/controller/User.controller';
import { IUserService } from '../modules/user/interfaces/service/IUserService';
import { UserService } from '../modules/user/service/User.service';
import { IJwt } from '../interfaces/IJwt';
import { Jwt } from '../utils/Jwt';
import { ISchemaValidator } from '../interfaces/ISchema.middleware';
import { SchemaValidator } from '../middlewares/Schema.middleware';
import { IAuthService } from '../modules/auth/interfaces/IAuthService';
import { AuthService } from '../modules/auth/service/Auth.service';
import { IBcrypt } from '../interfaces/IBcrypt';
import { Bcrypt } from '../utils/Bcrypt';
import { IAuthController } from '../modules/auth/interfaces/IAuthController';
import { AuthController } from '../modules/auth/controller/Auth.controller';

const handlerContainer = new Container();

handlerContainer.bind<IManagerRouter>(Types.ROUTER_MANAGER).to(ManagerRouter);
handlerContainer
  .bind<IUserController>(Types.USER_CONTROLLER)
  .to(UserController);
handlerContainer.bind<IUserService>(Types.USER_SERVICE).to(UserService);
handlerContainer.bind<IJwt>(Types.JWT).to(Jwt);
handlerContainer
  .bind<ISchemaValidator>(Types.SCHEMA_MIDDLEWARE)
  .to(SchemaValidator);
handlerContainer.bind<IAuthService>(Types.AUTH_SERVICE).to(AuthService);
handlerContainer
  .bind<IAuthController>(Types.AUTH_CONTROLLER)
  .to(AuthController);
handlerContainer.bind<IBcrypt>(Types.BCRYPT).to(Bcrypt);

export default handlerContainer;
