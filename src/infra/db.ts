import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Robot } from '../entities/Robot';
import { Log } from '../entities/Log';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  synchronize: true,
  logging: true,
  entities: [Robot, Log],
});

export const initDB = async () => {
  if (!AppDataSource.isInitialized) {
    try {
      await AppDataSource.initialize();
      console.log('Database connected successfully!');
    } catch (error) {
      console.error('DB Error:', error);
      process.exit(1);
    }
  }
  return AppDataSource;
};

// Run only when executed directly
if (require.main === module) {
  initDB();
}
