import { JwtPayload } from "jsonwebtoken";

export interface IJwt {
    signToken: (data: Record<string, any>) => string;
    verifyToken: (data: string) => JwtPayload;
}