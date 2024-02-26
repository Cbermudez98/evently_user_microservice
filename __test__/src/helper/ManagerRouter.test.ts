import { getMockReq, getMockRes } from "@jest-mock/express";
import { HTTP_STATUS } from "../../../src/enums/Enum";
import { IManagerRouter } from "../../../src/interfaces/IManager.router";
import handlerContainer from "../../../src/inversify/Containers";
import { Types } from "../../../src/inversify/Types";

describe("Manager router test", () => {
    const container = handlerContainer.get<IManagerRouter>(Types.ROUTER_MANAGER);
    it("Should response with success", async () => {
        const req = getMockReq();
        const res = getMockRes().res;
        container.handler(Promise.resolve({
            status: HTTP_STATUS.SUCCESS,
            data: {
                hello: "world"
            }
        }), req, res);
        setTimeout(() => {
            expect(res.status).toHaveBeenCalled();
        }, 1000);
    });

    it("Should response fail duplicate entry", async () => {
        const req = getMockReq();
        const res = getMockRes().res;
        container.handler(Promise.reject(new Error("Duplicate entry")), req, res);
        setTimeout(() => {
            expect(res.status).toHaveBeenCalled();
        }, 1000);
    });

    it("Should response fail", async () => {
        const req = getMockReq();
        const res = getMockRes().res;
        container.handler(Promise.reject(new Error()), req, res);
        setTimeout(() => {
            expect(res.status).toHaveBeenCalled();
        }, 1000);
    });
});