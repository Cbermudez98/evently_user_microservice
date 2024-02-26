import "reflect-metadata";
import { Container, injectable } from "inversify";
import { IAuthService } from "../../../../../src/modules/auth/interfaces/IAuthService";
import { IAuth } from "../../../../../src/modules/auth/interfaces/IAuth";
import { Types } from "../../../../../src/inversify/Types";
import { IUserService } from "../../../../../src/modules/user/interfaces/service/IUserService";
import { IUser, IUserCreate, IUserUpdate } from "../../../../../src/modules/user/interfaces/schemas/IUser";
import { IJwt } from "../../../../../src/interfaces/IJwt";
import { Jwt } from "../../../../../src/utils/Jwt";
import { IBcrypt } from "../../../../../src/interfaces/IBcrypt";
import { IAuthController } from "../../../../../src/modules/auth/interfaces/IAuthController";
import { AuthController } from "../../../../../src/modules/auth/controller/Auth.controller";

describe("Auth controller test", () => {
    const user = {
        email: "try@try.com",
        password: "123",
    };

    @injectable()
    class ServiceSuccess implements IAuthService {
        async get(): Promise<IAuth> {
            return Promise.resolve({ id: 1, ...user } as any);
        }
        async save(): Promise<IAuth> {
            return Promise.resolve(user as any);
        }
    }

    @injectable()
    class UserService implements IUserService {
        async get(): Promise<IUser> {
            return Promise.resolve(user as any);
        }
        save: (user: IUserCreate) => Promise<IUser>;
        update: (id: number, user: IUserUpdate) => Promise<boolean>;
    }

    @injectable()
    class Bcrypt implements IBcrypt {
        compare(): boolean {
            return true;
        }
        encrypt: (actual: string) => string;
    }

    @injectable()
    class BcryptFail implements IBcrypt {
        compare(): boolean {
            return false;
        }
        encrypt: (actual: string) => string;
    }
    it("Should login", async () => {
        const container = new Container();
        container.bind<IAuthService>(Types.AUTH_SERVICE).to(ServiceSuccess);
        container.bind<IUserService>(Types.USER_SERVICE).to(UserService);
        container.bind<IJwt>(Types.JWT).to(Jwt);
        container.bind<IBcrypt>(Types.BCRYPT).to(Bcrypt);
        container.bind<IAuthController>(Types.AUTH_CONTROLLER).to(AuthController);
        const controller = container.get<IAuthController>(Types.AUTH_CONTROLLER);
        const response = await controller.login(user);
        expect(response).toBeDefined();
    });

    it("Should fail login with password", async () => {
        const container = new Container();
        container.bind<IAuthService>(Types.AUTH_SERVICE).to(ServiceSuccess);
        container.bind<IUserService>(Types.USER_SERVICE).to(UserService);
        container.bind<IJwt>(Types.JWT).to(Jwt);
        container.bind<IBcrypt>(Types.BCRYPT).to(BcryptFail);
        container.bind<IAuthController>(Types.AUTH_CONTROLLER).to(AuthController);
        const controller = container.get<IAuthController>(Types.AUTH_CONTROLLER);
        try {
            await controller.login(user);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});