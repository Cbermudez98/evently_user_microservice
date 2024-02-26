import { Request, Response } from 'express';

export interface IManagerRouter {
  handler: (promise: Promise<any>, req: Request, res: Response) => void;
}
