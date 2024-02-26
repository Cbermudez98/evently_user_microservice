import { IBcrypt } from "../../../src/interfaces/IBcrypt";
import handlerContainer from "../../../src/inversify/Containers";
import { Types } from "../../../src/inversify/Types";

describe("Bcrypt test", () => {
    const bcrypt = handlerContainer.get<IBcrypt>(Types.BCRYPT);
    it("Should encrypt", () => {
        const encrypt = bcrypt.encrypt("123");
        expect(encrypt).toBeDefined();
    });

    it("Should validate password", () => {
        const encrypt = bcrypt.encrypt("123");
        const compare = bcrypt.compare(encrypt, "123");
        expect(compare).toBeTruthy();
    });
});