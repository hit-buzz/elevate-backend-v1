import prisma from "../../../config/prisma";
import { Request, Response } from "express";
import { projectSchema } from "../models/project";

export async function saveProject(req: Request, res: Response) {
  console.log(req.user);
  const project = await projectSchema.safeParseAsync(req.body);
  if (!project.success) {
    return res.status(400).json({ message: project.error.formErrors });
  }
  try {
    const projectedCreated = await prisma.project.create({
      data: project.data,
    });

    if (!projectedCreated) {
      return res.status(400).json({ message: "object creation failed" });
    }

    return res.status(201).json(projectedCreated);
  } catch {
    return res.status(500).json({
      message: "exception occured while saving. Please contact Administrator",
    });
  }
}

export const getAllProjects = (_: Request, res: Response) => {
  const result = prisma.project.findMany();
  result
    .then((projects) => {
      res.statusCode = 200;
      res.send(projects);
    })
    .catch((err) => console.log("something went wrong", err));
};
