import { Request, Response } from 'express';
import * as logService from '../services/logService';
import * as robotService from '../services/robotService';

export async function createLog(req: Request, res: Response) {
  const { level = 'info', message, metadata } = req.body;
  if (!message) return res.status(400).json({ error: 'message is required' });

  try {
    const robot = await robotService.getRobotDetails(req.app.locals.dataSource, req.params.id);
    if (!robot) return res.status(404).json({ error: 'Robot not found' });

    const log = await logService.createRobotLog(
      req.app.locals.dataSource,
      robot,
      level,
      message,
      metadata
    );

    res.status(201).json(log);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create log' });
  }
}

export async function getLogs(req: Request, res: Response) {
  const { level } = req.query;

  try {
    const logs = await logService.getRobotLogs(req.app.locals.dataSource, req.params.id, level as string);
    res.json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve logs' });
  }
}
