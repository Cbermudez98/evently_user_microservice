import { injectable } from "inversify";
import joi from "joi";
import { ISchemaValidator } from "../interfaces/ISchema.middleware";
import { NextFunction, Response } from "express";
import { IRequest } from "../interfaces/IRequest";
import { HTTP_MESSAGE, HTTP_STATUS } from "../enums/Enum";

@injectable()
export class SchemaValidator implements ISchemaValidator {
    validate(schema: joi.Schema) {
        return (req: IRequest, res: Response, next: NextFunction): void => {
            try {
                const body = req.body;
                const { error } = schema.validate(body);
                if(!error) {
                    next();
                } else {
                    res.status(HTTP_STATUS.BAD_REQUEST).send({
                        data: "Data must match"
                    });
                }
            } catch (error) {
                res.status(HTTP_STATUS.INTERNAL_ERROR).send({
                    data: HTTP_MESSAGE.INTERNAL_ERROR
                });
            }
        }
    }
}