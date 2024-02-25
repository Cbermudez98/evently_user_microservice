import App from "./app/App";
import { AppDataSource } from "./app/Typeorm";
import { Constants } from "./utils/Constants";
import Logger from "./utils/Logger";

AppDataSource.initialize()
    .then(() => {
        Logger.info("Database initialize");
    });

App.listen(Number(Constants.PORT));
App.initRoutes();