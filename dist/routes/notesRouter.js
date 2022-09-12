"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const noteBodyMiddleware_1 = __importDefault(require("./../middlewares/noteBodyMiddleware"));
const validateTokenMiddleware_1 = __importDefault(require("../middlewares/validateTokenMiddleware"));
const notesController_1 = require("../controllers/notesController");
const notesRouter = (0, express_1.Router)();
notesRouter.post("/notes", noteBodyMiddleware_1.default, validateTokenMiddleware_1.default, notesController_1.createNotes);
notesRouter.get("/notes", validateTokenMiddleware_1.default, notesController_1.getNotes);
notesRouter.delete("/notes/:id", validateTokenMiddleware_1.default, notesController_1.deleteNotes);
exports.default = notesRouter;
