import { IAuth, IAuthCreate } from './IAuth';

export interface IAuthService {
  save: (auth: IAuthCreate) => Promise<IAuth>;
  get: (email: IAuth['email']) => Promise<IAuth>;
}
