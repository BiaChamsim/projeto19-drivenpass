import { Router } from "express";
import noteBodyMiddleware from "./../middlewares/noteBodyMiddleware";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware";

import {createNotes} from "../controllers/notesController";

const notesRouter = Router();

notesRouter.post("/notes", noteBodyMiddleware, validateTokenMiddleware, createNotes);
notesRouter.get("/notes");
notesRouter.delete("/notes/:id")

export default notesRouter;