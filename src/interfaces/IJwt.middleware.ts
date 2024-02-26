import { NextFunction, Response } from 'express';
import { IRequest } from './IRequest';

export interface IJwtMiddleware {
  validate: () => (req: IRequest, res: Response, next: NextFunction) => void;
}
