import { IAuth } from '../../../auth/interfaces/IAuth';

export interface IUser {
  id: number;
  name: string;
  last_name: string;
  country: string;
  auth: IAuth;
  phone_number: string;
  created_at: Date;
  updated_at: Date;
}

export interface IUserCreate
  extends Omit<IUser, 'id' | 'created_at' | 'updated_at' | 'auth'> {
  auth: Pick<IAuth, 'email' | 'password'>;
}

export interface IUserUpdate
  extends Partial<Omit<IUser, 'auth' | 'created_at' | 'updated_at'>> {}

export interface IUserFilter extends Partial<IUser> {}

export interface IUserCreated extends Omit<IUser, 'password'> {}
