import { IResponseController } from './../../../interfaces/IResponseController';
import { inject, injectable } from "inversify";
import { IUserController } from "../interfaces/controller/IUserController";
import { Types } from "../../../inversify/Types";
import { IUserService } from "../interfaces/service/IUserService";
import { IUserCreate, IUserCreated, IUserUpdate } from "../interfaces/schemas/IUser";
import { HTTP_STATUS } from '../../../enums/Enum';
import { IBcrypt } from '../../../interfaces/IBcrypt';

@injectable()
export class UserController implements IUserController {

    constructor(
        @inject(Types.USER_SERVICE) private readonly _userService: IUserService,
        @inject(Types.BCRYPT) private readonly _bcrypt: IBcrypt) {
        
    }
    async createUser(user: IUserCreate): Promise<IResponseController<IUserCreated>> {
        try {
            const password = this._bcrypt.encrypt(user.auth.password);
            user.auth.password = password;
            const data = await this._userService.save(user);
            return { status: HTTP_STATUS.CREATED, data };
        } catch (error) {
            throw error;
        }
    }
    async getUser(id: number): Promise<IResponseController<IUserCreated>> {
        try {
            const data =  await this._userService.get({ id });
            return { status: HTTP_STATUS.SUCCESS, data };
        } catch (error) {
            throw error;
        }
    }
    async updateUSer(id: number, user: IUserUpdate): Promise<IResponseController<boolean>> {
        try {
            const data = await this._userService.update(id, user);
            return { status: HTTP_STATUS.SUCCESS, data };
        } catch (error) {
            throw error;
        }
    }
}