import { config } from "dotenv";

config();

export class Constants {
    static readonly PORT = process.env.PORT || 3030;
    static readonly JWT_HASH = process.env.JWT_HASH || "test";

    static readonly DB_TYPE = process.env.DB_TYPE || "test";
    static readonly DB_HOST = process.env.DB_HOST || "test";
    static readonly DB_PORT = process.env.DB_PORT || "test";
    static readonly DB_USER = process.env.DB_USER || "test";
    static readonly DB_PASSWORD = process.env.DB_PASSWORD || "test";
    static readonly DB_NAME = process.env.DB_NAME || "test";
    static readonly DB_TABLE_MIGRATION = process.env.DB_TABLE_MIGRATION || "test";
}