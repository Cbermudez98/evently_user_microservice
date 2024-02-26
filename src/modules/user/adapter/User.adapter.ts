import { IManagerRouter } from '../../../interfaces/IManager.router';
import { Router, Response } from 'express';
import { IRouterAdapter } from '../../../interfaces/IRouter.adapter';
import { IUserController } from '../interfaces/controller/IUserController';
import handlerContainer from '../../../inversify/Containers';
import { Types } from '../../../inversify/Types';
import { ISchemaValidator } from '../../../interfaces/ISchema.middleware';
import { userCreateSchema } from '../schema/User.schema';
import { IRequest } from '../../../interfaces/IRequest';

export class UserAdapter implements IRouterAdapter {
  private readonly _userRouter: Router;
  private readonly _userController: IUserController;
  private readonly _routerManager: IManagerRouter;
  private readonly _schemaMiddleware: ISchemaValidator;

  constructor() {
    this._userRouter = Router();
    this._userController = handlerContainer.get<IUserController>(
      Types.USER_CONTROLLER,
    );
    this._routerManager = handlerContainer.get<IManagerRouter>(
      Types.ROUTER_MANAGER,
    );
    this._schemaMiddleware = handlerContainer.get<ISchemaValidator>(
      Types.SCHEMA_MIDDLEWARE,
    );
  }

  initRoute(): Router {
    this._userRouter.post(
      '/',
      this._schemaMiddleware.validate(userCreateSchema),
      (req: IRequest, res: Response) => {
        this._routerManager.handler(
          this._userController.createUser(req.body),
          req,
          res,
        );
      },
    );
    return this._userRouter;
  }
}
