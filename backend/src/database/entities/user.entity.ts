import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export type AuthProvider = 'local' | 'google';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    unique: true,
  })
  google_id: string;

  // Email luôn cần
  @Column({
    unique: true,
  })
  email: string;

  @Column({
    nullable: true,
    select: false,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: ['local', 'google'],
    default: 'local',
  })
  provider: AuthProvider;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  avatar_url: string;

  @Column({
    type: 'integer',
    default: 0,
  })
  credit_balance: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
