"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectSchema = void 0;
const zod_types_1 = __importDefault(require("../../../data-types/zod-types"));
const zod_1 = __importDefault(require("zod"));
exports.projectSchema = zod_1.default.object({
    //   id: ZOD_TYPE.String().nullable(),
    projectName: zod_types_1.default.String({
        required_error: "Project Name cannot be empty",
        invalid_type_error: "Type doesnot match",
    }).nonempty(),
    projectDescription: zod_types_1.default.String({
        invalid_type_error: "Type doesnot match",
    })
        .min(1, "minimum length is 1")
        .max(1500, "maximum length is 1500"),
    author: zod_types_1.default.String().min(1).max(30).nonempty(),
});
//# sourceMappingURL=project.js.map