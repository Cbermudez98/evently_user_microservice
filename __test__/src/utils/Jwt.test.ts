import { IJwt } from "../../../src/interfaces/IJwt";
import handlerContainer from "../../../src/inversify/Containers";
import { Types } from "../../../src/inversify/Types";

describe("Jwt test", () => {
    const jwt = handlerContainer.get<IJwt>(Types.JWT);
    it("Should sign token", () => {
        const token = jwt.signToken({ data: "123" });
        expect(token).toBeDefined();
    });

    it("Should verify token", () => {
        const token = jwt.signToken({ data: "123" });
        const verify = jwt.verifyToken(token);
        expect(verify).toBeDefined();
    });

});