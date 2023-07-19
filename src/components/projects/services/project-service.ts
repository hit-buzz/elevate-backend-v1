import prisma from "../../../config/prisma";
import { Request, Response } from "express";
import { projectSchema } from "../models/project";
export const saveProject = (req: Request, res: Response) => {
  console.log(req.body);
  const obj = projectSchema.parse(req.body);
  const createProject = prisma.project.create({
    data: obj,
  });
  createProject
    .then((success) => {
      console.log("object creation success", success);
      res.statusCode = 201;
      res.send(success);
    })
    .catch((err) => console.log("object Creation failed", err));
};

export const getAllProjects = (req: Request, res: Response) => {
  const result = prisma.project.findMany();
  result
    .then((projects) => {
      res.statusCode = 200;
      res.send(projects);
    })
    .catch((err) => console.log("something went wrong", err));
};
