import { NextFunction, Request, Response } from "express";
import { IVerifyOptions } from "passport-local";
import prisma from "../../config/prisma";
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

export const passportAuthenticate = (req: Request, res: Response) => {
  // Redirect or respond with a success message upon successful authentication
  res.json({ message: "Login successful" });
};

export const validatedUser = (
  username: string,
  password: string,
  done: (
    error: any,
    user?: Express.User | false,
    options?: IVerifyOptions
  ) => void
) => {
  const userPromise = prisma.user.findUnique({
    where: {
      email: username,
    },
  });
  userPromise
    .then((user) => {
      if (user?.email === username && user?.password === password) {
        return done(null, user);
      }
      return done(null, false);
    })
    .catch((err) => {
      return done(err, false);
    });
};
