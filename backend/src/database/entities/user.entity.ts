import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    unique: true,
  })
  google_id: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    nullable: true,
    select: false,
  })
  password: string;

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
