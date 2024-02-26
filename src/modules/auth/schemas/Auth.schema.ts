import joi from 'joi';
import { IAuthLogin } from '../interfaces/IAuth';

const email = joi.string();
const password = joi.string();

export const loginSchema: joi.Schema<IAuthLogin> = joi.object({
  email: email.required(),
  password: password.required(),
});
