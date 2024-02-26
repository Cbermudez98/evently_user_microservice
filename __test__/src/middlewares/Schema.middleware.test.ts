import { faker } from "@faker-js/faker";
import { getMockReq, getMockRes } from "@jest-mock/express";
import handlerContainer from "../../../src/inversify/Containers";
import { ISchemaValidator } from "../../../src/interfaces/ISchema.middleware";
import { Types } from "../../../src/inversify/Types";
import { userCreateSchema } from "../../../src/modules/user/schema/User.schema";

describe("Schema middleware test", () => {
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
    it("Should validate with success", () => {
        const req = getMockReq({
            body: user
        });
        const res = getMockRes().res;
        const next = getMockRes().next;
        const middleware = handlerContainer.get<ISchemaValidator>(Types.SCHEMA_MIDDLEWARE);
        middleware.validate(userCreateSchema)(req, res, next);
        expect(next).toHaveBeenCalled();
    });

    it("Should validate with fail", () => {
        const req = getMockReq();
        const res = getMockRes().res;
        const next = getMockRes().next;
        const middleware = handlerContainer.get<ISchemaValidator>(Types.SCHEMA_MIDDLEWARE);
        middleware.validate(userCreateSchema)(req, res, next);
        expect(res.status).toHaveBeenCalled();
    });

    it("Should validate with fail throw an error", () => {
        const req = getMockReq();
        const res = getMockRes().res;
        const next = getMockRes().next;
        const middleware = handlerContainer.get<ISchemaValidator>(Types.SCHEMA_MIDDLEWARE);
        middleware.validate({
            validate: () => {
                throw new Error();
            }
        }as any)(req, res, next);
        expect(res.status).toHaveBeenCalled();
    });
});