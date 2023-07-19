"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.saveNewUser = void 0;
const prisma_1 = __importDefault(require("../../../config/prisma"));
const user_1 = __importDefault(require("../models/user"));
const saveNewUser = (req, res) => {
    console.log("received request to save users", req.body);
    const user = user_1.default.parse(req.body);
    prisma_1.default.user
        .findUnique({
        where: {
            email: user.email,
        },
    })
        .then((u) => {
        if (u != null) {
            return res.status(400).json({ message: "user already registered" });
        }
        prisma_1.default.user
            .create({
            data: user,
        })
            .then((user) => {
            return res.status(201).json(user);
        })
            .catch((err) => {
            return res.status(500).json({ message: "user creation failed" });
        });
    })
        .catch((err) => {
        return res.status(500).json({ message: "user creation failed" });
    });
};
exports.saveNewUser = saveNewUser;
const getUserById = (req, res) => {
    const users = user_1.default.parse(req.body);
    return prisma_1.default.user
        .findMany({
        where: {
            email: { equals: users.email },
        },
    })
        .then((success) => {
        return success;
    })
        .catch((err) => {
        console.log("error occured while finding user", err);
    });
};
exports.getUserById = getUserById;
//# sourceMappingURL=user-service.js.map