import { Response, Router } from 'express';
import { IRouterAdapter } from './../../../interfaces/IRouter.adapter';
import { IAuthController } from '../interfaces/IAuthController';
import handlerContainer from '../../../inversify/Containers';
import { Types } from '../../../inversify/Types';
import { ISchemaValidator } from '../../../interfaces/ISchema.middleware';
import { loginSchema } from '../schemas/Auth.schema';
import { IManagerRouter } from '../../../interfaces/IManager.router';
import { IRequest } from '../../../interfaces/IRequest';
export class AuthAdapter implements IRouterAdapter {
  private readonly _authRoute: Router;
  private readonly _authController: IAuthController;
  private readonly _schemaValidator: ISchemaValidator;
  private readonly _routerManager: IManagerRouter;
  constructor() {
    this._authRoute = Router();
    this._authController = handlerContainer.get<IAuthController>(
      Types.AUTH_CONTROLLER,
    );
    this._schemaValidator = handlerContainer.get<ISchemaValidator>(
      Types.SCHEMA_MIDDLEWARE,
    );
    this._routerManager = handlerContainer.get<IManagerRouter>(
      Types.ROUTER_MANAGER,
    );
  }

  initRoute(): Router {
    this._authRoute.post(
      '/',
      this._schemaValidator.validate(loginSchema),
      (req: IRequest, res: Response) => {
        this._routerManager.handler(
          this._authController.login(req.body),
          req,
          res,
        );
      },
    );
    return this._authRoute;
  }
}
