import { verify, sign, JwtPayload } from 'jsonwebtoken';
import { Constants } from './Constants';
import { IJwt } from '../interfaces/IJwt';
import { injectable } from 'inversify';

@injectable()
export class Jwt implements IJwt {
  signToken(data: Record<string, any>): string {
    return sign(data, Constants.JWT_HASH);
  }

  verifyToken(data: string): JwtPayload {
    return verify(data, Constants.JWT_HASH) as JwtPayload;
  }
}
