import { DataSource } from "typeorm";
import { Constants } from "../utils/Constants";

export const AppDataSource = new DataSource({
    type: Constants.DB_TYPE as any,
    host: Constants.DB_HOST,
    port: Number(Constants.DB_PORT),
    username: Constants.DB_USER,
    password: Constants.DB_PASSWORD,
    database: Constants.DB_NAME,
    synchronize: false,
    entities: ["src/modules/**/entity/*.entity.ts"],
    migrations: ["src/migrations/*.ts"],
    migrationsTableName: Constants.DB_TABLE_MIGRATION
});