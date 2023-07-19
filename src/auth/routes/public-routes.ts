import { Express } from "express-serve-static-core";
import routes from "../../components/users/routes/user-route";
import { NextFunction, Request, Response } from "express";

export const registerPublicRoutes = (app: Express) => {
  app.use("/user", routes);

  app.get("/health", (req: Request, res: Response, next: NextFunction) => {
    res.status(401).json({ message: "UP" });
  });

  app.use((req, res, next) => {
    console.log("application is running...");
    res.status(404).json({ message: "404" });
  });
};
