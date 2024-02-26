import { IResponseController } from './../../../../interfaces/IResponseController';
import { IUserUpdate } from './../schemas/IUser';
import { IUser, IUserCreate, IUserCreated } from '../schemas/IUser';

export interface IUserController {
  createUser: (user: IUserCreate) => Promise<IResponseController<IUserCreated>>;
  getUser: (id: IUser['id']) => Promise<IResponseController<IUserCreated>>;
  updateUSer: (
    id: IUser['id'],
    user: IUserUpdate,
  ) => Promise<IResponseController<boolean>>;
  // login: ()
}
