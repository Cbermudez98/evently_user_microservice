import "reflect-metadata";
import { Container, injectable } from "inversify";
import { Types } from "../../../../../src/inversify/Types";
import { IUserController } from "../../../../../src/modules/user/interfaces/controller/IUserController";
import { UserController } from "../../../../../src/modules/user/controller/User.controller";
import { IUserService } from "../../../../../src/modules/user/interfaces/service/IUserService";
import { IUserCreate, IUser, IUserFilter } from "../../../../../src/modules/user/interfaces/schemas/IUser";
import { IBcrypt } from "../../../../../src/interfaces/IBcrypt";
import { Bcrypt } from "../../../../../src/utils/Bcrypt";
describe("User controller test", () => {
    const user = {
        auth: {
            email: "try@try.com",
            password: "123",
        },
        country: "COL",
        last_name: "xxx",
        name: "xxx",
        phone_number: "xxx"
    };

    

    @injectable()
    class serviceSuccess implements IUserService {
        async save(user: IUserCreate): Promise<IUser> {
            return Promise.resolve(user as any);
        }
        async get(id: IUserFilter): Promise<IUser> {
            return Promise.resolve({ id, ...user } as any);
        }
        async update(): Promise<boolean> {
            return true;
        } 
    }

    @injectable()
    class serviceError implements IUserService {
        async save(): Promise<IUser> {
            return Promise.reject(new Error());
        }
        async get(): Promise<IUser> {
            return Promise.reject(new Error());
        }
        async update(): Promise<boolean> {
            return Promise.reject(new Error());
        } 
    }

    afterEach(() => {
        jest.clearAllMocks();
    });
    it("Should create an user", async () => {
        const container: Container = new Container();
        container.bind<IUserController>(Types.USER_CONTROLLER).to(UserController);
        container.bind<IUserService>(Types.USER_SERVICE).to(serviceSuccess);
        container.bind<IBcrypt>(Types.BCRYPT).to(Bcrypt);
        const controller = container.get<IUserController>(Types.USER_CONTROLLER);
        const newUser = await controller.createUser(user);
        expect(newUser).toBeDefined();
    });

    it("Should throw an error creating an user", async () => {
        const container: Container = new Container();
        container.bind<IUserController>(Types.USER_CONTROLLER).to(UserController);
        container.bind<IUserService>(Types.USER_SERVICE).to(serviceError);
        container.bind<IBcrypt>(Types.BCRYPT).to(Bcrypt);
        const controller = container.get<IUserController>(Types.USER_CONTROLLER);
        try {
            await controller.createUser(user);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it("Should get an user", async () => {
        const container: Container = new Container();
        container.bind<IUserController>(Types.USER_CONTROLLER).to(UserController);
        container.bind<IUserService>(Types.USER_SERVICE).to(serviceSuccess);
        container.bind<IBcrypt>(Types.BCRYPT).to(Bcrypt);
        const controller = container.get<IUserController>(Types.USER_CONTROLLER);
        const newUser = await controller.getUser(1);
        expect(newUser).toBeDefined();
    });

    it("Should throw an error getting an user", async () => {
        const container: Container = new Container();
        container.bind<IUserController>(Types.USER_CONTROLLER).to(UserController);
        container.bind<IUserService>(Types.USER_SERVICE).to(serviceError);
        container.bind<IBcrypt>(Types.BCRYPT).to(Bcrypt);
        const controller = container.get<IUserController>(Types.USER_CONTROLLER);
        try {
            await controller.getUser(1);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it("Should update an user", async () => {
        const container: Container = new Container();
        container.bind<IUserController>(Types.USER_CONTROLLER).to(UserController);
        container.bind<IUserService>(Types.USER_SERVICE).to(serviceSuccess);
        container.bind<IBcrypt>(Types.BCRYPT).to(Bcrypt);
        const controller = container.get<IUserController>(Types.USER_CONTROLLER);
        const newUser = await controller.updateUSer(1, user);
        expect(newUser).toBeDefined();
    });

    it("Should throw an error getting an user", async () => {
        const container: Container = new Container();
        container.bind<IUserController>(Types.USER_CONTROLLER).to(UserController);
        container.bind<IUserService>(Types.USER_SERVICE).to(serviceError);
        container.bind<IBcrypt>(Types.BCRYPT).to(Bcrypt);
        const controller = container.get<IUserController>(Types.USER_CONTROLLER);
        try {
            await controller.updateUSer(1, user);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});