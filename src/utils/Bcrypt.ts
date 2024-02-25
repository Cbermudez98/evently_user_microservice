import { injectable } from "inversify";
import { genSaltSync, compareSync, hashSync } from "bcrypt";
import { IBcrypt } from "../interfaces/IBcrypt";

@injectable()
export class Bcrypt implements IBcrypt {
    private readonly _salt: string;
    constructor() {
        this._salt = genSaltSync(10);
    }
    encrypt(actual: string): string {
        return hashSync(actual, this._salt);
    }

    compare(hashed: string, actual: string): boolean {
        return compareSync(actual, hashed);
    }
}