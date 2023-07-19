"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatedUser = exports.passportAuthenticate = exports.isAuthenticated = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: "Unauthorized" });
};
exports.isAuthenticated = isAuthenticated;
const passportAuthenticate = (req, res) => {
    // Redirect or respond with a success message upon successful authentication
    res.json({ message: "Login successful" });
};
exports.passportAuthenticate = passportAuthenticate;
const validatedUser = (username, password, done) => {
    const userPromise = prisma_1.default.user.findUnique({
        where: {
            email: username,
        },
    });
    userPromise
        .then((user) => {
        if ((user === null || user === void 0 ? void 0 : user.email) === username && (user === null || user === void 0 ? void 0 : user.password) === password) {
            return done(null, user);
        }
        return done(null, false);
    })
        .catch((err) => {
        return done(err, false);
    });
};
exports.validatedUser = validatedUser;
//# sourceMappingURL=auth-service.js.map