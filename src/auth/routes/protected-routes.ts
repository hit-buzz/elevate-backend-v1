import { Router } from "express";
import projectsRoutes from "../../components/projects/routes/project-routes";
import { verifyToken } from "../services/auth-service";
const route = Router();

route.use("/project",verifyToken, projectsRoutes);

export default route;
