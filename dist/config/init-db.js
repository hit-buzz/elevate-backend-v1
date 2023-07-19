"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const prisma_1 = __importDefault(require("./prisma"));
module.exports = (app) => prisma_1.default
    .$connect()
    .then(() => {
    console.log("Connected to the database.");
    app.listen(+(process.env.PORT || 3000), () => {
        console.log("Server is running on port 3000");
    });
})
    .catch((error) => {
    console.error("Error connecting to the database:", error);
    process.exit();
});
//# sourceMappingURL=init-db.js.map