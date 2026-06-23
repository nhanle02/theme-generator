import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('themes')
export class Theme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string; // photo | video | script

  @Column()
  category: string;

  @Column({
    nullable: true,
  })
  preview_url?: string;

  @Column({
    nullable: true,
  })
  preview_public_id?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  prompt_template?: string;

  @Column({
    default: true,
  })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;
}
