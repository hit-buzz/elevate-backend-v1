"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPublicRoutes = void 0;
const user_route_1 = __importDefault(require("../../components/users/routes/user-route"));
const registerPublicRoutes = (app) => {
    app.use("/user", user_route_1.default);
    app.get("/health", (req, res, next) => {
        res.status(401).json({ message: "UP" });
    });
    app.use((req, res, next) => {
        console.log("application is running...");
        res.status(404).json({ message: "404" });
    });
};
exports.registerPublicRoutes = registerPublicRoutes;
//# sourceMappingURL=public-routes.js.map