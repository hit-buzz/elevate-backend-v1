import { isAuthenticated } from "../services/auth-service";
import projectsRoutes from "../../components/projects/routes/project-routes";
import { Express } from "express-serve-static-core";
export const registerProtectedRoutes = (app: Express) => {
  app.use("/project", isAuthenticated, projectsRoutes);
};
