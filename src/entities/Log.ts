import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Robot } from './Robot';

@Entity()
export class Log {
  @PrimaryColumn('text')
  id: string;

  @ManyToOne(() => Robot, robot => robot.logs)
  @JoinColumn({ name: 'robot_id' })
  robot: Robot;

  @Column()
  level: string;

  @Column()
  message: string;

  @Column({ type: 'text', nullable: true })
  metadata?: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    this.id = uuidv4(); // initialize IDs here (NOT inline)
  }
}
