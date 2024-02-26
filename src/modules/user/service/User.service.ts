import { inject, injectable } from 'inversify';
import { IUserService } from '../interfaces/service/IUserService';
import { Repository } from 'typeorm';
import { User } from '../entity/User.entity';
import { AppDataSource } from '../../../app/Typeorm';
import {
  IUserCreate,
  IUser,
  IUserUpdate,
  IUserFilter,
} from '../interfaces/schemas/IUser';
import { Types } from '../../../inversify/Types';
import { IAuthService } from '../../auth/interfaces/IAuthService';

@injectable()
export class UserService implements IUserService {
  private readonly _userRepository: Repository<User>;

  constructor(
    @inject(Types.AUTH_SERVICE) private readonly _authService: IAuthService,
  ) {
    this._userRepository = AppDataSource.getRepository(User);
  }
  async save(user: IUserCreate): Promise<IUser> {
    try {
      const auth = await this._authService.save(user.auth);
      user.auth = auth;
      const { id } = await this._userRepository.save(user);
      return await this.get({ id });
    } catch (error) {
      throw error;
    }
  }
  async get(user: IUserFilter): Promise<IUser> {
    const userFound = await this._userRepository.findOne({
      where: {
        ...user,
      },
    });
    if (!userFound) throw new Error();
    return userFound;
  }
  async update(id: number, user: IUserUpdate): Promise<boolean> {
    try {
      const { affected } = await this._userRepository.update(id, user);
      return Boolean(affected);
    } catch (error) {
      throw error;
    }
  }
}
