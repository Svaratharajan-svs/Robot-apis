import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Log } from './Log';


@Entity()
export class Robot {
@PrimaryColumn('text')
id: string = uuidv4();


@Column()
name: string;


@Column()
type: string;


@Column({ default: 'offline' })
status: string;


@Column({ nullable: true, type: 'integer', default: 100 })
battery: number;


@Column({ nullable: true })
location?: string;


@Column({ default: 'idle' })
mode: string;


@Column({ nullable: true })
error_state?: string;


@CreateDateColumn()
created_at: Date;


@UpdateDateColumn()
updated_at: Date;


@OneToMany(() => Log, log => log.robot)
logs: Log[];
}