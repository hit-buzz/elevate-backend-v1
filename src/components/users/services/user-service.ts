import { Request, Response } from "express";
import prisma from "../../../config/prisma";
import userSchema from "../models/user";

export const saveNewUser = (req: Request, res: Response) => {
  console.log("received request to save users", req.body);
  const user = userSchema.parse(req.body);
  prisma.user
    .findUnique({
      where: {
        email: user.email,
      },
    })
    .then((u) => {
      if (u != null) {
        return res.status(400).json({ message: "user already registered" });
      }
      prisma.user
        .create({
          data: user,
        })
        .then((user) => {
          return res.status(201).json(user);
        })
        .catch((err) => {
          return res.status(500).json({ message: "user creation failed" });
        });
    })
    .catch((err) => {
      return res.status(500).json({ message: "user creation failed" });
    });
};

export const getUserById = (req: Request, res: Response) => {
  const users = userSchema.parse(req.body);
  return prisma.user
    .findMany({
      where: {
        email: { equals: users.email },
      },
    })
    .then((success) => {
      return success;
    })
    .catch((err) => {
      console.log("error occured while finding user", err);
    });
};
