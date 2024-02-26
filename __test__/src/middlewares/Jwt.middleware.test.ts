import "reflect-metadata";
import { Container, injectable } from "inversify";
import { IJwt } from "../../../src/interfaces/IJwt";
import { Types } from "../../../src/inversify/Types";
import { JwtPayload } from "jsonwebtoken";
import { IJwtMiddleware } from "../../../src/interfaces/IJwt.middleware";
import { getMockReq, getMockRes } from '@jest-mock/express'
import { JwtMiddleware } from "../../../src/middlewares/Jwt.middleware";

describe("Jwt middleware test", () => {
    @injectable()
    class JwtSuccess implements IJwt {
        signToken: (data: Record<string, any>) => string;
        verifyToken(): JwtPayload {
            return {
                id: 1
            };
        }
    }
    it("Should validate with success", () => {
        const container = new Container();
        container.bind<IJwt>(Types.JWT).to(JwtSuccess);
        container.bind<IJwtMiddleware>(Types.JWT_MIDDLEWARE).to(JwtMiddleware);
        const middleware = container.get<IJwtMiddleware>(Types.JWT_MIDDLEWARE);
        const req = getMockReq({
            headers: {
                authorization: "Bearer 123"
            }
        });
        const res = getMockRes().res;
        const next = getMockRes().next;
        middleware.validate()(req, res, next);
        expect(next).toHaveBeenCalled();
    });

    it("Should fail with token", () => {
        const container = new Container();
        container.bind<IJwt>(Types.JWT).to(JwtSuccess);
        container.bind<IJwtMiddleware>(Types.JWT_MIDDLEWARE).to(JwtMiddleware);
        const middleware = container.get<IJwtMiddleware>(Types.JWT_MIDDLEWARE);
        const req = getMockReq();
        const res = getMockRes().res;
        const next = getMockRes().next;
        middleware.validate()(req, res, next);
        expect(res.status).toHaveBeenCalled();
    });
});