import { IUser, IUserCreate, IUserFilter, IUserUpdate } from "../schemas/IUser";

export interface IUserService {
    save: (user: IUserCreate) => Promise<IUser>;
    get: (id: IUserFilter) => Promise<IUser>;
    update: (id: IUser["id"], user: IUserUpdate) => Promise<boolean>;
}