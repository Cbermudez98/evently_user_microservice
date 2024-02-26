import { injectable } from 'inversify';
import { IAuthService } from '../interfaces/IAuthService';
import { IAuthCreate, IAuth } from '../interfaces/IAuth';
import { Repository } from 'typeorm';
import { Auth } from '../entity/Auth.entity';
import { AppDataSource } from '../../../app/Typeorm';

@injectable()
export class AuthService implements IAuthService {
  private readonly _authRepository: Repository<Auth>;
  constructor() {
    this._authRepository = AppDataSource.getRepository(Auth);
  }
  async save(auth: IAuthCreate): Promise<IAuth> {
    try {
      return await this._authRepository.save(auth);
    } catch (error) {
      throw error;
    }
  }

  async get(email: string): Promise<IAuth> {
    try {
      const data = await this._authRepository.findOneBy({ email });
      if (!data) {
        throw new Error('User not found');
      }
      return data;
    } catch (error) {
      throw error;
    }
  }
}
