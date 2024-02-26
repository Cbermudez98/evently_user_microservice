import { Request } from 'express';
import { IUser } from '../modules/user/interfaces/schemas/IUser';

export interface IRequest extends Request {
  user?: IUser['id'];
  role?: string;
}
