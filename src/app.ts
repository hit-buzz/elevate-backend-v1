//===============imports===========
import express from "express";
import initiaLizeDb from "./config/init-db";

import { initializeAuthentication } from "./auth/config/passport-config";
import { registerAuthRoutes } from "./auth/routes/auth-routes";
import { registerProtectedRoutes } from "./auth/routes/protected-routes";
import { registerPublicRoutes } from "./auth/routes/public-routes";
//=================================
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const passport = initializeAuthentication(app);
registerAuthRoutes(app, passport);
registerProtectedRoutes(app);
registerPublicRoutes(app);
initiaLizeDb(app);
