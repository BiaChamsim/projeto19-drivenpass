"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const authController_1 = require("../controllers/authController");
const authRouter = (0, express_1.Router)();
authRouter.post("/signup", authMiddleware_1.default, authController_1.signUp);
authRouter.post("/signin", authMiddleware_1.default, authController_1.signIn);
exports.default = authRouter;
