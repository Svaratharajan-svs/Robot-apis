import { DataSource } from 'typeorm';
import { Log } from '../entities/Log';
import { Robot } from '../entities/Robot';

export async function createLog(
  dataSource: DataSource,
  robot: Robot,
  level: string,
  message: string,
  metadata?: any
): Promise<Log> {
  const repo = dataSource.getRepository(Log);

  const log = repo.create({
    robot: { id: robot.id },       // Only pass the id
    level,
    message,
    metadata: metadata ? JSON.stringify(metadata) : undefined,  // Fix type
  });

  return repo.save(log);
}

export async function getLogs(
  dataSource: DataSource,
  robotId: string,
  level?: string
): Promise<Log[]> {
  const repo = dataSource.getRepository(Log);
  if (level) {
    return repo.find({
      where: { robot: { id: robotId }, level },
      relations: ['robot'],
      order: { created_at: 'DESC' },
    });
  }
  return repo.find({
    where: { robot: { id: robotId } },
    relations: ['robot'],
    order: { created_at: 'DESC' },
  });
}
