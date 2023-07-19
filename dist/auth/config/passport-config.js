"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeAuthentication = void 0;
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const passport_local_1 = require("passport-local");
const authService = __importStar(require("../services/auth-service"));
const initializeAuthentication = (app) => {
    console.log("initializing authentication for application");
    app.use((0, express_session_1.default)({
        secret: "your_secret_key",
        resave: false,
        saveUninitialized: false,
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    passport_1.default.serializeUser((user, done) => {
        done(null, user.email);
    });
    passport_1.default.deserializeUser((id, done) => {
        console.log("id===", id);
        const user = { email: id, username: id };
        done(null, user);
    });
    passport_1.default.use(new passport_local_1.Strategy({
        usernameField: "email",
        passwordField: "password",
    }, authService.validatedUser));
    return passport_1.default;
};
exports.initializeAuthentication = initializeAuthentication;
//# sourceMappingURL=passport-config.js.map