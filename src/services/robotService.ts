import { DataSource } from 'typeorm';
import { Robot } from '../entities/Robot';
import * as robotRepo from '../repositories/robotRepository';

export async function registerRobot(dataSource: DataSource, robotData: Partial<Robot>): Promise<Robot> {
  return robotRepo.createRobot(dataSource, robotData);
}

export async function getRobotDetails(dataSource: DataSource, id: string): Promise<Robot | null> {
  return robotRepo.getRobot(dataSource, id);
}

export async function listAllRobots(dataSource: DataSource): Promise<Robot[]> {
  return robotRepo.getAllRobots(dataSource);
}

export async function updateStatus(
  dataSource: DataSource,
  id: string,
  fields: Partial<Robot>
): Promise<Robot | null> {
  return robotRepo.updateRobotStatus(dataSource, id, fields);
}
