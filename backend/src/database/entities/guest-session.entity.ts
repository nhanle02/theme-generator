import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('guest_sessions')
export class GuestSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  session_id: string;

  @Column({
    nullable: true,
  })
  fingerprint_id: string;

  @Column({
    nullable: true,
  })
  ip_address: string;

  @Column({
    type: 'integer',
    default: 0,
  })
  generation_count: number;

  @CreateDateColumn()
  created_at: Date;
}
