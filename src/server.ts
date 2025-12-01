import 'reflect-metadata'; // MUST be first
import express, { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

import { DataSource } from 'typeorm';
import { Robot } from './entities/Robot';
import { Log } from './entities/Log';
import * as robotController from './controllers/robotController';
import * as logController from './controllers/logController';

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY || '';

const app = express();
app.use(express.json());

// Initialize TypeORM DataSource
export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB_FILE || './db.sqlite',
  synchronize: true,
  logging: false,
  entities: [Robot, Log],
});

// Start server after DB connects
AppDataSource.initialize()
  .then(() => {
    console.log('Database initialized');

    // Add dataSource to app.locals (with TS type)
    app.locals.dataSource = AppDataSource;

    // API key middleware
    app.use((req: Request, res: Response, next: NextFunction) => {
      if (!API_KEY) return next();
      const key = req.header('x-api-key');
      if (!key || key !== API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      next();
    });

    // Robot routes
    app.post('/robots', robotController.createRobot);
    app.get('/robots', robotController.getAllRobots);
    app.get('/robots/:id', robotController.getRobot);
    app.patch('/robots/:id/status', robotController.updateRobotStatus);
    app.get('/robots/:id/status', robotController.getRobotStatus);

    // Log routes
    app.post('/robots/:id/logs', logController.createLog);
    app.get('/robots/:id/logs', logController.getLogs);

    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((error) => console.error('Error during DataSource initialization', error));
