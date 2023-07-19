import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user-service";
export const saveNewUser = (
  req: Request,
  res: Response) => {
    userService.saveNewUser(req,res);
};
