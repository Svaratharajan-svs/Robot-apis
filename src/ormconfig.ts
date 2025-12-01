import { DataSource } from 'typeorm';
import { Robot } from './entities/Robot';
import { Log } from './entities/Log';
import * as dotenv from 'dotenv';
dotenv.config();


export const AppDataSource = new DataSource({
type: 'sqlite',
database: process.env.DB_FILE || './db.sqlite',
synchronize: true,
logging: false,
entities: [Robot, Log],
migrations: [],
subscribers: [],
});