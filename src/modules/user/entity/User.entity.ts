import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IUser } from '../interfaces/schemas/IUser';
import { Auth } from '../../auth/entity/Auth.entity';
import { IAuth } from '../../auth/interfaces/IAuth';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @OneToOne(() => Auth, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'auth' })
  auth: IAuth;

  @Column()
  country: string;

  @Column({ unique: true })
  phone_number: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
