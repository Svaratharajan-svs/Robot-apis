import { DataSource } from 'typeorm';
import { Robot } from '../entities/Robot';

export async function createRobot(dataSource: DataSource, robotData: Partial<Robot>): Promise<Robot> {
  const repo = dataSource.getRepository(Robot);
  const robot = repo.create(robotData);
  return repo.save(robot);
}

export async function getRobot(dataSource: DataSource, id: string): Promise<Robot | null> {
  const repo = dataSource.getRepository(Robot);
  return repo.findOne({ where: { id }, relations: ['logs'] });
}

export async function getAllRobots(dataSource: DataSource): Promise<Robot[]> {
  const repo = dataSource.getRepository(Robot);
  return repo.find();
}

export async function updateRobotStatus(
  dataSource: DataSource,
  id: string,
  fields: Partial<Robot>
): Promise<Robot | null> {
  const repo = dataSource.getRepository(Robot);
  const robot = await repo.findOneBy({ id });
  if (!robot) return null;
  repo.merge(robot, fields);
  return repo.save(robot);
}
