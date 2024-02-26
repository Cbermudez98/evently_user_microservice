import { IResponseController } from '../../../interfaces/IResponseController';
import { IAuthLogin } from './IAuth';

export interface IAuthController {
  login: (user: IAuthLogin) => Promise<IResponseController<{ token: string }>>;
}
