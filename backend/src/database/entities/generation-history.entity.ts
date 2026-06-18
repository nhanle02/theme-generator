import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum GenerationStatus {
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

@Entity('generation_history')
export class GenerationHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  user_id: number;

  @Column({
    nullable: true,
  })
  guest_session_id: number;

  @Column()
  type: string;

  @Column({
    type: 'enum',
    enum: GenerationStatus,
    default: GenerationStatus.PROCESSING,
  })
  status: GenerationStatus;

  @Column({
    nullable: true,
  })
  theme_id: number;

  @Column({
    type: 'json',
    nullable: true,
  })
  input_json: Record<string, any>;

  @Column({
    nullable: true,
  })
  output_url: string;

  @Column({
    type: 'integer',
    default: 0,
  })
  credits_used: number;

  @CreateDateColumn()
  created_at: Date;
}
