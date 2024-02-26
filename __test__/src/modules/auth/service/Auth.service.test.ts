import { AppDataSource } from "../../../../../src/app/Typeorm";
import handlerContainer from "../../../../../src/inversify/Containers";
import { Types } from "../../../../../src/inversify/Types";
import { IAuthService } from "../../../../../src/modules/auth/interfaces/IAuthService";

describe("Auth service test", () => {
    const user = {
        email: "try@try.com",
        password: "123",
    };
    afterEach(() => {
        jest.resetAllMocks();
    });

    it("Should save auth", async() => {
        jest.spyOn(AppDataSource, "getRepository")
            .mockReturnValue({
                save: jest.fn(() => {
                    return { id: 1, ...user };
                })
            } as any);
        const container = handlerContainer.get<IAuthService>(Types.AUTH_SERVICE);
        const newUser = await container.save(user);
        expect(newUser).toBeDefined();
    });

    it("Should throw error save auth", async() => {
        jest.spyOn(AppDataSource, "getRepository")
            .mockReturnValue({
                save: jest.fn(() => {
                    throw new Error("");
                })
            } as any);
        try {
            const container = handlerContainer.get<IAuthService>(Types.AUTH_SERVICE);
            await container.save(user);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it("Should get auth", async() => {
        jest.spyOn(AppDataSource, "getRepository")
            .mockReturnValue({
                findOneBy: jest.fn(() => {
                    return { id: 1, ...user };
                })
            } as any);
        const container = handlerContainer.get<IAuthService>(Types.AUTH_SERVICE);
        const newUser = await container.get(user.email);
        expect(newUser).toBeDefined();
    });

    it("Should throw an error getting auth", async() => {
        jest.spyOn(AppDataSource, "getRepository")
            .mockReturnValue({
                findOneBy: jest.fn(() => {
                    return null;
                })
            } as any);
        try {
            const container = handlerContainer.get<IAuthService>(Types.AUTH_SERVICE);
            await container.get(user.email);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});