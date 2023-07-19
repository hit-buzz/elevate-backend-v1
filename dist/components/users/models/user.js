"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_types_1 = __importDefault(require("../../../data-types/zod-types"));
const zod_1 = __importDefault(require("zod"));
const userSchema = zod_1.default.object({
    email: zod_types_1.default.String({
        required_error: "email field is mandatory",
    })
        .email({ message: "email is invalid" })
        .nonempty(),
    password: zod_types_1.default.String().nonempty({ message: "password cannot be empty" }),
});
exports.default = userSchema;
//# sourceMappingURL=user.js.map