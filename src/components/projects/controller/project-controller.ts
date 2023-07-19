import { NextFunction, Request, Response } from "express";
import * as projectService from "../services/project-service";
export const saveProject = (req: Request, res: Response) => {
  projectService.saveProject(req, res);
};

export const fetchAllProjects = (req: Request, res: Response) => {
  projectService.getAllProjects(req, res);
};
