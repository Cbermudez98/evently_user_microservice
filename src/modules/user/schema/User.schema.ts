import joi from 'joi';
import { IUserCreate } from '../interfaces/schemas/IUser';

const name = joi.string();
const last_name = joi.string();
const email = joi.string();
const password = joi.string();
const country = joi.string();
const phone_number = joi.string();

export const userCreateSchema: joi.Schema<IUserCreate> = joi.object({
  name: name.required(),
  last_name: last_name.required(),
  country: country.required(),
  phone_number: phone_number.required(),
  auth: joi.object({
    email: email.required(),
    password: password.required(),
  }),
});
