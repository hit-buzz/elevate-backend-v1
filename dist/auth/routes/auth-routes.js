"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAuthRoutes = void 0;
const auth_service_1 = require("../services/auth-service");
const registerAuthRoutes = (app, passport) => {
    app.post("/login", passport.authenticate("local"), auth_service_1.passportAuthenticate);
};
exports.registerAuthRoutes = registerAuthRoutes;
//# sourceMappingURL=auth-routes.js.map