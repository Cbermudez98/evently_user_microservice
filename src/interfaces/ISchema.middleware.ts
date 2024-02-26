import { Schema } from 'joi';
import { IRequest } from './IRequest';
import { NextFunction, Response } from 'express';

export interface ISchemaValidator {
  validate: (
    schema: Schema,
  ) => (req: IRequest, res: Response, next: NextFunction) => void;
}
