import express from "express";
import * as pController from "../controller/project-controller";
const routes = express.Router();

routes.post("/", pController.saveProject);
routes.get("/", pController.fetchAllProjects);

export = routes;
