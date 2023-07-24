import express from "express";
import * as pController from "../controller/user-controller";
const routes = express.Router();
routes.post("/signup", pController.saveNewUser);
export = routes;
