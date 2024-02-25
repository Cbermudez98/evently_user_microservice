import { Response, NextFunction } from "express";
import { IJwtMiddleware } from "../interfaces/IJwt.middleware";
import { IRequest } from "../interfaces/IRequest";
import { inject, injectable } from "inversify";
import { Types } from "../inversify/Types";
import { IJwt } from "../interfaces/IJwt";
import { HTTP_MESSAGE, HTTP_STATUS } from "../enums/Enum";

@injectable()
export class JwtMiddleware implements IJwtMiddleware {
    constructor(@inject(Types.JWT) private readonly jwt: IJwt) {   
    }
    validate(){
        return (req: IRequest, res: Response, next: NextFunction): void => {
            const authorization = this.getAuthorization(req);
            if(!authorization) {
                res.status(HTTP_STATUS.FORBIDDEN).send({
                    data: HTTP_MESSAGE.FORBIDDEN
                });
            } else {
                const response = this.jwt.verifyToken(authorization);
                req.user = response.id;
                next();
            }
        }
    }

    private getAuthorization(request: IRequest): string | undefined {
        return request.headers.authorization?.split(" ")[1];
    }
}