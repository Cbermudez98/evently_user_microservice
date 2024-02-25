import { inject, injectable } from "inversify";
import { IAuthController } from "../interfaces/IAuthController";
import { IResponseController } from "../../../interfaces/IResponseController";
import { IAuthLogin } from "../interfaces/IAuth";
import { Types } from "../../../inversify/Types";
import { IAuthService } from "../interfaces/IAuthService";
import { IBcrypt } from "../../../interfaces/IBcrypt";
import { HTTP_MESSAGE, HTTP_STATUS } from "../../../enums/Enum";
import { IJwt } from "../../../interfaces/IJwt";
import { IUserService } from "../../user/interfaces/service/IUserService";

@injectable()
export class AuthController implements IAuthController {
    constructor(
        @inject(Types.AUTH_SERVICE) private readonly _authService: IAuthService,
        @inject(Types.USER_SERVICE) private readonly _userService: IUserService,
        @inject(Types.BCRYPT) private readonly _bcrypt: IBcrypt,
        @inject(Types.JWT) private readonly _jwt: IJwt) {}
    async login(user: IAuthLogin): Promise<IResponseController<{ token: string; }>> {
        try {
            const auth = await this._authService.get(user.email);
            const userFound = await this._userService.get({ auth: auth.id } as any);
            const compare = this._bcrypt.compare(auth.password, user.password);
            if(!compare) {
                throw {
                    status: HTTP_STATUS.FORBIDDEN,
                    message: HTTP_MESSAGE.FORBIDDEN
                }
            }
            const token = this._jwt.signToken({ id: userFound.id });
            return { status: 200, data: { token } };
        } catch (error) {
            throw error;
        }
    }
}