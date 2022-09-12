"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const credentialBodyMiddleware_1 = __importDefault(require("../middlewares/credentialBodyMiddleware"));
const validateTokenMiddleware_1 = __importDefault(require("../middlewares/validateTokenMiddleware"));
const credentialsController_1 = require("../controllers/credentialsController");
const credentialsRouter = (0, express_1.Router)();
credentialsRouter.post("/credentials", credentialBodyMiddleware_1.default, validateTokenMiddleware_1.default, credentialsController_1.createCredential);
credentialsRouter.get("/credentials", validateTokenMiddleware_1.default, credentialsController_1.getCredential);
credentialsRouter.delete("/credentials/:id", validateTokenMiddleware_1.default, credentialsController_1.deleteCredentials);
exports.default = credentialsRouter;
