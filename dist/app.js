"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//===============imports===========
const express_1 = __importDefault(require("express"));
const init_db_1 = __importDefault(require("./config/init-db"));
const passport_config_1 = require("./auth/config/passport-config");
const auth_routes_1 = require("./auth/routes/auth-routes");
const protected_routes_1 = require("./auth/routes/protected-routes");
const public_routes_1 = require("./auth/routes/public-routes");
//=================================
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
const passport = (0, passport_config_1.initializeAuthentication)(app);
(0, auth_routes_1.registerAuthRoutes)(app, passport);
(0, protected_routes_1.registerProtectedRoutes)(app);
(0, public_routes_1.registerPublicRoutes)(app);
(0, init_db_1.default)(app);
//# sourceMappingURL=app.js.map