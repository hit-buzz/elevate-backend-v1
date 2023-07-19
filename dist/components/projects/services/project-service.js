"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProjects = exports.saveProject = void 0;
const prisma_1 = __importDefault(require("../../../config/prisma"));
const project_1 = require("../models/project");
const saveProject = (req, res) => {
    console.log(req.body);
    const obj = project_1.projectSchema.parse(req.body);
    const createProject = prisma_1.default.project.create({
        data: obj,
    });
    createProject
        .then((success) => {
        console.log("object creation success", success);
        res.statusCode = 201;
        res.send(success);
    })
        .catch((err) => console.log("object Creation failed", err));
};
exports.saveProject = saveProject;
const getAllProjects = (req, res) => {
    const result = prisma_1.default.project.findMany();
    result
        .then((projects) => {
        res.statusCode = 200;
        res.send(projects);
    })
        .catch((err) => console.log("something went wrong", err));
};
exports.getAllProjects = getAllProjects;
//# sourceMappingURL=project-service.js.map