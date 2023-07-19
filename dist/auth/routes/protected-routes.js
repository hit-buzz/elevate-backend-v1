"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerProtectedRoutes = void 0;
const auth_service_1 = require("../services/auth-service");
const project_routes_1 = __importDefault(require("../../components/projects/routes/project-routes"));
const registerProtectedRoutes = (app) => {
    app.use("/project", auth_service_1.isAuthenticated, project_routes_1.default);
};
exports.registerProtectedRoutes = registerProtectedRoutes;
//# sourceMappingURL=protected-routes.js.map