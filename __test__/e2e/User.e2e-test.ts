import request from "supertest";
import { faker } from '@faker-js/faker';

import App from "../../src/app/App";
import { HTTP_STATUS } from "../../src/enums/Enum";
import { AppDataSource } from "../../src/app/Typeorm";
import Logger from "../../src/utils/Logger";

describe("User e2e test", () => {
    const user = {
        name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        country: faker.location.country(),
        phone_number: faker.phone.number(),
        auth: {
            email: faker.internet.email(),
            password: faker.internet.password()
        }
    }

    beforeAll(async () => {
        await AppDataSource.initialize();
        Logger.info("Database initialize");
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });
    it("/POST user", async () => {
        const response = await request(App.getApp()).post("/user/")
            .send(user);
        expect(response.status).toBe(HTTP_STATUS.CREATED);
    });

    it("/POST login", async () => {
        const response = await request(App.getApp()).post("/auth").send({
            email: user.auth.email,
            password: user.auth.password
        });
        expect(response.status).toBe(HTTP_STATUS.SUCCESS);
    });
});