import { Request, Response } from "express";
import { IManagerRouter } from "../interfaces/IManager.router";
import { injectable } from "inversify";
import { HTTP_MESSAGE, HTTP_STATUS } from "../enums/Enum";

@injectable()
export class ManagerRouter implements IManagerRouter {
    handler(promise: Promise<any>, req: Request, res: Response): void {
        promise.then((data) => {
            res.status(data.status).send({ data: data.data });
        }).catch((error) => {
            if(error.message.includes("Duplicate entry")) {
                res.status(HTTP_STATUS.BAD_REQUEST).send({
                    data: HTTP_MESSAGE.BAD_REQUEST
                });
            } else {
                res.status(error?.status || HTTP_STATUS.INTERNAL_ERROR).send({ data: error?.message || HTTP_MESSAGE.INTERNAL_ERROR });
            }
        });
    }
}