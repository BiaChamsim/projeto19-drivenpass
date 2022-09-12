"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateTokenMiddleware_1 = __importDefault(require("../middlewares/validateTokenMiddleware"));
const cardsMiddleware_1 = __importDefault(require("../middlewares/cardsMiddleware"));
const cardsController_1 = require("../controllers/cardsController");
const cardsRouter = (0, express_1.Router)();
cardsRouter.post("/cards", validateTokenMiddleware_1.default, cardsMiddleware_1.default, cardsController_1.createCards);
cardsRouter.get("/cards", validateTokenMiddleware_1.default, cardsController_1.getCards);
cardsRouter.delete("/cards/:id", validateTokenMiddleware_1.default, cardsController_1.deleteCards);
exports.default = cardsRouter;
