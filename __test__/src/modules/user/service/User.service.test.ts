import { AppDataSource } from "../../../../../src/app/Typeorm";
import handlerContainer from "../../../../../src/inversify/Containers";
import { Types } from "../../../../../src/inversify/Types";
import { IUserService } from "../../../../../src/modules/user/interfaces/service/IUserService";

describe("User service test", () => {
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
    afterEach(() => {
        jest.resetAllMocks();
    });

    it("Should save user", async() => {
        jest.spyOn(AppDataSource, "getRepository")
            .mockReturnValue({
                save: jest.fn(() => {
                    return { id: 1, ...user };
                }),
                findOne: jest.fn(() => {
                    return { id: 1, ...user };
                })
            } as any);
        const container = handlerContainer.get<IUserService>(Types.USER_SERVICE);
        const newUser = await container.save(user);
        expect(newUser).toBeDefined();
    });

    it("Should throw error save user", async() => {
        jest.spyOn(AppDataSource, "getRepository")
            .mockReturnValue({
                save: jest.fn(() => {
                    throw new Error("");
                }),
                findOne: jest.fn(() => {
                    return { id: 1, ...user };
                })
            } as any);
        try {
            const container = handlerContainer.get<IUserService>(Types.USER_SERVICE);
            await container.save(user);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it("Should throw an error getting user", async() => {
        jest.spyOn(AppDataSource, "getRepository")
            .mockReturnValue({
                findOne: jest.fn(() => {
                    return null;
                })
            } as any);
        try {
            const container = handlerContainer.get<IUserService>(Types.USER_SERVICE);
            await container.get({ id: 1 });
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it("Should update user", async() => {
        jest.spyOn(AppDataSource, "getRepository")
            .mockReturnValue({
                update: jest.fn(() => {
                    return {
                        affected: 1
                    }
                })
            } as any);
        const container = handlerContainer.get<IUserService>(Types.USER_SERVICE);
        const newUser = await container.update(1, user);
        expect(newUser).toBeDefined();
    });

    it("Should throw an error updating user", async() => {
        jest.spyOn(AppDataSource, "getRepository")
            .mockReturnValue({
                update: jest.fn(() => {
                    throw new Error();
                })
            } as any);
        try {
            const container = handlerContainer.get<IUserService>(Types.USER_SERVICE);
            await container.update( 1, user);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});