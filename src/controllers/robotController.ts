import { Request, Response } from 'express';
import * as robotService from '../services/robotService';

// Create Robot
export async function createRobot(req: Request, res: Response) {
  const { name, type, status } = req.body;
  if (!name || !type) {
    return res.status(400).json({ error: 'name and type are required' });
  }

  try {
    const robot = await robotService.registerRobot(req.app.locals.dataSource, {
      name,
      type,
      status: status || 'offline',
    });
    res.status(201).json(robot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create robot' });
  }
}

// Get full robot details
export async function getRobot(req: Request, res: Response) {
  try {
    const robot = await robotService.getRobotDetails(req.app.locals.dataSource, req.params.id);
    if (!robot) return res.status(404).json({ error: 'Robot not found' });
    res.json(robot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve robot' });
  }
}

// Get all robots
export async function getAllRobots(req: Request, res: Response) {
  try {
    const robots = await robotService.listAllRobots(req.app.locals.dataSource);
    res.json(robots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve robots' });
  }
}

// Update robot status
export async function updateRobotStatus(req: Request, res: Response) {
  try {
    const updated = await robotService.updateStatus(req.app.locals.dataSource, req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Robot not found' });
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update robot status' });
  }
}

//Get only robot status
export async function getRobotStatus(req: Request, res: Response) {
  try {
    const robot = await robotService.getRobotDetails(req.app.locals.dataSource, req.params.id);
    if (!robot) return res.status(404).json({ error: 'Robot not found' });

    const statusInfo = {
      status: robot.status,
      battery: robot.battery,
      location: robot.location,
      mode: robot.mode,
      error_state: robot.error_state || null,
    };

    res.json(statusInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve robot status' });
  }
}
