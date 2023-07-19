import { Express } from "express-serve-static-core";
import { PassportStatic } from "passport";
import { passportAuthenticate } from "../services/auth-service";

export const registerAuthRoutes = (app: Express, passport: PassportStatic) => {
  app.post("/login", passport.authenticate("local"), passportAuthenticate);
};
