"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateTokenMiddleware_1 = __importDefault(require("../middlewares/validateTokenMiddleware"));
const wifiMiddleware_1 = __importDefault(require("../middlewares/wifiMiddleware"));
const wifiController_1 = require("../controllers/wifiController");
const wifiRouter = (0, express_1.Router)();
wifiRouter.post("/wifi", validateTokenMiddleware_1.default, wifiMiddleware_1.default, wifiController_1.createWifi);
wifiRouter.get("/wifi", validateTokenMiddleware_1.default, wifiController_1.getWifi);
wifiRouter.delete("/wifi/:id", validateTokenMiddleware_1.default, wifiController_1.deleteWifi);
exports.default = wifiRouter;
