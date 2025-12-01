import { DataSource } from 'typeorm';
import { Robot } from '../entities/Robot';
import { Log } from '../entities/Log';
import * as logRepo from '../repositories/logRepository';

export async function createRobotLog(
  dataSource: DataSource,
  robot: Robot,
  level: string,
  message: string,
  metadata?: any
): Promise<Log> {
  return logRepo.createLog(dataSource, robot, level, message, metadata);
}

export async function getRobotLogs(
  dataSource: DataSource,
  robotId: string,
  level?: string
): Promise<Log[]> {
  return logRepo.getLogs(dataSource, robotId, level);
}
